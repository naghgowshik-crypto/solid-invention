package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.dto.StoryResponse;
import com.sreyas.mediaclub.service.StoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<StoryResponse>> getStories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(storyService.getPublishedStories(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryResponse> getStoryById(@PathVariable Long id) {
        return ResponseEntity.ok(storyService.getStoryById(id));
    }
}
