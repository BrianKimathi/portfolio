package com.briankimathi.portfolio.config;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class DockerClientConfig implements DisposableBean {

    private static final Logger log = LoggerFactory.getLogger(DockerClientConfig.class);

    private DockerClient dockerClient;

    @Bean
    public DockerClient dockerClient(
            @Value("${docker.host:unix:///var/run/docker.sock}") String host,
            @Value("${docker.tls-verify:false}") boolean tlsVerify,
            @Value("${docker.cert-path:}") String certPath) {

        var configBuilder = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost(host);

        if (tlsVerify && !certPath.isEmpty()) {
            configBuilder
                    .withDockerTlsVerify(true)
                    .withDockerCertPath(certPath);
        }

        var config = configBuilder.build();

        DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
                .dockerHost(config.getDockerHost())
                .sslConfig(config.getSSLConfig())
                .maxConnections(100)
                .connectionTimeout(Duration.ofSeconds(30))
                .responseTimeout(Duration.ofSeconds(60))
                .build();

        this.dockerClient = DockerClientImpl.getInstance(config, httpClient);
        log.info("DockerClient initialized for host: {}", host);
        return this.dockerClient;
    }

    @Override
    public void destroy() {
        if (dockerClient != null) {
            try {
                dockerClient.close();
                log.info("DockerClient connection closed");
            } catch (Exception e) {
                log.warn("Error closing DockerClient", e);
            }
        }
    }
}
