package com.briankimathi.portfolio.controller;

import com.briankimathi.portfolio.dto.AddEmailRequest;
import com.briankimathi.portfolio.dto.AllowedEmailDto;
import com.briankimathi.portfolio.dto.OAuthProviderDto;
import com.briankimathi.portfolio.model.AllowedEmail;
import com.briankimathi.portfolio.model.OAuthProviderConfig;
import com.briankimathi.portfolio.repository.AllowedEmailRepository;
import com.briankimathi.portfolio.repository.OAuthProviderConfigRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminConfigController {

    private final OAuthProviderConfigRepository providerConfigRepo;
    private final AllowedEmailRepository allowedEmailRepo;

    private final Map<String, String> gitHubConfig = new HashMap<>();

    public AdminConfigController(OAuthProviderConfigRepository providerConfigRepo,
                                  AllowedEmailRepository allowedEmailRepo,
                                  @Value("${github.app.id:}") String appId,
                                  @Value("${github.app.private-key-path:}") String privateKeyPath,
                                  @Value("${github.app.installation-id:}") String installationId,
                                  @Value("${github.owner:}") String owner,
                                  @Value("${github.webhook.secret:}") String webhookSecret) {
        this.providerConfigRepo = providerConfigRepo;
        this.allowedEmailRepo = allowedEmailRepo;
        gitHubConfig.put("appId", appId);
        gitHubConfig.put("privateKeyPath", privateKeyPath);
        gitHubConfig.put("installationId", installationId);
        gitHubConfig.put("owner", owner);
        gitHubConfig.put("webhookSecret", webhookSecret);
    }

    public AdminConfigController(OAuthProviderConfigRepository providerConfigRepo,
                                  AllowedEmailRepository allowedEmailRepo) {
        this.providerConfigRepo = providerConfigRepo;
        this.allowedEmailRepo = allowedEmailRepo;
    }

    // ─── OAuth Provider Config ───

    @GetMapping("/oauth-providers")
    public ResponseEntity<List<OAuthProviderDto>> getProviders() {
        List<OAuthProviderConfig> configs = providerConfigRepo.findAll();
        List<OAuthProviderDto> dtos = configs.stream()
                .map(c -> new OAuthProviderDto(c.getProvider(), c.getClientId(), "", c.isEnabled()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/oauth-providers/{provider}")
    public ResponseEntity<?> updateProvider(
            @PathVariable String provider,
            @RequestBody OAuthProviderDto dto) {

        var opt = providerConfigRepo.findByProvider(provider.toUpperCase());
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Provider not found: " + provider));
        }

        OAuthProviderConfig config = opt.get();
        config.setClientId(dto.getClientId());
        if (dto.getClientSecret() != null && !dto.getClientSecret().isBlank()) {
            config.setClientSecret(dto.getClientSecret());
        }
        config.setEnabled(dto.isEnabled());
        config.setUpdatedAt(LocalDateTime.now());
        providerConfigRepo.save(config);

        return ResponseEntity.ok(Map.of("message", "Provider updated successfully"));
    }

    // ─── Allowed Emails ───

    @GetMapping("/allowed-emails")
    public ResponseEntity<List<AllowedEmailDto>> getAllowedEmails() {
        List<AllowedEmail> emails = allowedEmailRepo.findAll();
        List<AllowedEmailDto> dtos = emails.stream()
                .map(e -> new AllowedEmailDto(e.getId(), e.getEmail(), e.getAddedBy(), e.getProvider(), e.getCreatedAt()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/allowed-emails")
    public ResponseEntity<?> addAllowedEmail(
            @Valid @RequestBody AddEmailRequest request,
            Authentication auth) {

        String email = request.getEmail().trim().toLowerCase();

        if (allowedEmailRepo.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email already in allowlist"));
        }

        String addedBy = auth != null ? auth.getName() : "admin";
        AllowedEmail entry = new AllowedEmail(email, addedBy, null);
        allowedEmailRepo.save(entry);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Email added to allowlist"));
    }

    @DeleteMapping("/allowed-emails/{id}")
    public ResponseEntity<?> removeAllowedEmail(@PathVariable Long id) {
        if (!allowedEmailRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Email not found"));
        }
        allowedEmailRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Email removed from allowlist"));
    }

    // ─── GitHub App Config ───

    @GetMapping("/github-config")
    public ResponseEntity<Map<String, String>> getGitHubConfig() {
        return ResponseEntity.ok(new HashMap<>(gitHubConfig));
    }

    @PutMapping("/github-config")
    public ResponseEntity<Map<String, String>> updateGitHubConfig(@RequestBody Map<String, String> config) {
        if (config.containsKey("appId")) gitHubConfig.put("appId", config.get("appId"));
        if (config.containsKey("privateKeyPath")) gitHubConfig.put("privateKeyPath", config.get("privateKeyPath"));
        if (config.containsKey("installationId")) gitHubConfig.put("installationId", config.get("installationId"));
        if (config.containsKey("owner")) gitHubConfig.put("owner", config.get("owner"));
        if (config.containsKey("webhookSecret")) gitHubConfig.put("webhookSecret", config.get("webhookSecret"));
        return ResponseEntity.ok(Map.of("message", "GitHub config updated"));
    }
}
