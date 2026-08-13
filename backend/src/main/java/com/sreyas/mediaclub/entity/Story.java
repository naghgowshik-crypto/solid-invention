package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stories", indexes = {
    @Index(name = "idx_story_published", columnList = "published"),
    @Index(name = "idx_story_published_at", columnList = "published_at")
})
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 200, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 500)
    private String coverImageUrl;

    @Column(length = 100)
    private String authorName;

    @Column(length = 100)
    private String authorRole;

    @Column(length = 500)
    private String authorAvatarUrl;

    @Column(length = 50)
    private String category;

    private int readingTime = 5;

    private boolean published = true;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Story() {}

    public Story(Long id, String title, String slug, String excerpt, String content, String coverImageUrl, String authorName, String authorRole, String authorAvatarUrl, String category, int readingTime, boolean published, LocalDateTime publishedAt, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.excerpt = excerpt;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.authorAvatarUrl = authorAvatarUrl;
        this.category = category;
        this.readingTime = readingTime;
        this.published = published;
        this.publishedAt = publishedAt != null ? publishedAt : LocalDateTime.now();
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static StoryBuilder builder() { return new StoryBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
        if (this.publishedAt == null) this.publishedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }
    public String getAuthorAvatarUrl() { return authorAvatarUrl; }
    public void setAuthorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getReadingTime() { return readingTime; }
    public void setReadingTime(int readingTime) { this.readingTime = readingTime; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class StoryBuilder {
        private Long id;
        private String title;
        private String slug;
        private String excerpt;
        private String content;
        private String coverImageUrl;
        private String authorName;
        private String authorRole;
        private String authorAvatarUrl;
        private String category;
        private int readingTime = 5;
        private boolean published = true;
        private LocalDateTime publishedAt;
        private LocalDateTime createdAt;

        public StoryBuilder id(Long id) { this.id = id; return this; }
        public StoryBuilder title(String title) { this.title = title; return this; }
        public StoryBuilder slug(String slug) { this.slug = slug; return this; }
        public StoryBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public StoryBuilder content(String content) { this.content = content; return this; }
        public StoryBuilder coverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; return this; }
        public StoryBuilder authorName(String authorName) { this.authorName = authorName; return this; }
        public StoryBuilder authorRole(String authorRole) { this.authorRole = authorRole; return this; }
        public StoryBuilder authorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; return this; }
        public StoryBuilder category(String category) { this.category = category; return this; }
        public StoryBuilder readingTime(int readingTime) { this.readingTime = readingTime; return this; }
        public StoryBuilder published(boolean published) { this.published = published; return this; }
        public StoryBuilder publishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; return this; }
        public StoryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Story build() {
            return new Story(id, title, slug, excerpt, content, coverImageUrl, authorName, authorRole, authorAvatarUrl, category, readingTime, published, publishedAt, createdAt);
        }
    }
}
