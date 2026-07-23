package com.briankimathi.portfolio.dto.github;

public record BranchProtectionRequest(
        boolean requiredPullRequestReviews,
        boolean dismissStaleReviews,
        boolean requireCodeOwnerReviews,
        boolean requiredStatusChecks,
        boolean enforceAdmins
) {
    public static BranchProtectionRequest defaults() {
        return new BranchProtectionRequest(true, true, false, true, true);
    }
}
