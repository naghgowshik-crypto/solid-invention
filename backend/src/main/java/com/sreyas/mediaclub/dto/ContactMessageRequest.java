package com.sreyas.mediaclub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactMessageRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 120, message = "Email cannot exceed 120 characters")
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(max = 200, message = "Subject cannot exceed 200 characters")
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(min = 5, max = 2000, message = "Message must be between 5 and 2000 characters")
    private String message;

    public ContactMessageRequest() {}

    public ContactMessageRequest(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public static ContactMessageRequestBuilder builder() { return new ContactMessageRequestBuilder(); }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public static class ContactMessageRequestBuilder {
        private String name;
        private String email;
        private String subject;
        private String message;

        public ContactMessageRequestBuilder name(String name) { this.name = name; return this; }
        public ContactMessageRequestBuilder email(String email) { this.email = email; return this; }
        public ContactMessageRequestBuilder subject(String subject) { this.subject = subject; return this; }
        public ContactMessageRequestBuilder message(String message) { this.message = message; return this; }

        public ContactMessageRequest build() {
            return new ContactMessageRequest(name, email, subject, message);
        }
    }
}
