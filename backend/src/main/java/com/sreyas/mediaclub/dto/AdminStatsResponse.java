package com.sreyas.mediaclub.dto;

public class AdminStatsResponse {

    private long totalApplications;
    private long newApplications;
    private long reviewingApplications;
    private long shortlistedApplications;
    private long selectedApplications;
    private long rejectedApplications;
    private long totalContactMessages;

    public AdminStatsResponse() {}

    public AdminStatsResponse(long totalApplications, long newApplications, long reviewingApplications, long shortlistedApplications, long selectedApplications, long rejectedApplications, long totalContactMessages) {
        this.totalApplications = totalApplications;
        this.newApplications = newApplications;
        this.reviewingApplications = reviewingApplications;
        this.shortlistedApplications = shortlistedApplications;
        this.selectedApplications = selectedApplications;
        this.rejectedApplications = rejectedApplications;
        this.totalContactMessages = totalContactMessages;
    }

    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
    public long getNewApplications() { return newApplications; }
    public void setNewApplications(long newApplications) { this.newApplications = newApplications; }
    public long getReviewingApplications() { return reviewingApplications; }
    public void setReviewingApplications(long reviewingApplications) { this.reviewingApplications = reviewingApplications; }
    public long getShortlistedApplications() { return shortlistedApplications; }
    public void setShortlistedApplications(long shortlistedApplications) { this.shortlistedApplications = shortlistedApplications; }
    public long getSelectedApplications() { return selectedApplications; }
    public void setSelectedApplications(long selectedApplications) { this.selectedApplications = selectedApplications; }
    public long getRejectedApplications() { return rejectedApplications; }
    public void setRejectedApplications(long rejectedApplications) { this.rejectedApplications = rejectedApplications; }
    public long getTotalContactMessages() { return totalContactMessages; }
    public void setTotalContactMessages(long totalContactMessages) { this.totalContactMessages = totalContactMessages; }
}
