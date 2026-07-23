package com.briankimathi.portfolio.service;

import com.briankimathi.portfolio.model.AllowedEmail;
import com.briankimathi.portfolio.model.OAuthProviderConfig;
import com.briankimathi.portfolio.repository.AllowedEmailRepository;
import com.briankimathi.portfolio.repository.OAuthProviderConfigRepository;
import com.briankimathi.portfolio.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OAuthService {

    private static final Logger log = LoggerFactory.getLogger(OAuthService.class);

    private final OAuthProviderConfigRepository providerConfigRepo;
    private final AllowedEmailRepository allowedEmailRepo;
    private final JwtUtil jwtUtil;
    private final RestClient restClient;
    private final String baseUrl;

    // In-memory state store for CSRF protection
    private final Map<String, String> stateStore = new ConcurrentHashMap<>();

    private static final String GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

    private static final String GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    private static final String GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
    private static final String GITHUB_USERINFO_URL = "https://api.github.com/user";
    private static final String GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

    public OAuthService(OAuthProviderConfigRepository providerConfigRepo,
                        AllowedEmailRepository allowedEmailRepo,
                        JwtUtil jwtUtil,
                        @Value("${app.base-url:http://localhost:8080}") String baseUrl) {
        this.providerConfigRepo = providerConfigRepo;
        this.allowedEmailRepo = allowedEmailRepo;
        this.jwtUtil = jwtUtil;
        this.restClient = RestClient.builder().build();
        this.baseUrl = baseUrl;
    }

    /**
     * Generate the authorization URL for the given provider.
     */
    public String getAuthorizationUrl(String provider) {
        OAuthProviderConfig config = providerConfigRepo.findByProvider(provider.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("OAuth provider not configured: " + provider));

        if (!config.isEnabled()) {
            throw new IllegalStateException("OAuth provider is disabled: " + provider);
        }

        String state = UUID.randomUUID().toString();
        stateStore.put(state, provider.toUpperCase());

        String redirectUri = getRedirectUri(provider);

        switch (provider.toUpperCase()) {
            case "GOOGLE":
                return GOOGLE_AUTH_URL + "?" +
                        "client_id=" + urlEncode(config.getClientId()) +
                        "&redirect_uri=" + urlEncode(redirectUri) +
                        "&response_type=code" +
                        "&scope=" + urlEncode("email profile") +
                        "&state=" + urlEncode(state) +
                        "&access_type=offline";
            case "GITHUB":
                return GITHUB_AUTH_URL + "?" +
                        "client_id=" + urlEncode(config.getClientId()) +
                        "&redirect_uri=" + urlEncode(redirectUri) +
                        "&scope=" + urlEncode("read:user user:email") +
                        "&state=" + urlEncode(state);
            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }
    }

    /**
     * Handle the OAuth callback: exchange code for token, fetch email, verify, issue JWT.
     */
    public OAuthResult handleCallback(String provider, String code, String state) {
        // Verify state
        String expectedProvider = stateStore.remove(state);
        if (expectedProvider == null || !expectedProvider.equals(provider.toUpperCase())) {
            log.warn("Invalid OAuth state parameter for provider: {}", provider);
            return new OAuthResult(false, "Invalid state parameter", null);
        }

        OAuthProviderConfig config = providerConfigRepo.findByProvider(provider.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("OAuth provider not configured: " + provider));

        if (!config.isEnabled()) {
            return new OAuthResult(false, "OAuth provider is disabled", null);
        }

        try {
            // Exchange code for access token
            String accessToken = exchangeCodeForToken(provider, config, code);

            // Fetch user email from provider
            String email = fetchUserEmail(provider, accessToken);

            if (email == null || email.isBlank()) {
                return new OAuthResult(false, "Could not retrieve email from " + provider, null);
            }

            // Check if email is allowed
            if (!allowedEmailRepo.existsByEmail(email)) {
                log.warn("Login attempt by unauthorized email: {}", email);
                return new OAuthResult(false, "This email is not authorized. Contact the admin to grant access.", null);
            }

            // Issue JWT
            String token = jwtUtil.generateToken(email, "ADMIN");
            log.info("OAuth login successful: {} via {}", email, provider);

            return new OAuthResult(true, "Login successful", token);

        } catch (Exception e) {
            log.error("OAuth callback error for provider {}: {}", provider, e.getMessage(), e);
            return new OAuthResult(false, "Authentication failed: " + e.getMessage(), null);
        }
    }

    private String exchangeCodeForToken(String provider, OAuthProviderConfig config, String code) {
        String tokenUrl;
        Map<String, String> body = new LinkedHashMap<>();
        body.put("client_id", config.getClientId());
        body.put("client_secret", config.getClientSecret());
        body.put("code", code);
        body.put("redirect_uri", getRedirectUri(provider));
        body.put("grant_type", "authorization_code");

        if ("GITHUB".equalsIgnoreCase(provider)) {
            tokenUrl = GITHUB_TOKEN_URL;
        } else {
            tokenUrl = GOOGLE_TOKEN_URL;
        }

        var response = restClient.post()
                .uri(tokenUrl)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .body(body)
                .retrieve()
                .toEntity(Map.class);

        Map<String, Object> responseBody = response.getBody();
        if (responseBody == null || responseBody.containsKey("error")) {
            String error = responseBody != null ? (String) responseBody.get("error_description") : "unknown";
            throw new RuntimeException("Token exchange failed: " + error);
        }

        return (String) responseBody.get("access_token");
    }

    @SuppressWarnings("unchecked")
    private String fetchUserEmail(String provider, String accessToken) {
        if ("GITHUB".equalsIgnoreCase(provider)) {
            // GitHub primary email from /user endpoint
            Map<String, Object> userInfo = restClient.get()
                    .uri(GITHUB_USERINFO_URL)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                    .retrieve()
                    .toEntity(Map.class)
                    .getBody();

            if (userInfo == null) {
                throw new RuntimeException("Failed to fetch GitHub user info");
            }

            String email = (String) userInfo.get("email");
            if (email != null && !email.isBlank()) {
                return email;
            }

            // If primary email is not public, fetch from /user/emails
            List<Map<String, Object>> emails = restClient.get()
                    .uri(GITHUB_EMAILS_URL)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                    .retrieve()
                    .toEntity(List.class)
                    .getBody();

            if (emails != null) {
                for (Map<String, Object> entry : emails) {
                    if (Boolean.TRUE.equals(entry.get("primary")) && Boolean.TRUE.equals(entry.get("verified"))) {
                        return (String) entry.get("email");
                    }
                }
                // Fallback to first verified email
                for (Map<String, Object> entry : emails) {
                    if (Boolean.TRUE.equals(entry.get("verified"))) {
                        return (String) entry.get("email");
                    }
                }
            }

            throw new RuntimeException("No verified email found on GitHub account");

        } else {
            // Google
            Map<String, Object> userInfo = restClient.get()
                    .uri(GOOGLE_USERINFO_URL)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .retrieve()
                    .toEntity(Map.class)
                    .getBody();

            if (userInfo == null) {
                throw new RuntimeException("Failed to fetch Google user info");
            }

            String email = (String) userInfo.get("email");
            Boolean verified = (Boolean) userInfo.get("verified_email");

            if (email == null || email.isBlank()) {
                throw new RuntimeException("No email found on Google account");
            }

            if (!Boolean.TRUE.equals(verified)) {
                throw new RuntimeException("Google email is not verified");
            }

            return email;
        }
    }

    private String getRedirectUri(String provider) {
        return baseUrl + "/api/auth/oauth/" + provider.toLowerCase() + "/callback";
    }

    private String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    /**
     * Result of an OAuth callback processing.
     */
    public static class OAuthResult {
        private final boolean success;
        private final String message;
        private final String token;

        public OAuthResult(boolean success, String message, String token) {
            this.success = success;
            this.message = message;
            this.token = token;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getToken() { return token; }
    }
}
