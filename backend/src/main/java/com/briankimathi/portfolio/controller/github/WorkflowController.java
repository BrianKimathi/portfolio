package com.briankimathi.portfolio.controller.github;

import com.briankimathi.portfolio.dto.github.DispatchWorkflowRequest;
import com.briankimathi.portfolio.dto.github.GitHubWorkflowRun;
import com.briankimathi.portfolio.service.github.GitHubWorkflowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.zip.ZipInputStream;

@RestController
@RequestMapping("/api/repos/{repo}/actions")
public class WorkflowController {

    private final GitHubWorkflowService workflowService;

    public WorkflowController(GitHubWorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @GetMapping("/runs")
    public List<GitHubWorkflowRun> listRuns(@PathVariable String repo) {
        return workflowService.listWorkflowRuns("owner", repo);
    }

    @PostMapping("/workflows/{workflowId}/dispatches")
    public ResponseEntity<Void> dispatch(
            @PathVariable String repo,
            @PathVariable long workflowId,
            @RequestBody DispatchWorkflowRequest request) {
        workflowService.dispatchWorkflow("owner", repo, workflowId, request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/runs/{runId}/logs")
    public String getLogs(@PathVariable String repo, @PathVariable long runId) {
        return workflowService.getWorkflowLogs("owner", repo, runId);
    }
}
