package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "videos", indexes = {
    @Index(name = "idx_video_category", columnList = "category"),
    @Index(name = "idx_video_created", columnList = "created_at")
})
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 500)
    private String thumbnailUrl;

    @Column(nullable = false, length = 500)
    private String videoUrl;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(length = 20)
    private String duration;

    private int viewsCount = 0;

    @Column(length = 50)
    private String dateStr;

    private boolean featured = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Video() {}

    public Video(Long id, String title, String description, String thumbnailUrl, String videoUrl, String category, String duration, int viewsCount, String dateStr, boolean featured, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.videoUrl = videoUrl;
        this.category = category;
        this.duration = duration;
        this.viewsCount = viewsCount;
        this.dateStr = dateStr;
        this.featured = featured;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static VideoBuilder builder() { return new VideoBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public int getViewsCount() { return viewsCount; }
    public void setViewsCount(int viewsCount) { this.viewsCount = viewsCount; }
    public String getDateStr() { return dateStr; }
    public void setDateStr(String dateStr) { this.dateStr = dateStr; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class VideoBuilder {
        private Long id;
        private String title;
        private String description;
        private String thumbnailUrl;
        private String videoUrl;
        private String category;
        private String duration;
        private int viewsCount = 0;
        private String dateStr;
        private boolean featured = false;
        private LocalDateTime createdAt;

        public VideoBuilder id(Long id) { this.id = id; return this; }
        public VideoBuilder title(String title) { this.title = title; return this; }
        public VideoBuilder description(String description) { this.description = description; return this; }
        public VideoBuilder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public VideoBuilder videoUrl(String videoUrl) { this.videoUrl = videoUrl; return this; }
        public VideoBuilder category(String category) { this.category = category; return this; }
        public VideoBuilder duration(String duration) { this.duration = duration; return this; }
        public VideoBuilder viewsCount(int viewsCount) { this.viewsCount = viewsCount; return this; }
        public VideoBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public VideoBuilder featured(boolean featured) { this.featured = featured; return this; }
        public VideoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Video build() {
            return new Video(id, title, description, thumbnailUrl, videoUrl, category, duration, viewsCount, dateStr, featured, createdAt);
        }
    }
}
