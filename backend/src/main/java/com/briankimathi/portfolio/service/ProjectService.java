package com.briankimathi.portfolio.service;

import com.briankimathi.portfolio.dto.ProjectRequest;
import com.briankimathi.portfolio.dto.ProjectResponse;
import com.briankimathi.portfolio.model.Project;
import com.briankimathi.portfolio.model.ProjectImage;
import com.briankimathi.portfolio.model.ProjectTechnology;
import com.briankimathi.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> listProjects() {
        return projectRepository.findAllByOrderByUpdatedAtDesc().stream()
                .map(ProjectResponse::fromEntity)
                .toList();
    }

    public ProjectResponse getProject(Long id) {
        return projectRepository.findById(id)
                .map(ProjectResponse::fromEntity)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
    }

    public ProjectResponse getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .map(ProjectResponse::fromEntity)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + slug));
    }

    @Transactional
    public ProjectResponse createProject(ProjectRequest req) {
        Project project = new Project();
        applyRequest(project, req);
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        return ProjectResponse.fromEntity(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest req) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        applyRequest(project, req);
        project.setUpdatedAt(LocalDateTime.now());
        return ProjectResponse.fromEntity(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }

    @Transactional
    public ProjectResponse updateReadme(Long id, String readme) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        project.setReadme(readme);
        project.setUpdatedAt(LocalDateTime.now());
        return ProjectResponse.fromEntity(projectRepository.save(project));
    }

    private void applyRequest(Project project, ProjectRequest req) {
        if (req.getTitle() != null) project.setTitle(req.getTitle());
        if (req.getSlug() != null) project.setSlug(req.getSlug());
        if (req.getDescription() != null) project.setDescription(req.getDescription());
        if (req.getLongDescription() != null) project.setLongDescription(req.getLongDescription());
        if (req.getArchitectureImageUrl() != null) project.setArchitectureImageUrl(req.getArchitectureImageUrl());
        if (req.getDatabaseDesignUrl() != null) project.setDatabaseDesignUrl(req.getDatabaseDesignUrl());
        if (req.getGithubRepo() != null) project.setGithubRepo(req.getGithubRepo());
        if (req.getGithubUrl() != null) project.setGithubUrl(req.getGithubUrl());
        if (req.getLiveUrl() != null) project.setLiveUrl(req.getLiveUrl());
        if (req.getStatus() != null) project.setStatus(req.getStatus());
        if (req.getFeatures() != null) project.setFeatures(req.getFeatures());

        if (req.getTechnologies() != null) {
            project.getTechnologies().clear();
            List<ProjectTechnology> techs = IntStream.range(0, req.getTechnologies().size())
                    .mapToObj(i -> {
                        var t = req.getTechnologies().get(i);
                        return new ProjectTechnology(t.getName(), t.getImageUrl(), i);
                    })
                    .toList();
            project.getTechnologies().addAll(techs);
        }

        if (req.getImages() != null) {
            project.getImages().clear();
            List<ProjectImage> imgs = IntStream.range(0, req.getImages().size())
                    .mapToObj(i -> {
                        var img = req.getImages().get(i);
                        return new ProjectImage(img.getImageUrl(), img.getCaption(), img.isPrimary(), i);
                    })
                    .toList();
            project.getImages().addAll(imgs);
        }
    }
}
