package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.NotBlank;

public class AnnouncementRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    private String dateStr;
    private String category;
    private String imageUrl;
    private boolean published = true;
    private int displayOrder = 0;

    public AnnouncementRequest() {}

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
}
