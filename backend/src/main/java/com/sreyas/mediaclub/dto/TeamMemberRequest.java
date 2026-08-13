package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.NotBlank;

public class TeamMemberRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Position is required")
    private String position;

    private String roleType = "LEAD";
    private String team = "Creative";
    private String bio;
    private String branch;
    private String year;
    private String avatarUrl;
    private String instagramUrl;
    private String linkedinUrl;
    private String youtubeUrl;
    private String portfolioUrl;
    private int displayOrder = 0;
    private boolean active = true;

    public TeamMemberRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getRoleType() { return roleType; }
    public void setRoleType(String roleType) { this.roleType = roleType; }
    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
