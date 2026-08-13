package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class GalleryItemResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String category;
    private String photographer;
    private String eventName;
    private String dateStr;
    private int likesCount;
    private String camera;
    private String lens;
    private String iso;
    private String tags;
    private String location;
    private int displayOrder;
    private LocalDateTime createdAt;

    public GalleryItemResponse() {}

    public GalleryItemResponse(Long id, String title, String description, String imageUrl, String category, String photographer, String eventName, String dateStr, int likesCount, String camera, String lens, String iso, String tags, String location, int displayOrder, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.photographer = photographer;
        this.eventName = eventName;
        this.dateStr = dateStr;
        this.likesCount = likesCount;
        this.camera = camera;
        this.lens = lens;
        this.iso = iso;
        this.tags = tags;
        this.location = location;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
    }

    public static GalleryItemResponseBuilder builder() { return new GalleryItemResponseBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getPhotographer() { return photographer; }
    public void setPhotographer(String photographer) { this.photographer = photographer; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public String getDateStr() { return dateStr; }
    public void setDateStr(String dateStr) { this.dateStr = dateStr; }
    public int getLikesCount() { return likesCount; }
    public void setLikesCount(int likesCount) { this.likesCount = likesCount; }
    public String getCamera() { return camera; }
    public void setCamera(String camera) { this.camera = camera; }
    public String getLens() { return lens; }
    public void setLens(String lens) { this.lens = lens; }
    public String getIso() { return iso; }
    public void setIso(String iso) { this.iso = iso; }
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class GalleryItemResponseBuilder {
        private Long id;
        private String title;
        private String description;
        private String imageUrl;
        private String category;
        private String photographer;
        private String eventName;
        private String dateStr;
        private int likesCount;
        private String camera;
        private String lens;
        private String iso;
        private String tags;
        private String location;
        private int displayOrder;
        private LocalDateTime createdAt;

        public GalleryItemResponseBuilder id(Long id) { this.id = id; return this; }
        public GalleryItemResponseBuilder title(String title) { this.title = title; return this; }
        public GalleryItemResponseBuilder description(String description) { this.description = description; return this; }
        public GalleryItemResponseBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public GalleryItemResponseBuilder category(String category) { this.category = category; return this; }
        public GalleryItemResponseBuilder photographer(String photographer) { this.photographer = photographer; return this; }
        public GalleryItemResponseBuilder eventName(String eventName) { this.eventName = eventName; return this; }
        public GalleryItemResponseBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public GalleryItemResponseBuilder likesCount(int likesCount) { this.likesCount = likesCount; return this; }
        public GalleryItemResponseBuilder camera(String camera) { this.camera = camera; return this; }
        public GalleryItemResponseBuilder lens(String lens) { this.lens = lens; return this; }
        public GalleryItemResponseBuilder iso(String iso) { this.iso = iso; return this; }
        public GalleryItemResponseBuilder tags(String tags) { this.tags = tags; return this; }
        public GalleryItemResponseBuilder location(String location) { this.location = location; return this; }
        public GalleryItemResponseBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public GalleryItemResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public GalleryItemResponse build() {
            return new GalleryItemResponse(id, title, description, imageUrl, category, photographer, eventName, dateStr, likesCount, camera, lens, iso, tags, location, displayOrder, createdAt);
        }
    }
}
