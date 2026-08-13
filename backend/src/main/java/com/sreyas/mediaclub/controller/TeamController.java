package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.TeamMemberResponse;
import com.sreyas.mediaclub.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<List<TeamMemberResponse>> getTeamMembers(@RequestParam(required = false) String team) {
        return ResponseEntity.ok(teamService.getActiveTeamMembers(team));
    }
}
