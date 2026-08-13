package com.sreyas.mediaclub.dto;

import com.sreyas.mediaclub.entity.ApplicationStatus;
import java.time.LocalDateTime;

public class ApplicationResponse {
    private Long id;
    private String fullName;
    private String rollNumber;
    private String branch;
    private String year;
    private String section;
    private String email;
    private String phone;
    private String preferredTeam;
    private String skills;
    private String previousExperience;
    private String portfolioUrl;
    private String motivation;
    private ApplicationStatus status;
    private LocalDateTime createdAt;

    public ApplicationResponse() {}

    public ApplicationResponse(Long id, String fullName, String rollNumber, String branch, String year, String section, String email, String phone, String preferredTeam, String skills, String previousExperience, String portfolioUrl, String motivation, ApplicationStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.branch = branch;
        this.year = year;
        this.section = section;
        this.email = email;
        this.phone = phone;
        this.preferredTeam = preferredTeam;
        this.skills = skills;
        this.previousExperience = previousExperience;
        this.portfolioUrl = portfolioUrl;
        this.motivation = motivation;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static ApplicationResponseBuilder builder() { return new ApplicationResponseBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPreferredTeam() { return preferredTeam; }
    public void setPreferredTeam(String preferredTeam) { this.preferredTeam = preferredTeam; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    public String getPreviousExperience() { return previousExperience; }
    public void setPreviousExperience(String previousExperience) { this.previousExperience = previousExperience; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public String getMotivation() { return motivation; }
    public void setMotivation(String motivation) { this.motivation = motivation; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class ApplicationResponseBuilder {
        private Long id;
        private String fullName;
        private String rollNumber;
        private String branch;
        private String year;
        private String section;
        private String email;
        private String phone;
        private String preferredTeam;
        private String skills;
        private String previousExperience;
        private String portfolioUrl;
        private String motivation;
        private ApplicationStatus status;
        private LocalDateTime createdAt;

        public ApplicationResponseBuilder id(Long id) { this.id = id; return this; }
        public ApplicationResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ApplicationResponseBuilder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public ApplicationResponseBuilder branch(String branch) { this.branch = branch; return this; }
        public ApplicationResponseBuilder year(String year) { this.year = year; return this; }
        public ApplicationResponseBuilder section(String section) { this.section = section; return this; }
        public ApplicationResponseBuilder email(String email) { this.email = email; return this; }
        public ApplicationResponseBuilder phone(String phone) { this.phone = phone; return this; }
        public ApplicationResponseBuilder preferredTeam(String preferredTeam) { this.preferredTeam = preferredTeam; return this; }
        public ApplicationResponseBuilder skills(String skills) { this.skills = skills; return this; }
        public ApplicationResponseBuilder previousExperience(String previousExperience) { this.previousExperience = previousExperience; return this; }
        public ApplicationResponseBuilder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public ApplicationResponseBuilder motivation(String motivation) { this.motivation = motivation; return this; }
        public ApplicationResponseBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public ApplicationResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ApplicationResponse build() {
            return new ApplicationResponse(id, fullName, rollNumber, branch, year, section, email, phone, preferredTeam, skills, previousExperience, portfolioUrl, motivation, status, createdAt);
        }
    }
}
