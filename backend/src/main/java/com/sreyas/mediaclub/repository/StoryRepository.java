package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    Page<Story> findByPublishedTrueOrderByPublishedAtDesc(Pageable pageable);
    Optional<Story> findBySlugAndPublishedTrue(String slug);
}
