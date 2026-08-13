package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.GalleryItemResponse;
import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.entity.GalleryItem;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.GalleryItemRepository;
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
public class GalleryService {

    private final GalleryItemRepository galleryItemRepository;

    public GalleryService(GalleryItemRepository galleryItemRepository) {
        this.galleryItemRepository = galleryItemRepository;
    }

    @Cacheable(value = "galleryCache", key = "(#category != null ? #category : 'ALL') + '-' + #page + '-' + #size")
    public PaginatedResponse<GalleryItemResponse> getGalleryItems(String category, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<GalleryItem> galleryPage;

        if (category != null && !category.trim().isEmpty() && !"ALL".equalsIgnoreCase(category)) {
            galleryPage = galleryItemRepository.findByCategoryIgnoreCase(category.trim(), pageable);
        } else {
            galleryPage = galleryItemRepository.findAll(pageable);
        }

        return PaginatedResponse.<GalleryItemResponse>builder()
                .content(galleryPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()))
                .pageNumber(galleryPage.getNumber())
                .pageSize(galleryPage.getSize())
                .totalElements(galleryPage.getTotalElements())
                .totalPages(galleryPage.getTotalPages())
                .last(galleryPage.isLast())
                .build();
    }

    public GalleryItemResponse getGalleryItemById(Long id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with ID: " + id));
        return mapToResponse(item);
    }

    private GalleryItemResponse mapToResponse(GalleryItem item) {
        return GalleryItemResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .category(item.getCategory())
                .photographer(item.getPhotographer())
                .eventName(item.getEventName())
                .dateStr(item.getDateStr())
                .likesCount(item.getLikesCount())
                .camera(item.getCamera())
                .lens(item.getLens())
                .iso(item.getIso())
                .tags(item.getTags())
                .location(item.getLocation())
                .createdAt(item.getCreatedAt())
                .build();
    }
}
