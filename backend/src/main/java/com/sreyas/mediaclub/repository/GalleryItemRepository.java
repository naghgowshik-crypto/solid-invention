package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.GalleryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {
    Page<GalleryItem> findByCategoryIgnoreCase(String category, Pageable pageable);
}
