package com.briankimathi.portfolio.dto.github;

import java.time.LocalDateTime;
import java.util.Map;

public record GitHubPullRequest(
        long id,
        int number,
        String title,
        String state,
        String body,
        String author,
        String branch,
        String baseBranch,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String htmlUrl,
        boolean draft
) {
    @SuppressWarnings("unchecked")
    public static GitHubPullRequest fromMap(Map<String, Object> m) {
        Map<String, Object> user = (Map<String, Object>) m.getOrDefault("user", Map.of());
        Map<String, Object> head = (Map<String, Object>) m.getOrDefault("head", Map.of());
        Map<String, Object> base = (Map<String, Object>) m.getOrDefault("base", Map.of());

        return new GitHubPullRequest(
                ((Number) m.get("id")).longValue(),
                ((Number) m.get("number")).intValue(),
                (String) m.get("title"),
                (String) m.get("state"),
                (String) m.get("body"),
                (String) user.get("login"),
                (String) head.get("ref"),
                (String) base.get("ref"),
                LocalDateTime.parse(((String) m.get("created_at")).replace("Z", "")),
                LocalDateTime.parse(((String) m.get("updated_at")).replace("Z", "")),
                (String) m.get("html_url"),
                Boolean.TRUE.equals(m.get("draft"))
        );
    }
}
