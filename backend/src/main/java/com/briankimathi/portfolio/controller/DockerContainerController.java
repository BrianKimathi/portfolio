package com.briankimathi.portfolio.controller;

import com.briankimathi.portfolio.dto.DockerContainerInfo;
import com.briankimathi.portfolio.service.DockerContainerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/docker/containers")
public class DockerContainerController {

    private final DockerContainerService containerService;

    public DockerContainerController(DockerContainerService containerService) {
        this.containerService = containerService;
    }

    @GetMapping
    public List<DockerContainerInfo> listContainers(
            @RequestParam(defaultValue = "true") boolean all) {
        return containerService.listContainers(all);
    }

    @PostMapping("/{containerId}/start")
    public ResponseEntity<Void> start(@PathVariable String containerId) {
        containerService.startContainer(containerId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{containerId}/stop")
    public ResponseEntity<Void> stop(@PathVariable String containerId) {
        containerService.stopContainer(containerId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{containerId}/restart")
    public ResponseEntity<Void> restart(@PathVariable String containerId) {
        containerService.restartContainer(containerId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{containerId}")
    public ResponseEntity<Void> remove(
            @PathVariable String containerId,
            @RequestParam(defaultValue = "false") boolean force) {
        containerService.removeContainer(containerId, force);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{containerId}/logs")
    public SseEmitter streamLogs(@PathVariable String containerId) {
        SseEmitter emitter = new SseEmitter(0L); // no timeout
        containerService.streamLogs(containerId, emitter);
        return emitter;
    }

    @GetMapping("/{containerId}/stats")
    public SseEmitter streamStats(@PathVariable String containerId) {
        SseEmitter emitter = new SseEmitter(0L);
        containerService.streamStats(containerId, emitter);
        return emitter;
    }
}
