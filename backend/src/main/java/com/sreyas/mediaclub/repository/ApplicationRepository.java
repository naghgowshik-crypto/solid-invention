package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.Application;
import com.sreyas.mediaclub.entity.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByEmailAndRollNumber(String email, String rollNumber);

    long countByStatus(ApplicationStatus status);

    @Query("SELECT a FROM Application a WHERE " +
           "(:search IS NULL OR :search = '' OR LOWER(a.fullName) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')) OR LOWER(a.email) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')) OR LOWER(a.rollNumber) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))) AND " +
           "(:preferredTeam IS NULL OR :preferredTeam = '' OR a.preferredTeam = :preferredTeam) AND " +
           "(:status IS NULL OR a.status = :status)")
    Page<Application> findFilteredApplications(
            @Param("search") String search,
            @Param("preferredTeam") String preferredTeam,
            @Param("status") ApplicationStatus status,
            Pageable pageable
    );
}
