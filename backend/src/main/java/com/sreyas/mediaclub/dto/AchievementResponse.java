package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class AchievementResponse {
    private Long id;
    private String title;
    private String description;
    private String year;
    private String award;
    private String organizer;
    private String imageUrl;
    private String highlightStat;
    private String category;
    private LocalDateTime createdAt;

    public AchievementResponse() {}

    public AchievementResponse(Long id, String title, String description, String year, String award, String organizer, String imageUrl, String highlightStat, String category, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
        this.award = award;
        this.organizer = organizer;
        this.imageUrl = imageUrl;
        this.highlightStat = highlightStat;
        this.category = category;
        this.createdAt = createdAt;
    }

    public static AchievementResponseBuilder builder() { return new AchievementResponseBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getAward() { return award; }
    public void setAward(String award) { this.award = award; }
    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getHighlightStat() { return highlightStat; }
    public void setHighlightStat(String highlightStat) { this.highlightStat = highlightStat; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class AchievementResponseBuilder {
        private Long id;
        private String title;
        private String description;
        private String year;
        private String award;
        private String organizer;
        private String imageUrl;
        private String highlightStat;
        private String category;
        private LocalDateTime createdAt;

        public AchievementResponseBuilder id(Long id) { this.id = id; return this; }
        public AchievementResponseBuilder title(String title) { this.title = title; return this; }
        public AchievementResponseBuilder description(String description) { this.description = description; return this; }
        public AchievementResponseBuilder year(String year) { this.year = year; return this; }
        public AchievementResponseBuilder award(String award) { this.award = award; return this; }
        public AchievementResponseBuilder organizer(String organizer) { this.organizer = organizer; return this; }
        public AchievementResponseBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public AchievementResponseBuilder highlightStat(String highlightStat) { this.highlightStat = highlightStat; return this; }
        public AchievementResponseBuilder category(String category) { this.category = category; return this; }
        public AchievementResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AchievementResponse build() {
            return new AchievementResponse(id, title, description, year, award, organizer, imageUrl, highlightStat, category, createdAt);
        }
    }
}
