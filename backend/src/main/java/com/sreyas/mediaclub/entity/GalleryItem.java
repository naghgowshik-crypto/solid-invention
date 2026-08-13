package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_items", indexes = {
    @Index(name = "idx_gallery_category", columnList = "category"),
    @Index(name = "idx_gallery_created", columnList = "created_at")
})
public class GalleryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 100)
    private String photographer;

    @Column(length = 100)
    private String eventName;

    @Column(length = 50)
    private String dateStr;

    private int likesCount = 0;

    @Column(length = 100)
    private String camera;

    @Column(length = 100)
    private String lens;

    @Column(length = 50)
    private String iso;

    @Column(length = 300)
    private String tags;

    @Column(length = 100)
    private String location;

    @Column(nullable = false)
    private int displayOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public GalleryItem() {}

    public GalleryItem(Long id, String title, String description, String imageUrl, String category, String photographer, String eventName, String dateStr, int likesCount, String camera, String lens, String iso, String tags, String location, int displayOrder, LocalDateTime createdAt) {
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
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static GalleryItemBuilder builder() { return new GalleryItemBuilder(); }

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

    public static class GalleryItemBuilder {
        private Long id;
        private String title;
        private String description;
        private String imageUrl;
        private String category;
        private String photographer;
        private String eventName;
        private String dateStr;
        private int likesCount = 0;
        private String camera;
        private String lens;
        private String iso;
        private String tags;
        private String location;
        private int displayOrder = 0;
        private LocalDateTime createdAt;

        public GalleryItemBuilder id(Long id) { this.id = id; return this; }
        public GalleryItemBuilder title(String title) { this.title = title; return this; }
        public GalleryItemBuilder description(String description) { this.description = description; return this; }
        public GalleryItemBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public GalleryItemBuilder category(String category) { this.category = category; return this; }
        public GalleryItemBuilder photographer(String photographer) { this.photographer = photographer; return this; }
        public GalleryItemBuilder eventName(String eventName) { this.eventName = eventName; return this; }
        public GalleryItemBuilder dateStr(String dateStr) { this.dateStr = dateStr; return this; }
        public GalleryItemBuilder likesCount(int likesCount) { this.likesCount = likesCount; return this; }
        public GalleryItemBuilder camera(String camera) { this.camera = camera; return this; }
        public GalleryItemBuilder lens(String lens) { this.lens = lens; return this; }
        public GalleryItemBuilder iso(String iso) { this.iso = iso; return this; }
        public GalleryItemBuilder tags(String tags) { this.tags = tags; return this; }
        public GalleryItemBuilder location(String location) { this.location = location; return this; }
        public GalleryItemBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public GalleryItemBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public GalleryItem build() {
            return new GalleryItem(id, title, description, imageUrl, category, photographer, eventName, dateStr, likesCount, camera, lens, iso, tags, location, displayOrder, createdAt);
        }
    }
}
