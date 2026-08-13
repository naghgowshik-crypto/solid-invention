package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.TeamMemberResponse;
import com.sreyas.mediaclub.entity.TeamMember;
import com.sreyas.mediaclub.repository.TeamMemberRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class TeamService {

    private final TeamMemberRepository teamMemberRepository;

    public TeamService(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    @Cacheable(value = "teamCache", key = "#team != null ? #team : 'ALL'")
    public List<TeamMemberResponse> getActiveTeamMembers(String team) {

        List<TeamMember> members;
        if (team != null && !team.trim().isEmpty() && !"ALL".equalsIgnoreCase(team)) {
            members = teamMemberRepository.findByActiveTrueAndTeamIgnoreCaseOrderByDisplayOrderAsc(team.trim());
        } else {
            members = teamMemberRepository.findByActiveTrueOrderByDisplayOrderAsc();
        }

        return members.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private TeamMemberResponse mapToResponse(TeamMember member) {
        return TeamMemberResponse.builder()
                .id(member.getId())
                .name(member.getName())
                .position(member.getPosition())
                .roleType(member.getRoleType())
                .team(member.getTeam())
                .bio(member.getBio())
                .branch(member.getBranch())
                .year(member.getYear())
                .avatarUrl(member.getAvatarUrl())
                .instagramUrl(member.getInstagramUrl())
                .linkedinUrl(member.getLinkedinUrl())
                .youtubeUrl(member.getYoutubeUrl())
                .portfolioUrl(member.getPortfolioUrl())
                .displayOrder(member.getDisplayOrder())
                .active(member.isActive())
                .createdAt(member.getCreatedAt())
                .build();
    }
}
