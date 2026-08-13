package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.*;
import com.sreyas.mediaclub.entity.ApplicationStatus;
import com.sreyas.mediaclub.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/applications")
    public ResponseEntity<PaginatedResponse<ApplicationResponse>> getApplications(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String preferredTeam,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        PaginatedResponse<ApplicationResponse> response = adminService.getApplications(search, preferredTeam, status, page, size, sortDir);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<ApplicationResponse> getApplicationById(@PathVariable Long id) {
        ApplicationResponse response = adminService.getApplicationById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        
        ApplicationResponse response = adminService.updateApplicationStatus(id, request.getStatus());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contact-messages")
    public ResponseEntity<PaginatedResponse<ContactMessageResponse>> getContactMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PaginatedResponse<ContactMessageResponse> response = adminService.getContactMessages(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contact-messages/{id}")
    public ResponseEntity<ContactMessageResponse> getContactMessageById(@PathVariable Long id) {
        ContactMessageResponse response = adminService.getContactMessageById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getDashboardStats() {
        AdminStatsResponse response = adminService.getDashboardStats();
        return ResponseEntity.ok(response);
    }
}
