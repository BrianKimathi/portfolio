package com.briankimathi.portfolio.service.github;

import com.briankimathi.portfolio.dto.github.DispatchWorkflowRequest;
import com.briankimathi.portfolio.dto.github.GitHubWorkflowRun;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GitHubWorkflowService {

    private final RestClient gitHubRestClient;

    public GitHubWorkflowService(RestClient gitHubRestClient) {
        this.gitHubRestClient = gitHubRestClient;
    }

    @SuppressWarnings("unchecked")
    public List<GitHubWorkflowRun> listWorkflowRuns(String owner, String repo) {
        var response = gitHubRestClient.get()
                .uri("/repos/{owner}/{repo}/actions/runs", owner, repo)
                .retrieve()
                .toEntity(Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null) return List.of();

        List<Map<String, Object>> runs = (List<Map<String, Object>>) body.get("workflow_runs");
        return runs.stream().map(GitHubWorkflowRun::fromMap).toList();
    }

    public void dispatchWorkflow(String owner, String repo, long workflowId, DispatchWorkflowRequest request) {
        gitHubRestClient.post()
                .uri("/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", owner, repo, workflowId)
                .body(Map.of("ref", request.ref(), "inputs", request.inputs() != null ? request.inputs() : Map.of()))
                .retrieve()
                .toBodilessEntity();
    }

    public String getWorkflowLogs(String owner, String repo, long runId) {
        return gitHubRestClient.get()
                .uri("/repos/{owner}/{repo}/actions/runs/{run_id}/logs", owner, repo, runId)
                .retrieve()
                .body(String.class);
    }
}
