package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.dto.VideoResponse;
import com.sreyas.mediaclub.entity.Video;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.VideoRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Cacheable(value = "videoCache", key = "(#category != null ? #category : 'ALL') + '-' + #page + '-' + #size")
    public PaginatedResponse<VideoResponse> getVideos(String category, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Video> videoPage;

        if (category != null && !category.trim().isEmpty() && !"ALL".equalsIgnoreCase(category)) {
            videoPage = videoRepository.findByCategoryIgnoreCase(category.trim(), pageable);
        } else {
            videoPage = videoRepository.findAll(pageable);
        }

        return PaginatedResponse.<VideoResponse>builder()
                .content(videoPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()))
                .pageNumber(videoPage.getNumber())
                .pageSize(videoPage.getSize())
                .totalElements(videoPage.getTotalElements())
                .totalPages(videoPage.getTotalPages())
                .last(videoPage.isLast())
                .build();
    }

    public VideoResponse getVideoById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found with ID: " + id));
        return mapToResponse(video);
    }

    private VideoResponse mapToResponse(Video video) {
        return VideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .description(video.getDescription())
                .thumbnailUrl(video.getThumbnailUrl())
                .videoUrl(video.getVideoUrl())
                .category(video.getCategory())
                .duration(video.getDuration())
                .viewsCount(video.getViewsCount())
                .dateStr(video.getDateStr())
                .featured(video.isFeatured())
                .createdAt(video.getCreatedAt())
                .build();
    }
}
