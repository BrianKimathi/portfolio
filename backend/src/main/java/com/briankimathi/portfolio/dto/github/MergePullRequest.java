package com.briankimathi.portfolio.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MergePullRequest(
        @JsonProperty("commit_title") String commitTitle,
        @JsonProperty("commit_message") String commitMessage,
        @JsonProperty("merge_method") String mergeMethod
) {
    public MergePullRequest(String commitTitle, String commitMessage) {
        this(commitTitle, commitMessage, "merge");
    }
}
