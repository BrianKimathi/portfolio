package com.briankimathi.portfolio.controller;

import com.briankimathi.portfolio.dto.DockerImageInfo;
import com.briankimathi.portfolio.service.DockerImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/docker/images")
public class DockerImageController {

    private final DockerImageService imageService;

    public DockerImageController(DockerImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public List<DockerImageInfo> listImages() {
        return imageService.listImages();
    }

    @PostMapping("/pull")
    public SseEmitter pullImage(
            @RequestParam String repository,
            @RequestParam(defaultValue = "latest") String tag) {
        SseEmitter emitter = new SseEmitter(0L);
        imageService.pullImage(repository, tag, emitter);
        return emitter;
    }

    @DeleteMapping("/prune")
    public ResponseEntity<Map<String, String>> pruneImages() {
        imageService.pruneImages();
        return ResponseEntity.ok(Map.of("message", "Unused images pruned"));
    }
}
