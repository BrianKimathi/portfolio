package com.briankimathi.portfolio.service.github;

import com.briankimathi.portfolio.dto.github.BranchProtectionRequest;
import com.briankimathi.portfolio.dto.github.CreateRepoRequest;
import com.briankimathi.portfolio.dto.github.GitHubRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GitHubRepositoryService {

    private final RestClient gitHubRestClient;

    public GitHubRepositoryService(RestClient gitHubRestClient) {
        this.gitHubRestClient = gitHubRestClient;
    }

    @SuppressWarnings("unchecked")
    public List<GitHubRepository> listRepositories() {
        var response = gitHubRestClient.get()
                .uri("/installation/repositories")
                .retrieve()
                .toEntity(Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null) return List.of();

        List<Map<String, Object>> repos = (List<Map<String, Object>>) body.get("repositories");
        return repos.stream().map(GitHubRepository::fromMap).toList();
    }

    @SuppressWarnings("unchecked")
    public GitHubRepository createRepository(CreateRepoRequest request) {
        var response = gitHubRestClient.post()
                .uri("/user/repos")
                .body(Map.of(
                        "name", request.name(),
                        "description", request.description(),
                        "private", request.isPrivate(),
                        "auto_init", request.autoInit()
                ))
                .retrieve()
                .toEntity(Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null) throw new RuntimeException("Failed to create repository");
        return GitHubRepository.fromMap(body);
    }

    public void updateBranchProtection(String owner, String repo, BranchProtectionRequest request) {
        gitHubRestClient.put()
                .uri("/repos/{owner}/{repo}/branches/main/protection", owner, repo)
                .body(Map.of(
                        "required_status_checks", request.requiredStatusChecks()
                                ? Map.of("strict", true, "contexts", List.of()) : null,
                        "enforce_admins", Map.of("enabled", request.enforceAdmins()),
                        "required_pull_request_reviews", Map.of(
                                "dismiss_stale_reviews", request.dismissStaleReviews(),
                                "require_code_owner_reviews", request.requireCodeOwnerReviews()
                        ),
                        "restrictions", null
                ))
                .retrieve()
                .toBodilessEntity();
    }
}
