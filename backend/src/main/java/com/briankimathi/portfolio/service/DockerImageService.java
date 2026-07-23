package com.briankimathi.portfolio.service;

import com.briankimathi.portfolio.dto.DockerImageInfo;
import com.github.dockerjava.api.DockerClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Service
public class DockerImageService {

    private static final Logger log = LoggerFactory.getLogger(DockerImageService.class);

    private final DockerClient dockerClient;

    public DockerImageService(DockerClient dockerClient) {
        this.dockerClient = dockerClient;
    }

    public List<DockerImageInfo> listImages() {
        return dockerClient.listImagesCmd().exec().stream()
                .map(DockerImageInfo::fromDocker)
                .toList();
    }

    @Async
    public void pullImage(String repository, String tag, SseEmitter emitter) {
        try {
            dockerClient.pullImageCmd(repository)
                    .withTag(tag != null ? tag : "latest")
                    .exec(new com.github.dockerjava.core.command.PullImageResultCallback() {
                        @Override
                        public void onNext(com.github.dockerjava.api.model.PullResponseItem item) {
                            try {
                                if (item.getStatus() != null) {
                                    emitter.send(SseEmitter.event()
                                            .name("pull-progress")
                                            .data(item.getStatus()));
                                }
                            } catch (IOException e) {
                                log.warn("SSE error during image pull");
                                onError(e);
                            }
                        }

                        @Override
                        public void onComplete() {
                            try { emitter.send(SseEmitter.event().name("pull-complete").data("done")); }
                            catch (IOException ignored) {}
                            emitter.complete();
                        }

                        @Override
                        public void onError(Throwable t) {
                            try { emitter.send(SseEmitter.event().name("pull-error").data(t.getMessage())); }
                            catch (IOException ignored) {}
                            emitter.completeWithError(t);
                        }
                    }).awaitCompletion();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            emitter.completeWithError(e);
        }
    }

    public void pruneImages() {
        dockerClient.pruneCmd(com.github.dockerjava.api.model.PruneType.IMAGES).exec();
        log.info("Unused Docker images pruned");
    }
}
