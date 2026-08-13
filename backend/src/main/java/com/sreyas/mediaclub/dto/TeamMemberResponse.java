package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class TeamMemberResponse {
    private Long id;
    private String name;
    private String position;
    private String roleType;
    private String team;
    private String bio;
    private String branch;
    private String year;
    private String avatarUrl;
    private String instagramUrl;
    private String linkedinUrl;
    private String youtubeUrl;
    private String portfolioUrl;
    private int displayOrder;
    private boolean active;
    private LocalDateTime createdAt;

    public TeamMemberResponse() {}

    public TeamMemberResponse(Long id, String name, String position, String roleType, String team, String bio, String branch, String year, String avatarUrl, String instagramUrl, String linkedinUrl, String youtubeUrl, String portfolioUrl, int displayOrder, boolean active, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.roleType = roleType;
        this.team = team;
        this.bio = bio;
        this.branch = branch;
        this.year = year;
        this.avatarUrl = avatarUrl;
        this.instagramUrl = instagramUrl;
        this.linkedinUrl = linkedinUrl;
        this.youtubeUrl = youtubeUrl;
        this.portfolioUrl = portfolioUrl;
        this.displayOrder = displayOrder;
        this.active = active;
        this.createdAt = createdAt;
    }

    public static TeamMemberResponseBuilder builder() { return new TeamMemberResponseBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class TeamMemberResponseBuilder {
        private Long id;
        private String name;
        private String position;
        private String roleType;
        private String team;
        private String bio;
        private String branch;
        private String year;
        private String avatarUrl;
        private String instagramUrl;
        private String linkedinUrl;
        private String youtubeUrl;
        private String portfolioUrl;
        private int displayOrder;
        private boolean active;
        private LocalDateTime createdAt;

        public TeamMemberResponseBuilder id(Long id) { this.id = id; return this; }
        public TeamMemberResponseBuilder name(String name) { this.name = name; return this; }
        public TeamMemberResponseBuilder position(String position) { this.position = position; return this; }
        public TeamMemberResponseBuilder roleType(String roleType) { this.roleType = roleType; return this; }
        public TeamMemberResponseBuilder team(String team) { this.team = team; return this; }
        public TeamMemberResponseBuilder bio(String bio) { this.bio = bio; return this; }
        public TeamMemberResponseBuilder branch(String branch) { this.branch = branch; return this; }
        public TeamMemberResponseBuilder year(String year) { this.year = year; return this; }
        public TeamMemberResponseBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public TeamMemberResponseBuilder instagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; return this; }
        public TeamMemberResponseBuilder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public TeamMemberResponseBuilder youtubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; return this; }
        public TeamMemberResponseBuilder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public TeamMemberResponseBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public TeamMemberResponseBuilder active(boolean active) { this.active = active; return this; }
        public TeamMemberResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TeamMemberResponse build() {
            return new TeamMemberResponse(id, name, position, roleType, team, bio, branch, year, avatarUrl, instagramUrl, linkedinUrl, youtubeUrl, portfolioUrl, displayOrder, active, createdAt);
        }
    }
}
