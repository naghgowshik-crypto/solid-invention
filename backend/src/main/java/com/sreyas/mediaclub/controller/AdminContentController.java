package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.*;
import com.sreyas.mediaclub.service.AdminContentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/content")
public class AdminContentController {

    private final AdminContentService adminContentService;

    public AdminContentController(AdminContentService adminContentService) {
        this.adminContentService = adminContentService;
    }

    // --- EVENTS ---
    @PostMapping("/events")
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminContentService.createEvent(request));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long id, @Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(adminContentService.updateEvent(id, request));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        adminContentService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/events/{id}/toggle-upcoming")
    public ResponseEntity<EventResponse> toggleEventUpcoming(@PathVariable Long id) {
        return ResponseEntity.ok(adminContentService.toggleEventUpcoming(id));
    }

    // --- GALLERY ---
    @PostMapping("/gallery")
    public ResponseEntity<GalleryItemResponse> createGalleryItem(@Valid @RequestBody GalleryItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminContentService.createGalleryItem(request));
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<GalleryItemResponse> updateGalleryItem(@PathVariable Long id, @Valid @RequestBody GalleryItemRequest request) {
        return ResponseEntity.ok(adminContentService.updateGalleryItem(id, request));
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable Long id) {
        adminContentService.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }

    // --- TEAM MEMBERS ---
    @PostMapping("/team")
    public ResponseEntity<TeamMemberResponse> createTeamMember(@Valid @RequestBody TeamMemberRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminContentService.createTeamMember(request));
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<TeamMemberResponse> updateTeamMember(@PathVariable Long id, @Valid @RequestBody TeamMemberRequest request) {
        return ResponseEntity.ok(adminContentService.updateTeamMember(id, request));
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long id) {
        adminContentService.deleteTeamMember(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/team/{id}/toggle-active")
    public ResponseEntity<TeamMemberResponse> toggleTeamActive(@PathVariable Long id) {
        return ResponseEntity.ok(adminContentService.toggleTeamActive(id));
    }

    // --- STORIES / ANNOUNCEMENTS ---
    @PostMapping("/stories")
    public ResponseEntity<StoryResponse> createStory(@Valid @RequestBody StoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminContentService.createStory(request));
    }

    @PutMapping("/stories/{id}")
    public ResponseEntity<StoryResponse> updateStory(@PathVariable Long id, @Valid @RequestBody StoryRequest request) {
        return ResponseEntity.ok(adminContentService.updateStory(id, request));
    }

    @DeleteMapping("/stories/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        adminContentService.deleteStory(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/stories/{id}/toggle-publish")
    public ResponseEntity<StoryResponse> toggleStoryPublish(@PathVariable Long id) {
        return ResponseEntity.ok(adminContentService.toggleStoryPublish(id));
    }

    // --- ANNOUNCEMENTS ---
    @PostMapping("/announcements")
    public ResponseEntity<AnnouncementResponse> createAnnouncement(@Valid @RequestBody AnnouncementRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminContentService.createAnnouncement(request));
    }

    @PutMapping("/announcements/{id}")
    public ResponseEntity<AnnouncementResponse> updateAnnouncement(@PathVariable Long id, @Valid @RequestBody AnnouncementRequest request) {
        return ResponseEntity.ok(adminContentService.updateAnnouncement(id, request));
    }

    @DeleteMapping("/announcements/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        adminContentService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }
}
