package com.briankimathi.portfolio.dto;

import com.github.dockerjava.api.model.Image;

import java.util.Arrays;
import java.util.List;

public record DockerImageInfo(
        String id,
        String repository,
        String tag,
        long size,
        long created
) {
    public static DockerImageInfo fromDocker(Image img) {
        String repo = img.getRepoTags() != null && img.getRepoTags().length > 0
                ? img.getRepoTags()[0].split(":")[0] : "";
        String tag = img.getRepoTags() != null && img.getRepoTags().length > 0
                ? img.getRepoTags()[0].split(":")[1] : "";

        return new DockerImageInfo(
                img.getId(),
                repo,
                tag,
                img.getSize() != null ? img.getSize() : 0,
                img.getCreated() != null ? img.getCreated() : 0
        );
    }
}
