package com.sreyas.mediaclub.dto;

import java.time.LocalDateTime;

public class ContactMessageResponse {
    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime createdAt;

    public ContactMessageResponse() {}

    public ContactMessageResponse(Long id, String name, String email, String subject, String message, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
    }

    public static ContactMessageResponseBuilder builder() { return new ContactMessageResponseBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class ContactMessageResponseBuilder {
        private Long id;
        private String name;
        private String email;
        private String subject;
        private String message;
        private LocalDateTime createdAt;

        public ContactMessageResponseBuilder id(Long id) { this.id = id; return this; }
        public ContactMessageResponseBuilder name(String name) { this.name = name; return this; }
        public ContactMessageResponseBuilder email(String email) { this.email = email; return this; }
        public ContactMessageResponseBuilder subject(String subject) { this.subject = subject; return this; }
        public ContactMessageResponseBuilder message(String message) { this.message = message; return this; }
        public ContactMessageResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactMessageResponse build() {
            return new ContactMessageResponse(id, name, email, subject, message, createdAt);
        }
    }
}
