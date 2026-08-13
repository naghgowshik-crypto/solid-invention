package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.AchievementResponse;
import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.entity.Achievement;
import com.sreyas.mediaclub.repository.AchievementRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public PaginatedResponse<AchievementResponse> getAchievements(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Achievement> achievementPage = achievementRepository.findAllByOrderByCreatedAtDesc(pageable);

        return PaginatedResponse.<AchievementResponse>builder()
                .content(achievementPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()))
                .pageNumber(achievementPage.getNumber())
                .pageSize(achievementPage.getSize())
                .totalElements(achievementPage.getTotalElements())
                .totalPages(achievementPage.getTotalPages())
                .last(achievementPage.isLast())
                .build();
    }

    private AchievementResponse mapToResponse(Achievement achievement) {
        return AchievementResponse.builder()
                .id(achievement.getId())
                .title(achievement.getTitle())
                .description(achievement.getDescription())
                .year(achievement.getYear())
                .award(achievement.getAward())
                .organizer(achievement.getOrganizer())
                .imageUrl(achievement.getImageUrl())
                .highlightStat(achievement.getHighlightStat())
                .category(achievement.getCategory())
                .createdAt(achievement.getCreatedAt())
                .build();
    }
}
