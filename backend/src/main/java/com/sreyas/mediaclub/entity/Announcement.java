package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "announcements", indexes = {
    @Index(name = "idx_announcement_published", columnList = "published"),
    @Index(name = "idx_announcement_created", columnList = "created_at")
})
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 50)
    private String dateStr;

    @Column(length = 50)
    private String category;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private boolean published = true;

    @Column(nullable = false)
    private int displayOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Announcement() {}

    public Announcement(Long id, String title, String content, String dateStr, String category, String imageUrl, boolean published, int displayOrder, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.dateStr = dateStr;
        this.category = category;
        this.imageUrl = imageUrl;
        this.published = published;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static AnnouncementBuilder builder() { return new AnnouncementBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getDateStr() { return dateStr; }
    public void setDateStr(String dateStr) { this.dateStr = dateStr; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class AnnouncementBuilder {
        private Long id;
        private String title;
        private String content;
        private String dateStr;
        private String category;
        private String imageUrl;
        private boolean published = true;
        private int displayOrder = 0;
        private LocalDateTime createdAt;

        public AnnouncementBuilder id(Long id) { this.id = id; return this; }
        public AnnouncementBuilder title(String title) { this.title = title; return this; }
        public AnnouncementBuilder content(String content) { this.content = content; return this; }
        public AnnouncementBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public AnnouncementBuilder category(String category) { this.category = category; return this; }
        public AnnouncementBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public AnnouncementBuilder published(boolean published) { this.published = published; return this; }
        public AnnouncementBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public AnnouncementBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Announcement build() {
            return new Announcement(id, title, content, dateStr, category, imageUrl, published, displayOrder, createdAt);
        }
    }
}
