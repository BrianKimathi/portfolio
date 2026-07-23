package com.briankimathi.portfolio.controller.github;

import com.briankimathi.portfolio.dto.github.GitHubPullRequest;
import com.briankimathi.portfolio.dto.github.MergePullRequest;
import com.briankimathi.portfolio.service.github.GitHubPullRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/repos/{repo}/pulls")
public class PullRequestController {

    private final GitHubPullRequestService prService;

    public PullRequestController(GitHubPullRequestService prService) {
        this.prService = prService;
    }

    @GetMapping
    public List<GitHubPullRequest> listPullRequests(@PathVariable String repo) {
        return prService.listPullRequests("owner", repo);
    }

    @PutMapping("/{pullNumber}/merge")
    public ResponseEntity<Map<String, Object>> merge(
            @PathVariable String repo,
            @PathVariable int pullNumber,
            @RequestBody MergePullRequest request) {
        return ResponseEntity.ok(prService.mergePullRequest("owner", repo, pullNumber, request));
    }
}
