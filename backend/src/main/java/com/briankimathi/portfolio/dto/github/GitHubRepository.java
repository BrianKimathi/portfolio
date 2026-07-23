package com.briankimathi.portfolio.dto.github;

import java.util.Map;

public record GitHubRepository(
        long id,
        String name,
        String fullName,
        String description,
        boolean isPrivate,
        String htmlUrl,
        String defaultBranch,
        String language,
        int openIssuesCount,
        int stargazersCount,
        int forksCount,
        String visibility,
        boolean archived
) {
    @SuppressWarnings("unchecked")
    public static GitHubRepository fromMap(Map<String, Object> m) {
        return new GitHubRepository(
                ((Number) m.get("id")).longValue(),
                (String) m.get("name"),
                (String) m.get("full_name"),
                (String) m.get("description"),
                Boolean.TRUE.equals(m.get("private")),
                (String) m.get("html_url"),
                (String) m.get("default_branch"),
                (String) m.get("language"),
                ((Number) m.getOrDefault("open_issues_count", 0)).intValue(),
                ((Number) m.getOrDefault("stargazers_count", 0)).intValue(),
                ((Number) m.getOrDefault("forks_count", 0)).intValue(),
                (String) m.get("visibility"),
                Boolean.TRUE.equals(m.get("archived"))
        );
    }
}
