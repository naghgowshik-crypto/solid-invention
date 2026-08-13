package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByPublishedTrueOrderByDisplayOrderAscCreatedAtDesc();
    Page<Announcement> findByPublishedTrue(Pageable pageable);
}
