package com.briankimathi.portfolio.service.github;

import com.briankimathi.portfolio.dto.github.GitHubPullRequest;
import com.briankimathi.portfolio.dto.github.MergePullRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GitHubPullRequestService {

    private final RestClient gitHubRestClient;

    public GitHubPullRequestService(RestClient gitHubRestClient) {
        this.gitHubRestClient = gitHubRestClient;
    }

    @SuppressWarnings("unchecked")
    public List<GitHubPullRequest> listPullRequests(String owner, String repo) {
        var response = gitHubRestClient.get()
                .uri("/repos/{owner}/{repo}/pulls?state=open&sort=updated&direction=desc", owner, repo)
                .retrieve()
                .toEntity(List.class);

        List<Map<String, Object>> prs = response.getBody();
        if (prs == null) return List.of();
        return prs.stream().map(GitHubPullRequest::fromMap).toList();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> mergePullRequest(String owner, String repo, int pullNumber, MergePullRequest request) {
        var response = gitHubRestClient.put()
                .uri("/repos/{owner}/{repo}/pulls/{pull_number}/merge", owner, repo, pullNumber)
                .body(Map.of(
                        "commit_title", request.commitTitle(),
                        "commit_message", request.commitMessage(),
                        "merge_method", request.mergeMethod()
                ))
                .retrieve()
                .toEntity(Map.class);

        return response.getBody();
    }
}
