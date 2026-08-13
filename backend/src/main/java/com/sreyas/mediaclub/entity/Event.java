package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events", indexes = {
    @Index(name = "idx_event_date", columnList = "event_date"),
    @Index(name = "idx_event_upcoming", columnList = "is_upcoming")
})
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 150)
    private String subtitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "event_date", nullable = false, length = 50)
    private String date;

    @Column(length = 50)
    private String time;

    @Column(nullable = false, length = 100)
    private String venue;

    @Column(length = 500)
    private String posterUrl;

    @Column(length = 500)
    private String registrationUrl;

    @Column(length = 50)
    private String category;

    @Column(name = "is_upcoming", nullable = false)
    private boolean isUpcoming = true;

    @Column(name = "registration_open", nullable = false)
    private boolean registrationOpen = true;

    @Column(columnDefinition = "TEXT")
    private String agendaJson;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Event() {}

    public Event(Long id, String title, String subtitle, String description, String date, String time, String venue, String posterUrl, String registrationUrl, String category, boolean isUpcoming, boolean registrationOpen, String agendaJson, LocalDateTime createdAt, LocalDateTime updatedAt) {
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
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
        this.updatedAt = updatedAt != null ? updatedAt : LocalDateTime.now();
    }

    public static EventBuilder builder() { return new EventBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
        if (this.updatedAt == null) this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
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

    public static class EventBuilder {
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

        public EventBuilder id(Long id) { this.id = id; return this; }
        public EventBuilder title(String title) { this.title = title; return this; }
        public EventBuilder subtitle(String subtitle) { this.subtitle = subtitle; return this; }
        public EventBuilder description(String description) { this.description = description; return this; }
        public EventBuilder date(String date) { this.date = date; return this; }
        public EventBuilder time(String time) { this.time = time; return this; }
        public EventBuilder venue(String venue) { this.venue = venue; return this; }
        public EventBuilder posterUrl(String posterUrl) { this.posterUrl = posterUrl; return this; }
        public EventBuilder registrationUrl(String registrationUrl) { this.registrationUrl = registrationUrl; return this; }
        public EventBuilder category(String category) { this.category = category; return this; }
        public EventBuilder isUpcoming(boolean isUpcoming) { this.isUpcoming = isUpcoming; return this; }
        public EventBuilder registrationOpen(boolean registrationOpen) { this.registrationOpen = registrationOpen; return this; }
        public EventBuilder agendaJson(String agendaJson) { this.agendaJson = agendaJson; return this; }
        public EventBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public EventBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Event build() {
            return new Event(id, title, subtitle, description, date, time, venue, posterUrl, registrationUrl, category, isUpcoming, registrationOpen, agendaJson, createdAt, updatedAt);
        }
    }
}
