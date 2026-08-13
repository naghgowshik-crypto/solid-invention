package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.dto.StoryResponse;
import com.sreyas.mediaclub.entity.Story;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.StoryRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class StoryService {

    private final StoryRepository storyRepository;

    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @Cacheable(value = "storyCache", key = "#page + '-' + #size")
    public PaginatedResponse<StoryResponse> getPublishedStories(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Story> storyPage = storyRepository.findByPublishedTrueOrderByPublishedAtDesc(pageable);

        return PaginatedResponse.<StoryResponse>builder()
                .content(storyPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()))
                .pageNumber(storyPage.getNumber())
                .pageSize(storyPage.getSize())
                .totalElements(storyPage.getTotalElements())
                .totalPages(storyPage.getTotalPages())
                .last(storyPage.isLast())
                .build();
    }

    public StoryResponse getStoryById(Long id) {
        Story story = storyRepository.findById(id)
                .filter(Story::isPublished)
                .orElseThrow(() -> new ResourceNotFoundException("Published story not found with ID: " + id));
        return mapToResponse(story);
    }

    private StoryResponse mapToResponse(Story story) {
        return StoryResponse.builder()
                .id(story.getId())
                .title(story.getTitle())
                .slug(story.getSlug())
                .excerpt(story.getExcerpt())
                .content(story.getContent())
                .coverImageUrl(story.getCoverImageUrl())
                .authorName(story.getAuthorName())
                .authorRole(story.getAuthorRole())
                .authorAvatarUrl(story.getAuthorAvatarUrl())
                .category(story.getCategory())
                .readingTime(story.getReadingTime())
                .published(story.isPublished())
                .publishedAt(story.getPublishedAt())
                .createdAt(story.getCreatedAt())
                .build();
    }
}
