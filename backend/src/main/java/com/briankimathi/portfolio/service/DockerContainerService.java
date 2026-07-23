package com.briankimathi.portfolio.service;

import com.briankimathi.portfolio.dto.DockerContainerInfo;
import com.briankimathi.portfolio.dto.DockerStatsInfo;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.exception.NotFoundException;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.api.model.Statistics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Service
public class DockerContainerService {

    private static final Logger log = LoggerFactory.getLogger(DockerContainerService.class);

    private final DockerClient dockerClient;

    public DockerContainerService(DockerClient dockerClient) {
        this.dockerClient = dockerClient;
    }

    public List<DockerContainerInfo> listContainers(boolean all) {
        return dockerClient.listContainersCmd().withShowAll(all).exec().stream()
                .map(DockerContainerInfo::fromDocker)
                .toList();
    }

    public void startContainer(String containerId) {
        try { dockerClient.startContainerCmd(containerId).exec(); }
        catch (NotFoundException e) { throw new IllegalArgumentException("Container not found: " + containerId); }
    }

    public void stopContainer(String containerId) {
        try { dockerClient.stopContainerCmd(containerId).exec(); }
        catch (NotFoundException e) { throw new IllegalArgumentException("Container not found: " + containerId); }
    }

    public void restartContainer(String containerId) {
        try { dockerClient.restartContainerCmd(containerId).exec(); }
        catch (NotFoundException e) { throw new IllegalArgumentException("Container not found: " + containerId); }
    }

    public void removeContainer(String containerId, boolean force) {
        try { dockerClient.removeContainerCmd(containerId).withForce(force).exec(); }
        catch (NotFoundException e) { throw new IllegalArgumentException("Container not found: " + containerId); }
    }

    public void streamLogs(String containerId, SseEmitter emitter) {
        try {
            dockerClient.logContainerCmd(containerId)
                    .withStdOut(true)
                    .withStdErr(true)
                    .withFollowStream(true)
                    .withTail(100)
                    .exec(new ResultCallback.Adapter<Frame>() {
                        @Override
                        public void onNext(Frame frame) {
                            try {
                                String text = frame != null && frame.getPayload() != null
                                        ? new String(frame.getPayload()) : "";
                                emitter.send(SseEmitter.event().name("log").data(text));
                            } catch (IOException e) {
                                try { emitter.complete(); } catch (Exception ignored) {}
                            }
                        }
                    });
        } catch (NotFoundException e) {
            throw new IllegalArgumentException("Container not found: " + containerId);
        }
    }

    public void streamStats(String containerId, SseEmitter emitter) {
        try {
            dockerClient.statsCmd(containerId).exec(new ResultCallback.Adapter<Statistics>() {
                @Override
                public void onNext(Statistics stats) {
                    try {
                        DockerStatsInfo info = DockerStatsInfo.fromStatistics(containerId, stats);
                        emitter.send(SseEmitter.event().name("stats").data(info));
                    } catch (IOException e) {
                        try { emitter.complete(); } catch (Exception ignored) {}
                    }
                }
            });
        } catch (NotFoundException e) {
            throw new IllegalArgumentException("Container not found: " + containerId);
        }
    }
}
