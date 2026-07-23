package com.briankimathi.portfolio.dto;

import com.briankimathi.portfolio.model.Project;
import com.briankimathi.portfolio.model.ProjectImage;
import com.briankimathi.portfolio.model.ProjectTechnology;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectResponse {

    private Long id;
    private String title;
    private String slug;
    private String description;
    private String longDescription;
    private String architectureImageUrl;
    private String databaseDesignUrl;
    private String githubRepo;
    private String githubUrl;
    private String liveUrl;
    private String readme;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TechnologyItem> technologies;
    private List<ImageItem> images;
    private List<String> features;

    public ProjectResponse() {}

    public static ProjectResponse fromEntity(Project p) {
        ProjectResponse r = new ProjectResponse();
        r.id = p.getId();
        r.title = p.getTitle();
        r.slug = p.getSlug();
        r.description = p.getDescription();
        r.longDescription = p.getLongDescription();
        r.architectureImageUrl = p.getArchitectureImageUrl();
        r.databaseDesignUrl = p.getDatabaseDesignUrl();
        r.githubRepo = p.getGithubRepo();
        r.githubUrl = p.getGithubUrl();
        r.liveUrl = p.getLiveUrl();
        r.readme = p.getReadme();
        r.status = p.getStatus();
        r.createdAt = p.getCreatedAt();
        r.updatedAt = p.getUpdatedAt();
        r.features = p.getFeatures();

        r.technologies = p.getTechnologies().stream()
                .map(t -> new TechnologyItem(t.getId(), t.getName(), t.getImageUrl()))
                .toList();

        r.images = p.getImages().stream()
                .map(i -> new ImageItem(i.getId(), i.getImageUrl(), i.getCaption(), i.isPrimary()))
                .toList();

        return r;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSlug() { return slug; }
    public String getDescription() { return description; }
    public String getLongDescription() { return longDescription; }
    public String getArchitectureImageUrl() { return architectureImageUrl; }
    public String getDatabaseDesignUrl() { return databaseDesignUrl; }
    public String getGithubRepo() { return githubRepo; }
    public String getGithubUrl() { return githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public String getReadme() { return readme; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<TechnologyItem> getTechnologies() { return technologies; }
    public List<ImageItem> getImages() { return images; }
    public List<String> getFeatures() { return features; }

    public static class TechnologyItem {
        private Long id;
        private String name;
        private String imageUrl;

        public TechnologyItem() {}
        public TechnologyItem(Long id, String name, String imageUrl) { this.id = id; this.name = name; this.imageUrl = imageUrl; }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getImageUrl() { return imageUrl; }
    }

    public static class ImageItem {
        private Long id;
        private String imageUrl;
        private String caption;
        private boolean primary;

        public ImageItem() {}
        public ImageItem(Long id, String imageUrl, String caption, boolean primary) { this.id = id; this.imageUrl = imageUrl; this.caption = caption; this.primary = primary; }

        public Long getId() { return id; }
        public String getImageUrl() { return imageUrl; }
        public String getCaption() { return caption; }
        public boolean isPrimary() { return primary; }
    }
}
