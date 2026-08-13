package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "team_members", indexes = {
    @Index(name = "idx_team_team", columnList = "team"),
    @Index(name = "idx_team_active", columnList = "active")
})
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String position;

    @Column(length = 50)
    private String roleType;

    @Column(nullable = false, length = 50)
    private String team;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 50)
    private String branch;

    @Column(name = "academic_year", length = 20)
    private String year;

    @Column(length = 500)
    private String avatarUrl;

    @Column(length = 300)
    private String instagramUrl;

    @Column(length = 300)
    private String linkedinUrl;

    @Column(length = 300)
    private String youtubeUrl;

    @Column(length = 300)
    private String portfolioUrl;

    private int displayOrder = 0;

    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public TeamMember() {}

    public TeamMember(Long id, String name, String position, String roleType, String team, String bio, String branch, String year, String avatarUrl, String instagramUrl, String linkedinUrl, String youtubeUrl, String portfolioUrl, int displayOrder, boolean active, LocalDateTime createdAt) {
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
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static TeamMemberBuilder builder() { return new TeamMemberBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }

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

    public static class TeamMemberBuilder {
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
        private int displayOrder = 0;
        private boolean active = true;
        private LocalDateTime createdAt;

        public TeamMemberBuilder id(Long id) { this.id = id; return this; }
        public TeamMemberBuilder name(String name) { this.name = name; return this; }
        public TeamMemberBuilder position(String position) { this.position = position; return this; }
        public TeamMemberBuilder roleType(String roleType) { this.roleType = roleType; return this; }
        public TeamMemberBuilder team(String team) { this.team = team; return this; }
        public TeamMemberBuilder bio(String bio) { this.bio = bio; return this; }
        public TeamMemberBuilder branch(String branch) { this.branch = branch; return this; }
        public TeamMemberBuilder year(String year) { this.year = year; return this; }
        public TeamMemberBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public TeamMemberBuilder instagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; return this; }
        public TeamMemberBuilder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public TeamMemberBuilder youtubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; return this; }
        public TeamMemberBuilder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public TeamMemberBuilder displayOrder(int displayOrder) { this.displayOrder = displayOrder; return this; }
        public TeamMemberBuilder active(boolean active) { this.active = active; return this; }
        public TeamMemberBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TeamMember build() {
            return new TeamMember(id, name, position, roleType, team, bio, branch, year, avatarUrl, instagramUrl, linkedinUrl, youtubeUrl, portfolioUrl, displayOrder, active, createdAt);
        }
    }
}
