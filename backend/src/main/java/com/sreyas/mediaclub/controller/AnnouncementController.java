package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.AnnouncementResponse;
import com.sreyas.mediaclub.entity.Announcement;
import com.sreyas.mediaclub.repository.AnnouncementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public ResponseEntity<List<AnnouncementResponse>> getPublishedAnnouncements() {
        List<Announcement> list = announcementRepository.findByPublishedTrueOrderByDisplayOrderAscCreatedAtDesc();
        List<AnnouncementResponse> dtos = list.stream().map(a -> AnnouncementResponse.builder()
                .id(a.getId())
                .title(a.getTitle())
                .content(a.getContent())
                .dateStr(a.getDateStr())
                .category(a.getCategory())
                .imageUrl(a.getImageUrl())
                .published(a.isPublished())
                .displayOrder(a.getDisplayOrder())
                .createdAt(a.getCreatedAt())
                .build()
        ).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
