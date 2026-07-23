package com.briankimathi.portfolio.dto;

import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.PortBinding;

import java.util.Arrays;
import java.util.List;

public record DockerContainerInfo(
        String id,
        String name,
        String image,
        String state,
        String status,
        List<String> ports
) {
    public static DockerContainerInfo fromDocker(Container c) {
        String name = c.getNames() != null && c.getNames().length > 0
                ? c.getNames()[0].replace("/", "") : "";

        List<String> ports = c.getPorts() != null
                ? Arrays.stream(c.getPorts())
                        .map(p -> (p.getPrivatePort() != null ? p.getPrivatePort() : "?")
                                + (p.getPublicPort() != null ? ":" + p.getPublicPort() : "")
                                + "/" + (p.getType() != null ? p.getType() : "?"))
                        .toList()
                : List.of();

        return new DockerContainerInfo(
                c.getId(),
                name,
                c.getImage(),
                c.getState(),
                c.getStatus(),
                ports
        );
    }
}
