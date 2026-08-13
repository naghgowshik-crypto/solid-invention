package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.NotBlank;

public class EventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String subtitle;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Date is required")
    private String date;

    private String time;
    private String venue;
    private String category;
    private String posterUrl;
    private String registrationUrl;
    private boolean upcoming = true;
    private boolean registrationOpen = true;
    private String agendaJson;

    public EventRequest() {}

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
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public String getRegistrationUrl() { return registrationUrl; }
    public void setRegistrationUrl(String registrationUrl) { this.registrationUrl = registrationUrl; }
    public boolean isUpcoming() { return upcoming; }
    public void setUpcoming(boolean upcoming) { this.upcoming = upcoming; }
    public boolean isRegistrationOpen() { return registrationOpen; }
    public void setRegistrationOpen(boolean registrationOpen) { this.registrationOpen = registrationOpen; }
    public String getAgendaJson() { return agendaJson; }
    public void setAgendaJson(String agendaJson) { this.agendaJson = agendaJson; }
}
