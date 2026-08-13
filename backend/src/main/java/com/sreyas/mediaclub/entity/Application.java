package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications", indexes = {
    @Index(name = "idx_app_email", columnList = "email"),
    @Index(name = "idx_app_status", columnList = "status"),
    @Index(name = "idx_app_created", columnList = "created_at")
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 30)
    private String rollNumber;

    @Column(nullable = false, length = 50)
    private String branch;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String year;

    @Column(nullable = false, length = 10)
    private String section;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 50)
    private String preferredTeam;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String previousExperience;

    @Column(length = 500)
    private String portfolioUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String motivation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ApplicationStatus status = ApplicationStatus.NEW;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Application() {}

    public Application(Long id, String fullName, String rollNumber, String branch, String year, String section, String email, String phone, String preferredTeam, String skills, String previousExperience, String portfolioUrl, String motivation, ApplicationStatus status, LocalDateTime createdAt) {
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
        this.status = status != null ? status : ApplicationStatus.NEW;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static ApplicationBuilder builder() { return new ApplicationBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
        if (this.status == null) this.status = ApplicationStatus.NEW;
    }

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

    public static class ApplicationBuilder {
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
        private ApplicationStatus status = ApplicationStatus.NEW;
        private LocalDateTime createdAt;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ApplicationBuilder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public ApplicationBuilder branch(String branch) { this.branch = branch; return this; }
        public ApplicationBuilder year(String year) { this.year = year; return this; }
        public ApplicationBuilder section(String section) { this.section = section; return this; }
        public ApplicationBuilder email(String email) { this.email = email; return this; }
        public ApplicationBuilder phone(String phone) { this.phone = phone; return this; }
        public ApplicationBuilder preferredTeam(String preferredTeam) { this.preferredTeam = preferredTeam; return this; }
        public ApplicationBuilder skills(String skills) { this.skills = skills; return this; }
        public ApplicationBuilder previousExperience(String previousExperience) { this.previousExperience = previousExperience; return this; }
        public ApplicationBuilder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public ApplicationBuilder motivation(String motivation) { this.motivation = motivation; return this; }
        public ApplicationBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public ApplicationBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Application build() {
            return new Application(id, fullName, rollNumber, branch, year, section, email, phone, preferredTeam, skills, previousExperience, portfolioUrl, motivation, status, createdAt);
        }
    }
}
