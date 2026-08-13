package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "achievements", indexes = {
    @Index(name = "idx_achieve_created", columnList = "created_at")
})
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "achievement_year", nullable = false, length = 20)
    private String year;

    @Column(nullable = false, length = 100)
    private String award;

    @Column(nullable = false, length = 150)
    private String organizer;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String highlightStat;

    @Column(length = 50)
    private String category;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Achievement() {}

    public Achievement(Long id, String title, String description, String year, String award, String organizer, String imageUrl, String highlightStat, String category, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
        this.award = award;
        this.organizer = organizer;
        this.imageUrl = imageUrl;
        this.highlightStat = highlightStat;
        this.category = category;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static AchievementBuilder builder() { return new AchievementBuilder(); }

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

    public static class AchievementBuilder {
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

        public AchievementBuilder id(Long id) { this.id = id; return this; }
        public AchievementBuilder title(String title) { this.title = title; return this; }
        public AchievementBuilder description(String description) { this.description = description; return this; }
        public AchievementBuilder year(String year) { this.year = year; return this; }
        public AchievementBuilder award(String award) { this.award = award; return this; }
        public AchievementBuilder organizer(String organizer) { this.organizer = organizer; return this; }
        public AchievementBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public AchievementBuilder highlightStat(String highlightStat) { this.highlightStat = highlightStat; return this; }
        public AchievementBuilder category(String category) { this.category = category; return this; }
        public AchievementBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Achievement build() {
            return new Achievement(id, title, description, year, award, organizer, imageUrl, highlightStat, category, createdAt);
        }
    }
}
