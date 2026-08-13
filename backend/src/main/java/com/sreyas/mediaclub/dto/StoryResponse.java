package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class StoryResponse {
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
    private int readingTime;
    private boolean published;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;

    public StoryResponse() {}

    public StoryResponse(Long id, String title, String slug, String excerpt, String content, String coverImageUrl, String authorName, String authorRole, String authorAvatarUrl, String category, int readingTime, boolean published, LocalDateTime publishedAt, LocalDateTime createdAt) {
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
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
    }

    public static StoryResponseBuilder builder() { return new StoryResponseBuilder(); }

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

    public static class StoryResponseBuilder {
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
        private int readingTime;
        private boolean published;
        private LocalDateTime publishedAt;
        private LocalDateTime createdAt;

        public StoryResponseBuilder id(Long id) { this.id = id; return this; }
        public StoryResponseBuilder title(String title) { this.title = title; return this; }
        public StoryResponseBuilder slug(String slug) { this.slug = slug; return this; }
        public StoryResponseBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public StoryResponseBuilder content(String content) { this.content = content; return this; }
        public StoryResponseBuilder coverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; return this; }
        public StoryResponseBuilder authorName(String authorName) { this.authorName = authorName; return this; }
        public StoryResponseBuilder authorRole(String authorRole) { this.authorRole = authorRole; return this; }
        public StoryResponseBuilder authorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; return this; }
        public StoryResponseBuilder category(String category) { this.category = category; return this; }
        public StoryResponseBuilder readingTime(int readingTime) { this.readingTime = readingTime; return this; }
        public StoryResponseBuilder published(boolean published) { this.published = published; return this; }
        public StoryResponseBuilder publishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; return this; }
        public StoryResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public StoryResponse build() {
            return new StoryResponse(id, title, slug, excerpt, content, coverImageUrl, authorName, authorRole, authorAvatarUrl, category, readingTime, published, publishedAt, createdAt);
        }
    }
}
