package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.GalleryItemResponse;
import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<GalleryItemResponse>> getGalleryItems(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(galleryService.getGalleryItems(category, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryItemResponse> getGalleryItemById(@PathVariable Long id) {
        return ResponseEntity.ok(galleryService.getGalleryItemById(id));
    }
}
