package com.briankimathi.portfolio.config;

import com.briankimathi.portfolio.model.AdminUser;
import com.briankimathi.portfolio.model.OAuthProviderConfig;
import com.briankimathi.portfolio.repository.AdminUserRepository;
import com.briankimathi.portfolio.repository.OAuthProviderConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final AdminUserRepository userRepository;
    private final OAuthProviderConfigRepository oauthRepo;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(AdminUserRepository userRepository,
                      OAuthProviderConfigRepository oauthRepo,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.oauthRepo = oauthRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed default admin user
        if (userRepository.count() == 0) {
            AdminUser admin = new AdminUser(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    "ADMIN"
            );
            userRepository.save(admin);
            log.info("Default admin user created (username: admin, password: admin123)");
        }

        // Seed OAuth provider configs (disabled by default)
        if (oauthRepo.count() == 0) {
            oauthRepo.save(new OAuthProviderConfig("GOOGLE", "", "", false));
            oauthRepo.save(new OAuthProviderConfig("GITHUB", "", "", false));
            log.info("Default OAuth provider configs created (both disabled)");
        }
    }
}
