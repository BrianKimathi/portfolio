package com.briankimathi.portfolio.dto.github;

import java.util.Map;

public record DispatchWorkflowRequest(
        String ref,
        Map<String, Object> inputs
) {}
