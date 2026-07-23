package com.briankimathi.portfolio.service.github;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
public class GitHubWebhookService {

    private static final Logger log = LoggerFactory.getLogger(GitHubWebhookService.class);

    public boolean verifySignature(String payload, String signatureHeader, String webhookSecret) {
        if (signatureHeader == null || !signatureHeader.startsWith("sha256=")) return false;

        String expected = signatureHeader.substring("sha256=".length());

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret = new SecretKeySpec(
                    webhookSecret.getBytes(java.nio.charset.StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secret);
            byte[] hash = mac.doFinal(payload.getBytes(java.nio.charset.StandardCharsets.UTF_8));

            StringBuilder hex = new StringBuilder();
            for (byte b : hash) hex.append(String.format("%02x", b));

            return hex.toString().equals(expected);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("HMAC verification failed", e);
            return false;
        }
    }
}
