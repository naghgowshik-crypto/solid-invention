package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.EventResponse;
import com.sreyas.mediaclub.entity.Event;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.EventRepository;
import com.sreyas.mediaclub.dto.PaginatedResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Cacheable(value = "eventsCache", key = "'all'")
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "eventsCache", key = "(#upcoming != null ? #upcoming.toString() : 'all') + '-' + #page + '-' + #size")
    public PaginatedResponse<EventResponse> getPaginatedEvents(Boolean upcoming, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Event> eventPage;
        if (upcoming != null) {
            eventPage = eventRepository.findByIsUpcoming(upcoming, pageable);
        } else {
            eventPage = eventRepository.findAll(pageable);
        }

        List<EventResponse> content = eventPage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return PaginatedResponse.<EventResponse>builder()
                .content(content)
                .pageNumber(eventPage.getNumber())
                .pageSize(eventPage.getSize())
                .totalElements(eventPage.getTotalElements())
                .totalPages(eventPage.getTotalPages())
                .last(eventPage.isLast())
                .build();
    }


    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + id));
        return mapToResponse(event);
    }


    private EventResponse mapToResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .subtitle(event.getSubtitle())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .venue(event.getVenue())
                .posterUrl(event.getPosterUrl())
                .registrationUrl(event.getRegistrationUrl())
                .category(event.getCategory())
                .isUpcoming(event.isUpcoming())
                .registrationOpen(event.isRegistrationOpen())
                .agendaJson(event.getAgendaJson())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}
