package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.NotBlank;

public class StoryRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;

    @NotBlank(message = "Excerpt is required")
    private String excerpt;

    @NotBlank(message = "Content is required")
    private String content;

    private String category;
    private String coverImageUrl;
    private String authorName;
    private String authorRole;
    private String authorAvatarUrl;
    private int readingTime = 5;
    private boolean published = true;

    public StoryRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }
    public String getAuthorAvatarUrl() { return authorAvatarUrl; }
    public void setAuthorAvatarUrl(String authorAvatarUrl) { this.authorAvatarUrl = authorAvatarUrl; }
    public int getReadingTime() { return readingTime; }
    public void setReadingTime(int readingTime) { this.readingTime = readingTime; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
}
