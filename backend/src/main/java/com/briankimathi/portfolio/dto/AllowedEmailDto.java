package com.briankimathi.portfolio.dto;

import java.time.LocalDateTime;

public class AllowedEmailDto {

    private Long id;
    private String email;
    private String addedBy;
    private String provider;
    private LocalDateTime createdAt;

    public AllowedEmailDto() {}

    public AllowedEmailDto(Long id, String email, String addedBy, String provider, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.addedBy = addedBy;
        this.provider = provider;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddedBy() { return addedBy; }
    public void setAddedBy(String addedBy) { this.addedBy = addedBy; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
