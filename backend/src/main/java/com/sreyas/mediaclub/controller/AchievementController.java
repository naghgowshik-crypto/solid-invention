package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.AchievementResponse;
import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<AchievementResponse>> getAchievements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(achievementService.getAchievements(page, size));
    }
}
