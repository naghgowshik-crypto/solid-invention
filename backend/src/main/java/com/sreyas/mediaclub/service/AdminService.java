package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.*;
import com.sreyas.mediaclub.entity.Application;
import com.sreyas.mediaclub.entity.ApplicationStatus;
import com.sreyas.mediaclub.entity.ContactMessage;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.ApplicationRepository;
import com.sreyas.mediaclub.repository.ContactMessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AdminService {

    private final ApplicationRepository applicationRepository;
    private final ContactMessageRepository contactMessageRepository;

    public AdminService(ApplicationRepository applicationRepository, ContactMessageRepository contactMessageRepository) {
        this.applicationRepository = applicationRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public PaginatedResponse<ApplicationResponse> getApplications(
            String search, String preferredTeam, ApplicationStatus status, int page, int size, String sortDir) {
        
        Sort sort = "asc".equalsIgnoreCase(sortDir) ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        String searchParam = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String teamParam = (preferredTeam != null && !preferredTeam.trim().isEmpty()) ? preferredTeam.trim() : null;

        Page<Application> pageResult = applicationRepository.findFilteredApplications(searchParam, teamParam, status, pageable);

        Page<ApplicationResponse> dtoPage = pageResult.map(this::mapToApplicationResponse);
        return PaginatedResponse.fromPage(dtoPage);
    }

    public ApplicationResponse getApplicationById(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return mapToApplicationResponse(application);
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long id, ApplicationStatus newStatus) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        application.setStatus(newStatus);
        Application updated = applicationRepository.save(application);
        return mapToApplicationResponse(updated);
    }

    public PaginatedResponse<ContactMessageResponse> getContactMessages(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<ContactMessage> pageResult = contactMessageRepository.findAll(pageable);
        Page<ContactMessageResponse> dtoPage = pageResult.map(this::mapToContactMessageResponse);
        return PaginatedResponse.fromPage(dtoPage);
    }

    public ContactMessageResponse getContactMessageById(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        return mapToContactMessageResponse(message);
    }

    public AdminStatsResponse getDashboardStats() {
        long totalApps = applicationRepository.count();
        long newApps = applicationRepository.countByStatus(ApplicationStatus.NEW);
        long reviewingApps = applicationRepository.countByStatus(ApplicationStatus.REVIEWING);
        long shortlistedApps = applicationRepository.countByStatus(ApplicationStatus.SHORTLISTED);
        long selectedApps = applicationRepository.countByStatus(ApplicationStatus.SELECTED);
        long rejectedApps = applicationRepository.countByStatus(ApplicationStatus.REJECTED);
        long totalMessages = contactMessageRepository.count();

        return new AdminStatsResponse(totalApps, newApps, reviewingApps, shortlistedApps, selectedApps, rejectedApps, totalMessages);
    }

    private ApplicationResponse mapToApplicationResponse(Application application) {
        return ApplicationResponse.builder()
                .id(application.getId())
                .fullName(application.getFullName())
                .rollNumber(application.getRollNumber())
                .branch(application.getBranch())
                .year(application.getYear())
                .section(application.getSection())
                .email(application.getEmail())
                .phone(application.getPhone())
                .preferredTeam(application.getPreferredTeam())
                .skills(application.getSkills())
                .previousExperience(application.getPreviousExperience())
                .portfolioUrl(application.getPortfolioUrl())
                .motivation(application.getMotivation())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .build();
    }

    private ContactMessageResponse mapToContactMessageResponse(ContactMessage message) {
        return ContactMessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
