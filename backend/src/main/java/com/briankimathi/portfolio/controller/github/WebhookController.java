package com.briankimathi.portfolio.controller.github;

import com.briankimathi.portfolio.service.github.GitHubWebhookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/github")
public class WebhookController {

    private static final Logger log = LoggerFactory.getLogger(WebhookController.class);

    private final GitHubWebhookService webhookService;

    @Value("${github.webhook.secret:}")
    private String webhookSecret;

    public WebhookController(GitHubWebhookService webhookService) {
        this.webhookService = webhookService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Hub-Signature-256") String signature,
            @RequestHeader("X-GitHub-Event") String event,
            @RequestHeader(value = "X-GitHub-Delivery", required = false) String deliveryId) {

        if (!webhookSecret.isEmpty() && !webhookService.verifySignature(payload, signature, webhookSecret)) {
            log.warn("Webhook signature verification failed for delivery: {}", deliveryId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid signature"));
        }

        log.info("GitHub webhook: event={}, delivery={}", event, deliveryId);

        switch (event) {
            case "workflow_run" -> log.debug("Workflow run event received");
            case "push" -> log.debug("Push event received");
            case "pull_request" -> log.debug("PR event received");
            default -> log.debug("Unhandled event: {}", event);
        }

        return ResponseEntity.ok(Map.of("status", "accepted"));
    }
}
