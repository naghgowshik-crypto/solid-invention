package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class AnnouncementResponse {

    private Long id;
    private String title;
    private String content;
    private String dateStr;
    private String category;
    private String imageUrl;
    private boolean published;
    private int displayOrder;
    private LocalDateTime createdAt;

    public AnnouncementResponse() {}

    public AnnouncementResponse(Long id, String title, String content, String dateStr, String category, String imageUrl, boolean published, int displayOrder, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.dateStr = dateStr;
        this.category = category;
        this.imageUrl = imageUrl;
        this.published = published;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
    }

    public static AnnouncementResponseBuilder builder() { return new AnnouncementResponseBuilder(); }

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

    public static class AnnouncementResponseBuilder {
        private Long id;
        private String title;
        private String content;
        private String dateStr;
        private String category;
        private String imageUrl;
        private boolean published;
        private int displayOrder;
        private LocalDateTime createdAt;

        public AnnouncementResponseBuilder id(Long id) { this.id = id; return this; }
        public AnnouncementResponseBuilder title(String title) { this.title = title; return this; }
        public AnnouncementResponseBuilder content(String content) { this.content = content; return this; }
        public AnnouncementResponseBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public AnnouncementResponseBuilder category(String category) { this.category = category; return this; }
        public AnnouncementResponseBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public AnnouncementResponseBuilder published(boolean published) { this.published = published; return this; }
        public AnnouncementResponseBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public AnnouncementResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AnnouncementResponse build() {
            return new AnnouncementResponse(id, title, content, dateStr, category, imageUrl, published, displayOrder, createdAt);
        }
    }
}
