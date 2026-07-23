package com.briankimathi.portfolio.controller;

import com.briankimathi.portfolio.service.OAuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/auth/oauth")
public class OAuthController {

    private final OAuthService oauthService;
    private final String frontendUrl;

    public OAuthController(OAuthService oauthService,
                           @Value("${app.frontend-url:http://localhost:5173}") String frontendUrl) {
        this.oauthService = oauthService;
        this.frontendUrl = frontendUrl;
    }

    @GetMapping("/{provider}")
    public ResponseEntity<Void> initiate(@PathVariable String provider) {
        try {
            String authUrl = oauthService.getAuthorizationUrl(provider);
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(authUrl)).build();
        } catch (IllegalArgumentException | IllegalStateException e) {
            String error = URLEncoder.encode(e.getMessage(), StandardCharsets.UTF_8);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(frontendUrl + "?oauth_error=" + error)).build();
        }
    }

    @GetMapping("/{provider}/callback")
    public ResponseEntity<Void> callback(
            @PathVariable String provider,
            @RequestParam String code,
            @RequestParam String state) {

        OAuthService.OAuthResult result = oauthService.handleCallback(provider, code, state);

        if (result.isSuccess()) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(frontendUrl + "?token=" + result.getToken())).build();
        } else {
            String error = URLEncoder.encode(result.getMessage(), StandardCharsets.UTF_8);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(frontendUrl + "?oauth_error=" + error)).build();
        }
    }
}
