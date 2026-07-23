package com.briankimathi.portfolio.dto;

public class OAuthProviderDto {

    private String provider;
    private String clientId;
    private String clientSecret;
    private boolean enabled;

    public OAuthProviderDto() {}

    public OAuthProviderDto(String provider, String clientId, String clientSecret, boolean enabled) {
        this.provider = provider;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.enabled = enabled;
    }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }

    public String getClientSecret() { return clientSecret; }
    public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
