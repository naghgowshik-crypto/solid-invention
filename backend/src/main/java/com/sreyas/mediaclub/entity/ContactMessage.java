package com.sreyas.mediaclub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages", indexes = {
    @Index(name = "idx_contact_email", columnList = "email"),
    @Index(name = "idx_contact_created", columnList = "created_at")
})
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 200)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ContactMessage() {}

    public ContactMessage(Long id, String name, String email, String subject, String message, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static ContactMessageBuilder builder() { return new ContactMessageBuilder(); }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }

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

    public static class ContactMessageBuilder {
        private Long id;
        private String name;
        private String email;
        private String subject;
        private String message;
        private LocalDateTime createdAt;

        public ContactMessageBuilder id(Long id) { this.id = id; return this; }
        public ContactMessageBuilder name(String name) { this.name = name; return this; }
        public ContactMessageBuilder email(String email) { this.email = email; return this; }
        public ContactMessageBuilder subject(String subject) { this.subject = subject; return this; }
        public ContactMessageBuilder message(String message) { this.message = message; return this; }
        public ContactMessageBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactMessage build() {
            return new ContactMessage(id, name, email, subject, message, createdAt);
        }
    }
}
