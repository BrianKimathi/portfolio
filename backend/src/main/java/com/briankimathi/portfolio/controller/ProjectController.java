package com.briankimathi.portfolio.controller;

import com.briankimathi.portfolio.dto.ProjectRequest;
import com.briankimathi.portfolio.dto.ProjectResponse;
import com.briankimathi.portfolio.service.ProjectService;
import com.briankimathi.portfolio.service.github.GitHubRepositoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final RestClient gitHubRestClient;

    public ProjectController(ProjectService projectService, RestClient gitHubRestClient) {
        this.projectService = projectService;
        this.gitHubRestClient = gitHubRestClient;
    }

    @GetMapping
    public List<ProjectResponse> listProjects() {
        return projectService.listProjects();
    }

    @GetMapping("/{id}")
    public ProjectResponse getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@RequestBody ProjectRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(req));
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(@PathVariable Long id, @RequestBody ProjectRequest req) {
        return projectService.updateProject(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Fetch README from GitHub repo associated with this project.
     */
    @PostMapping("/{id}/fetch-readme")
    public ResponseEntity<?> fetchReadme(@PathVariable Long id) {
        ProjectResponse project = projectService.getProject(id);
        if (project.getGithubRepo() == null || project.getGithubRepo().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No GitHub repo configured for this project"));
        }

        try {
            String readme = gitHubRestClient.get()
                    .uri("/repos/{repo}/readme", project.getGithubRepo())
                    .header("Accept", "application/vnd.github.raw+json")
                    .retrieve()
                    .body(String.class);

            projectService.updateReadme(id, readme);
            return ResponseEntity.ok(Map.of("message", "README fetched successfully", "readme", readme));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch README: " + e.getMessage()));
        }
    }

    /**
     * Get workflow runs from GitHub for the project's repo.
     */
    @GetMapping("/{id}/workflows")
    public ResponseEntity<?> getWorkflows(@PathVariable Long id) {
        ProjectResponse project = projectService.getProject(id);
        if (project.getGithubRepo() == null || project.getGithubRepo().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No GitHub repo configured"));
        }

        try {
            var response = gitHubRestClient.get()
                    .uri("/repos/{repo}/actions/runs?per_page=10", project.getGithubRepo())
                    .retrieve()
                    .toEntity(Map.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch workflows: " + e.getMessage()));
        }
    }
}
