package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class EventResponse {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String date;
    private String time;
    private String venue;
    private String posterUrl;
    private String registrationUrl;
    private String category;
    private boolean isUpcoming;
    private boolean registrationOpen;
    private String agendaJson;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EventResponse() {}

    public EventResponse(Long id, String title, String subtitle, String description, String date, String time, String venue, String posterUrl, String registrationUrl, String category, boolean isUpcoming, boolean registrationOpen, String agendaJson, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.date = date;
        this.time = time;
        this.venue = venue;
        this.posterUrl = posterUrl;
        this.registrationUrl = registrationUrl;
        this.category = category;
        this.isUpcoming = isUpcoming;
        this.registrationOpen = registrationOpen;
        this.agendaJson = agendaJson;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static EventResponseBuilder builder() {
        return new EventResponseBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getRegistrationUrl() { return registrationUrl; }
    public void setRegistrationUrl(String registrationUrl) { this.registrationUrl = registrationUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public boolean isUpcoming() { return isUpcoming; }
    public void setUpcoming(boolean upcoming) { isUpcoming = upcoming; }
    public boolean isRegistrationOpen() { return registrationOpen; }
    public void setRegistrationOpen(boolean registrationOpen) { this.registrationOpen = registrationOpen; }
    public String getAgendaJson() { return agendaJson; }
    public void setAgendaJson(String agendaJson) { this.agendaJson = agendaJson; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class EventResponseBuilder {
        private Long id;
        private String title;
        private String subtitle;
        private String description;
        private String date;
        private String time;
        private String venue;
        private String posterUrl;
        private String registrationUrl;
        private String category;
        private boolean isUpcoming = true;
        private boolean registrationOpen = true;
        private String agendaJson;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public EventResponseBuilder id(Long id) { this.id = id; return this; }
        public EventResponseBuilder title(String title) { this.title = title; return this; }
        public EventResponseBuilder subtitle(String subtitle) { this.subtitle = subtitle; return this; }
        public EventResponseBuilder description(String description) { this.description = description; return this; }
        public EventResponseBuilder date(String date) { this.date = date; return this; }
        public EventResponseBuilder time(String time) { this.time = time; return this; }
        public EventResponseBuilder venue(String venue) { this.venue = venue; return this; }
        public EventResponseBuilder posterUrl(String posterUrl) { this.posterUrl = posterUrl; return this; }
        public EventResponseBuilder registrationUrl(String registrationUrl) { this.registrationUrl = registrationUrl; return this; }
        public EventResponseBuilder category(String category) { this.category = category; return this; }
        public EventResponseBuilder isUpcoming(boolean isUpcoming) { this.isUpcoming = isUpcoming; return this; }
        public EventResponseBuilder registrationOpen(boolean registrationOpen) { this.registrationOpen = registrationOpen; return this; }
        public EventResponseBuilder agendaJson(String agendaJson) { this.agendaJson = agendaJson; return this; }
        public EventResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public EventResponseBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public EventResponse build() {
            return new EventResponse(id, title, subtitle, description, date, time, venue, posterUrl, registrationUrl, category, isUpcoming, registrationOpen, agendaJson, createdAt, updatedAt);
        }
    }
}
