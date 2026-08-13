package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ApplicationRequest {

    @NotBlank(message = "Full Name is required")
    @Size(max = 100, message = "Full Name cannot exceed 100 characters")
    private String fullName;

    @NotBlank(message = "Roll Number is required")
    @Size(max = 30, message = "Roll Number cannot exceed 30 characters")
    private String rollNumber;

    @NotBlank(message = "Branch is required")
    @Size(max = 50, message = "Branch cannot exceed 50 characters")
    private String branch;

    @NotBlank(message = "Year is required")
    @Size(max = 20, message = "Year cannot exceed 20 characters")
    private String year;

    @NotBlank(message = "Section is required")
    @Size(max = 10, message = "Section cannot exceed 10 characters")
    private String section;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 120, message = "Email cannot exceed 120 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be a valid 10-digit number")
    private String phone;

    @NotBlank(message = "Preferred team is required")
    @Size(max = 50, message = "Preferred team cannot exceed 50 characters")
    private String preferredTeam;

    private String skills;
    private String previousExperience;
    private String portfolioUrl;

    @NotBlank(message = "Motivation statement is required")
    @Size(min = 10, max = 2000, message = "Motivation statement must be between 10 and 2000 characters")
    private String motivation;

    public ApplicationRequest() {}

    public ApplicationRequest(String fullName, String rollNumber, String branch, String year, String section, String email, String phone, String preferredTeam, String skills, String previousExperience, String portfolioUrl, String motivation) {
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
    }

    public static ApplicationRequestBuilder builder() { return new ApplicationRequestBuilder(); }

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

    public static class ApplicationRequestBuilder {
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

        public ApplicationRequestBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ApplicationRequestBuilder rollNumber(String rollNumber) { this.rollNumber = rollNumber; return this; }
        public ApplicationRequestBuilder branch(String branch) { this.branch = branch; return this; }
        public ApplicationRequestBuilder year(String year) { this.year = year; return this; }
        public ApplicationRequestBuilder section(String section) { this.section = section; return this; }
        public ApplicationRequestBuilder email(String email) { this.email = email; return this; }
        public ApplicationRequestBuilder phone(String phone) { this.phone = phone; return this; }
        public ApplicationRequestBuilder preferredTeam(String preferredTeam) { this.preferredTeam = preferredTeam; return this; }
        public ApplicationRequestBuilder skills(String skills) { this.skills = skills; return this; }
        public ApplicationRequestBuilder previousExperience(String previousExperience) { this.previousExperience = previousExperience; return this; }
        public ApplicationRequestBuilder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public ApplicationRequestBuilder motivation(String motivation) { this.motivation = motivation; return this; }

        public ApplicationRequest build() {
            return new ApplicationRequest(fullName, rollNumber, branch, year, section, email, phone, preferredTeam, skills, previousExperience, portfolioUrl, motivation);
        }
    }
}
