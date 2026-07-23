package com.briankimathi.portfolio.controller.github;

import com.briankimathi.portfolio.dto.github.BranchProtectionRequest;
import com.briankimathi.portfolio.dto.github.CreateRepoRequest;
import com.briankimathi.portfolio.dto.github.GitHubRepository;
import com.briankimathi.portfolio.service.github.GitHubRepositoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repos")
public class RepositoryController {

    private final GitHubRepositoryService repositoryService;

    public RepositoryController(GitHubRepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    @GetMapping
    public List<GitHubRepository> listRepositories() {
        return repositoryService.listRepositories();
    }

    @PostMapping
    public ResponseEntity<GitHubRepository> createRepository(@RequestBody CreateRepoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repositoryService.createRepository(request));
    }

    @PatchMapping("/{repo}/branch-protection")
    public ResponseEntity<Void> updateBranchProtection(
            @PathVariable String repo,
            @RequestBody BranchProtectionRequest request) {
        repositoryService.updateBranchProtection("owner", repo, request);
        return ResponseEntity.ok().build();
    }
}
