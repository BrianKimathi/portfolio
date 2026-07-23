package com.briankimathi.portfolio.dto;

import java.util.List;

public class ProjectRequest {

    private String title;
    private String slug;
    private String description;
    private String longDescription;
    private String architectureImageUrl;
    private String databaseDesignUrl;
    private String githubRepo;
    private String githubUrl;
    private String liveUrl;
    private String status;
    private List<String> features;
    private List<TechnologyItem> technologies;
    private List<ImageItem> images;

    public ProjectRequest() {}

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLongDescription() { return longDescription; }
    public void setLongDescription(String longDescription) { this.longDescription = longDescription; }
    public String getArchitectureImageUrl() { return architectureImageUrl; }
    public void setArchitectureImageUrl(String architectureImageUrl) { this.architectureImageUrl = architectureImageUrl; }
    public String getDatabaseDesignUrl() { return databaseDesignUrl; }
    public void setDatabaseDesignUrl(String databaseDesignUrl) { this.databaseDesignUrl = databaseDesignUrl; }
    public String getGithubRepo() { return githubRepo; }
    public void setGithubRepo(String githubRepo) { this.githubRepo = githubRepo; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    public List<TechnologyItem> getTechnologies() { return technologies; }
    public void setTechnologies(List<TechnologyItem> technologies) { this.technologies = technologies; }
    public List<ImageItem> getImages() { return images; }
    public void setImages(List<ImageItem> images) { this.images = images; }

    public static class TechnologyItem {
        private String name;
        private String imageUrl;

        public TechnologyItem() {}
        public TechnologyItem(String name, String imageUrl) { this.name = name; this.imageUrl = imageUrl; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }

    public static class ImageItem {
        private String imageUrl;
        private String caption;
        private boolean primary;

        public ImageItem() {}
        public ImageItem(String imageUrl, String caption, boolean primary) { this.imageUrl = imageUrl; this.caption = caption; this.primary = primary; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getCaption() { return caption; }
        public void setCaption(String caption) { this.caption = caption; }
        public boolean isPrimary() { return primary; }
        public void setPrimary(boolean primary) { this.primary = primary; }
    }
}
