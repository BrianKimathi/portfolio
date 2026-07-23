package com.briankimathi.portfolio.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateRepoRequest(
        String name,
        String description,
        @JsonProperty("private") boolean isPrivate,
        @JsonProperty("auto_init") boolean autoInit
) {
    public CreateRepoRequest(String name, String description) {
        this(name, description, false, false);
    }
}
