package com.briankimathi.portfolio.dto.github;

import java.time.LocalDateTime;
import java.util.Map;

public record GitHubWorkflowRun(
        long id,
        String name,
        String status,
        String conclusion,
        String branch,
        String headSha,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String htmlUrl,
        long workflowId
) {
    public static GitHubWorkflowRun fromMap(Map<String, Object> m) {
        return new GitHubWorkflowRun(
                ((Number) m.get("id")).longValue(),
                (String) m.get("name"),
                (String) m.get("status"),
                (String) m.get("conclusion"),
                (String) m.get("head_branch"),
                (String) m.get("head_sha"),
                LocalDateTime.parse(((String) m.get("created_at")).replace("Z", "")),
                LocalDateTime.parse(((String) m.get("updated_at")).replace("Z", "")),
                (String) m.get("html_url"),
                ((Number) m.get("workflow_id")).longValue()
        );
    }
}
