package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.Achievement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    Page<Achievement> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
