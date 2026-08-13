package com.sreyas.mediaclub.repository;

import com.sreyas.mediaclub.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findByActiveTrueOrderByDisplayOrderAsc();
    List<TeamMember> findByActiveTrueAndTeamIgnoreCaseOrderByDisplayOrderAsc(String team);
}
