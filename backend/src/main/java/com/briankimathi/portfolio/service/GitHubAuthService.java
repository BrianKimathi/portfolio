package com.briankimathi.portfolio.service;

import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Service
public class GitHubAuthService {

    private static final Logger log = LoggerFactory.getLogger(GitHubAuthService.class);
    private static final String GITHUB_API = "https://api.github.com";

    private final PrivateKey privateKey;
    private final String appId;
    private final long installationId;
    private final RestClient restClient;

    public GitHubAuthService(
            @Value("${github.app.id}") String appId,
            @Value("${github.app.private-key-path}") String privateKeyPath,
            @Value("${github.app.installation-id}") long installationId) throws Exception {

        this.appId = appId;
        this.installationId = installationId;
        this.restClient = RestClient.builder().build();

        String pemContent = Files.readString(Path.of(privateKeyPath));
        this.privateKey = parsePrivateKey(pemContent);

        log.info("GitHubAuthService initialized for app ID: {}", appId);
    }

    public String generateAppJwt() {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .issuer(appId)
                .issuedAt(new Date(now))
                .expiration(new Date(now + 600_000))
                .signWith(privateKey, Jwts.SIG.RS256)
                .compact();
    }

    @Cacheable(value = "githubIat", key = "'installation-token'")
    public String getInstallationAccessToken() {
        String jwt = generateAppJwt();
        log.debug("Fetching Installation Access Token for installation ID: {}", installationId);

        var response = restClient.post()
                .uri(GITHUB_API + "/app/installations/{installation_id}/access_tokens", installationId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .header(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .header("X-GitHub-Api-Version", "2022-11-28")
                .retrieve()
                .toEntity(Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null || !body.containsKey("token")) {
            throw new RuntimeException("Failed to obtain Installation Access Token");
        }

        log.info("Installation Access Token obtained");
        return (String) body.get("token");
    }

    @CacheEvict(value = "githubIat", key = "'installation-token'")
    public void evictCachedToken() {
        log.info("Installation Access Token cache evicted");
    }

    private PrivateKey parsePrivateKey(String pem) throws Exception {
        String base64 = pem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replace("-----BEGIN RSA PRIVATE KEY-----", "")
                .replace("-----END RSA PRIVATE KEY-----", "")
                .replaceAll("\\s", "");

        byte[] keyBytes = Base64.getDecoder().decode(base64);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePrivate(spec);
    }
}
