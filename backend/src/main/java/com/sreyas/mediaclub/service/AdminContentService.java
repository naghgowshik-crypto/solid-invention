package com.sreyas.mediaclub.service;

import com.sreyas.mediaclub.dto.*;
import com.sreyas.mediaclub.entity.*;
import com.sreyas.mediaclub.exception.ResourceNotFoundException;
import com.sreyas.mediaclub.repository.*;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class AdminContentService {

    private final EventRepository eventRepository;
    private final GalleryItemRepository galleryItemRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final StoryRepository storyRepository;
    private final AnnouncementRepository announcementRepository;
    private final FileUploadService fileUploadService;

    public AdminContentService(
            EventRepository eventRepository,
            GalleryItemRepository galleryItemRepository,
            TeamMemberRepository teamMemberRepository,
            StoryRepository storyRepository,
            AnnouncementRepository announcementRepository,
            FileUploadService fileUploadService) {
        this.eventRepository = eventRepository;
        this.galleryItemRepository = galleryItemRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.storyRepository = storyRepository;
        this.announcementRepository = announcementRepository;
        this.fileUploadService = fileUploadService;
    }


    // --- EVENTS CRUD ---
    @CacheEvict(value = "eventsCache", allEntries = true)
    public EventResponse createEvent(EventRequest request) {
        Event event = Event.builder()
                .title(request.getTitle())
                .subtitle(request.getSubtitle())
                .description(request.getDescription())
                .date(request.getDate())
                .time(request.getTime())
                .venue(request.getVenue())
                .category(request.getCategory())
                .posterUrl(request.getPosterUrl())
                .registrationUrl(request.getRegistrationUrl())
                .isUpcoming(request.isUpcoming())
                .registrationOpen(request.isRegistrationOpen())
                .agendaJson(request.getAgendaJson())
                .build();

        Event saved = eventRepository.save(event);
        return mapToEventResponse(saved);
    }

    @CacheEvict(value = "eventsCache", allEntries = true)
    public EventResponse updateEvent(Long id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        event.setTitle(request.getTitle());
        event.setSubtitle(request.getSubtitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setVenue(request.getVenue());
        event.setCategory(request.getCategory());
        event.setPosterUrl(request.getPosterUrl());
        event.setRegistrationUrl(request.getRegistrationUrl());
        event.setUpcoming(request.isUpcoming());
        event.setRegistrationOpen(request.isRegistrationOpen());
        if (request.getAgendaJson() != null) event.setAgendaJson(request.getAgendaJson());

        Event saved = eventRepository.save(event);
        return mapToEventResponse(saved);
    }

    @CacheEvict(value = "eventsCache", allEntries = true)
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        if (event.getPosterUrl() != null) {
            fileUploadService.deleteFile(event.getPosterUrl());
        }
        eventRepository.deleteById(id);
    }

    @CacheEvict(value = "eventsCache", allEntries = true)
    public EventResponse toggleEventUpcoming(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        event.setUpcoming(!event.isUpcoming());
        return mapToEventResponse(eventRepository.save(event));
    }

    // --- GALLERY CRUD ---
    @CacheEvict(value = "galleryCache", allEntries = true)
    public GalleryItemResponse createGalleryItem(GalleryItemRequest request) {
        GalleryItem item = GalleryItem.builder()
                .title(request.getTitle())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .photographer(request.getPhotographer())
                .dateStr(request.getDateStr())
                .camera(request.getCamera())
                .lens(request.getLens())
                .iso(request.getIso())
                .tags(request.getTags())
                .location(request.getLocation())
                .description(request.getDescription())
                .eventName(request.getEventName())
                .displayOrder(request.getDisplayOrder())
                .build();

        return mapToGalleryResponse(galleryItemRepository.save(item));
    }

    @CacheEvict(value = "galleryCache", allEntries = true)
    public GalleryItemResponse updateGalleryItem(Long id, GalleryItemRequest request) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));

        item.setTitle(request.getTitle());
        item.setCategory(request.getCategory());
        item.setImageUrl(request.getImageUrl());
        item.setPhotographer(request.getPhotographer());
        item.setDateStr(request.getDateStr());
        item.setCamera(request.getCamera());
        item.setLens(request.getLens());
        item.setIso(request.getIso());
        item.setTags(request.getTags());
        item.setLocation(request.getLocation());
        item.setDescription(request.getDescription());
        item.setEventName(request.getEventName());
        item.setDisplayOrder(request.getDisplayOrder());

        return mapToGalleryResponse(galleryItemRepository.save(item));
    }

    @CacheEvict(value = "galleryCache", allEntries = true)
    public void deleteGalleryItem(Long id) {
        GalleryItem item = galleryItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        if (item.getImageUrl() != null) {
            fileUploadService.deleteFile(item.getImageUrl());
        }
        galleryItemRepository.deleteById(id);
    }


    // --- TEAM MEMBERS CRUD ---
    @CacheEvict(value = "teamCache", allEntries = true)
    public TeamMemberResponse createTeamMember(TeamMemberRequest request) {
        TeamMember member = TeamMember.builder()
                .name(request.getName())
                .position(request.getPosition())
                .roleType(request.getRoleType())
                .team(request.getTeam())
                .bio(request.getBio())
                .branch(request.getBranch())
                .year(request.getYear())
                .avatarUrl(request.getAvatarUrl())
                .instagramUrl(request.getInstagramUrl())
                .linkedinUrl(request.getLinkedinUrl())
                .youtubeUrl(request.getYoutubeUrl())
                .portfolioUrl(request.getPortfolioUrl())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .build();

        return mapToTeamResponse(teamMemberRepository.save(member));
    }

    @CacheEvict(value = "teamCache", allEntries = true)
    public TeamMemberResponse updateTeamMember(Long id, TeamMemberRequest request) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found with id: " + id));

        member.setName(request.getName());
        member.setPosition(request.getPosition());
        member.setRoleType(request.getRoleType());
        member.setTeam(request.getTeam());
        member.setBio(request.getBio());
        member.setBranch(request.getBranch());
        member.setYear(request.getYear());
        member.setAvatarUrl(request.getAvatarUrl());
        member.setInstagramUrl(request.getInstagramUrl());
        member.setLinkedinUrl(request.getLinkedinUrl());
        member.setYoutubeUrl(request.getYoutubeUrl());
        member.setPortfolioUrl(request.getPortfolioUrl());
        member.setDisplayOrder(request.getDisplayOrder());
        member.setActive(request.isActive());

        return mapToTeamResponse(teamMemberRepository.save(member));
    }

    @CacheEvict(value = "teamCache", allEntries = true)
    public void deleteTeamMember(Long id) {
        if (!teamMemberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Team member not found with id: " + id);
        }
        teamMemberRepository.deleteById(id);
    }

    @CacheEvict(value = "teamCache", allEntries = true)
    public TeamMemberResponse toggleTeamActive(Long id) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found with id: " + id));
        member.setActive(!member.isActive());
        return mapToTeamResponse(teamMemberRepository.save(member));
    }

    // --- STORIES / ANNOUNCEMENTS CRUD ---
    @CacheEvict(value = "storyCache", allEntries = true)
    public StoryResponse createStory(StoryRequest request) {
        Story story = Story.builder()
                .title(request.getTitle())
                .slug(request.getSlug() != null ? request.getSlug() : generateSlug(request.getTitle()))
                .excerpt(request.getExcerpt())
                .content(request.getContent())
                .category(request.getCategory())
                .coverImageUrl(request.getCoverImageUrl())
                .authorName(request.getAuthorName())
                .authorRole(request.getAuthorRole())
                .authorAvatarUrl(request.getAuthorAvatarUrl())
                .readingTime(request.getReadingTime())
                .published(request.isPublished())
                .build();

        return mapToStoryResponse(storyRepository.save(story));
    }

    @CacheEvict(value = "storyCache", allEntries = true)
    public StoryResponse updateStory(Long id, StoryRequest request) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + id));

        story.setTitle(request.getTitle());

        if (request.getSlug() != null && !request.getSlug().trim().isEmpty()) {
            story.setSlug(request.getSlug());
        }
        story.setExcerpt(request.getExcerpt());
        story.setContent(request.getContent());
        story.setCategory(request.getCategory());
        story.setCoverImageUrl(request.getCoverImageUrl());
        story.setAuthorName(request.getAuthorName());
        story.setAuthorRole(request.getAuthorRole());
        story.setAuthorAvatarUrl(request.getAuthorAvatarUrl());
        story.setReadingTime(request.getReadingTime());
        story.setPublished(request.isPublished());

        return mapToStoryResponse(storyRepository.save(story));
    }

    @CacheEvict(value = "storyCache", allEntries = true)
    public void deleteStory(Long id) {
        if (!storyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Story not found with id: " + id);
        }
        storyRepository.deleteById(id);
    }

    @CacheEvict(value = "storyCache", allEntries = true)
    public StoryResponse toggleStoryPublish(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + id));
        story.setPublished(!story.isPublished());
        return mapToStoryResponse(storyRepository.save(story));
    }


    // --- ANNOUNCEMENTS CRUD ---
    public AnnouncementResponse createAnnouncement(AnnouncementRequest request) {
        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .dateStr(request.getDateStr())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .published(request.isPublished())
                .displayOrder(request.getDisplayOrder())
                .build();

        return mapToAnnouncementResponse(announcementRepository.save(announcement));
    }

    public AnnouncementResponse updateAnnouncement(Long id, AnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));

        announcement.setTitle(request.getTitle());
        announcement.setContent(request.getContent());
        announcement.setDateStr(request.getDateStr());
        announcement.setCategory(request.getCategory());
        announcement.setImageUrl(request.getImageUrl());
        announcement.setPublished(request.isPublished());
        announcement.setDisplayOrder(request.getDisplayOrder());

        return mapToAnnouncementResponse(announcementRepository.save(announcement));
    }

    public void deleteAnnouncement(Long id) {
        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Announcement not found with id: " + id);
        }
        announcementRepository.deleteById(id);
    }

    private String generateSlug(String title) {
        return title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }

    private EventResponse mapToEventResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .subtitle(event.getSubtitle())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .venue(event.getVenue())
                .category(event.getCategory())
                .posterUrl(event.getPosterUrl())
                .registrationUrl(event.getRegistrationUrl())
                .isUpcoming(event.isUpcoming())
                .registrationOpen(event.isRegistrationOpen())
                .agendaJson(event.getAgendaJson())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }

    private GalleryItemResponse mapToGalleryResponse(GalleryItem item) {
        return GalleryItemResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .category(item.getCategory())
                .imageUrl(item.getImageUrl())
                .photographer(item.getPhotographer())
                .dateStr(item.getDateStr())
                .likesCount(item.getLikesCount())
                .camera(item.getCamera())
                .lens(item.getLens())
                .iso(item.getIso())
                .tags(item.getTags())
                .location(item.getLocation())
                .description(item.getDescription())
                .eventName(item.getEventName())
                .displayOrder(item.getDisplayOrder())
                .createdAt(item.getCreatedAt())
                .build();
    }

    private TeamMemberResponse mapToTeamResponse(TeamMember member) {
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

    private StoryResponse mapToStoryResponse(Story story) {
        return StoryResponse.builder()
                .id(story.getId())
                .title(story.getTitle())
                .slug(story.getSlug())
                .excerpt(story.getExcerpt())
                .content(story.getContent())
                .category(story.getCategory())
                .coverImageUrl(story.getCoverImageUrl())
                .authorName(story.getAuthorName())
                .authorRole(story.getAuthorRole())
                .authorAvatarUrl(story.getAuthorAvatarUrl())
                .readingTime(story.getReadingTime())
                .published(story.isPublished())
                .publishedAt(story.getPublishedAt())
                .createdAt(story.getCreatedAt())
                .build();
    }

    private AnnouncementResponse mapToAnnouncementResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .content(announcement.getContent())
                .dateStr(announcement.getDateStr())
                .category(announcement.getCategory())
                .imageUrl(announcement.getImageUrl())
                .published(announcement.isPublished())
                .displayOrder(announcement.getDisplayOrder())
                .createdAt(announcement.getCreatedAt())
                .build();
    }
}
