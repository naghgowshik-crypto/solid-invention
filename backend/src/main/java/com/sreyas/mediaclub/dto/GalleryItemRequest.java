package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.NotBlank;

public class GalleryItemRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String photographer;
    private String dateStr;
    private String camera;
    private String lens;
    private String iso;
    private String tags;
    private String location;
    private String description;
    private String eventName;
    private int displayOrder = 0;

    public GalleryItemRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getPhotographer() { return photographer; }
    public void setPhotographer(String photographer) { this.photographer = photographer; }
    public String getDateStr() { return dateStr; }
    public void setDateStr(String dateStr) { this.dateStr = dateStr; }
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
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
