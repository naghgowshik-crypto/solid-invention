package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.dto.VideoResponse;
import com.sreyas.mediaclub.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<VideoResponse>> getVideos(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(videoService.getVideos(category, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }
}
