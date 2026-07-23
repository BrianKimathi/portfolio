package com.briankimathi.portfolio.repository;

import com.briankimathi.portfolio.model.OAuthProviderConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthProviderConfigRepository extends JpaRepository<OAuthProviderConfig, Long> {
    Optional<OAuthProviderConfig> findByProvider(String provider);
}
