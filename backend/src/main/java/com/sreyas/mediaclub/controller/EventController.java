package com.sreyas.mediaclub.controller;

import com.sreyas.mediaclub.dto.PaginatedResponse;
import com.sreyas.mediaclub.dto.EventResponse;
import com.sreyas.mediaclub.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/page")
    public ResponseEntity<PaginatedResponse<EventResponse>> getPaginatedEvents(
            @RequestParam(required = false) Boolean upcoming,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(eventService.getPaginatedEvents(upcoming, page, size));
    }


    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
}
