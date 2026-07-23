package com.briankimathi.portfolio.config;

import com.briankimathi.portfolio.service.GitHubAuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestClient;

@Configuration
public class GitHubRestClientConfig {

    private final GitHubAuthService gitHubAuthService;

    public GitHubRestClientConfig(GitHubAuthService gitHubAuthService) {
        this.gitHubAuthService = gitHubAuthService;
    }

    @Bean(name = "gitHubRestClient")
    public RestClient gitHubRestClient() {
        return RestClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .defaultHeader("X-GitHub-Api-Version", "2022-11-28")
                .requestInterceptor((request, body, execution) -> {
                    String token = gitHubAuthService.getInstallationAccessToken();
                    request.getHeaders().setBearerAuth(token);
                    return execution.execute(request, body);
                })
                .build();
    }
}
