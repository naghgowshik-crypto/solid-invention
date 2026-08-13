package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.ApplicationRequest;
import com.sreyas.mediaclub.dto.ApplicationResponse;
import com.sreyas.mediaclub.entity.Application;
import com.sreyas.mediaclub.entity.ApplicationStatus;
import com.sreyas.mediaclub.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public ApplicationResponse submitApplication(ApplicationRequest request) {
        Application application = Application.builder()
                .fullName(request.getFullName().trim())
                .rollNumber(request.getRollNumber().trim())
                .branch(request.getBranch().trim())
                .year(request.getYear().trim())
                .section(request.getSection().trim())
                .email(request.getEmail().trim())
                .phone(request.getPhone().trim())
                .preferredTeam(request.getPreferredTeam().trim())
                .skills(request.getSkills())
                .previousExperience(request.getPreviousExperience())
                .portfolioUrl(request.getPortfolioUrl())
                .motivation(request.getMotivation().trim())
                .status(ApplicationStatus.NEW)
                .build();

        Application saved = applicationRepository.save(application);

        return ApplicationResponse.builder()
                .id(saved.getId())
                .fullName(saved.getFullName())
                .rollNumber(saved.getRollNumber())
                .branch(saved.getBranch())
                .year(saved.getYear())
                .section(saved.getSection())
                .email(saved.getEmail())
                .phone(saved.getPhone())
                .preferredTeam(saved.getPreferredTeam())
                .skills(saved.getSkills())
                .previousExperience(saved.getPreviousExperience())
                .portfolioUrl(saved.getPortfolioUrl())
                .motivation(saved.getMotivation())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
