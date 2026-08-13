package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class VideoResponse {
    private Long id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String videoUrl;
    private String category;
    private String duration;
    private int viewsCount;
    private String dateStr;
    private boolean featured;
    private LocalDateTime createdAt;

    public VideoResponse() {}

    public VideoResponse(Long id, String title, String description, String thumbnailUrl, String videoUrl, String category, String duration, int viewsCount, String dateStr, boolean featured, LocalDateTime createdAt) {
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
        this.createdAt = createdAt;
    }

    public static VideoResponseBuilder builder() { return new VideoResponseBuilder(); }

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

    public static class VideoResponseBuilder {
        private Long id;
        private String title;
        private String description;
        private String thumbnailUrl;
        private String videoUrl;
        private String category;
        private String duration;
        private int viewsCount;
        private String dateStr;
        private boolean featured;
        private LocalDateTime createdAt;

        public VideoResponseBuilder id(Long id) { this.id = id; return this; }
        public VideoResponseBuilder title(String title) { this.title = title; return this; }
        public VideoResponseBuilder description(String description) { this.description = description; return this; }
        public VideoResponseBuilder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public VideoResponseBuilder videoUrl(String videoUrl) { this.videoUrl = videoUrl; return this; }
        public VideoResponseBuilder category(String category) { this.category = category; return this; }
        public VideoResponseBuilder duration(String duration) { this.duration = duration; return this; }
        public VideoResponseBuilder viewsCount(int viewsCount) { this.viewsCount = viewsCount; return this; }
        public VideoResponseBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public VideoResponseBuilder featured(boolean featured) { this.featured = featured; return this; }
        public VideoResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public VideoResponse build() {
            return new VideoResponse(id, title, description, thumbnailUrl, videoUrl, category, duration, viewsCount, dateStr, featured, createdAt);
        }
    }
}
