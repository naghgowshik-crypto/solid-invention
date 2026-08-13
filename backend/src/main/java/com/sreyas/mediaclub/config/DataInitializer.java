package com.sreyas.mediaclub.config;

import com.sreyas.mediaclub.entity.*;
import com.sreyas.mediaclub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final GalleryItemRepository galleryItemRepository;
    private final VideoRepository videoRepository;
    private final StoryRepository storyRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(EventRepository eventRepository, GalleryItemRepository galleryItemRepository, VideoRepository videoRepository, StoryRepository storyRepository, TeamMemberRepository teamMemberRepository, AchievementRepository achievementRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.eventRepository = eventRepository;
        this.galleryItemRepository = galleryItemRepository;
        this.videoRepository = videoRepository;
        this.storyRepository = storyRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            if (userRepository.findByUsername("admin").isEmpty()) {
                seedDefaultAdminUser();
            }
            if (eventRepository.count() == 0) {
                seedEvents();
            }
            if (galleryItemRepository.count() == 0) {
                seedGallery();
            }
            if (videoRepository.count() == 0) {
                seedVideos();
            }
            if (storyRepository.count() == 0) {
                seedStories();
            }
            if (teamMemberRepository.count() == 0) {
                seedTeam();
            }
            if (achievementRepository.count() == 0) {
                seedAchievements();
            }
        } catch (Exception e) {
            System.err.println("DataInitializer warning during database seeding: " + e.getMessage());
        }
    }

    private void seedDefaultAdminUser() {
        User admin = User.builder()
                .username("admin")
                .email("admin@sreyas.ac.in")
                .passwordHash(passwordEncoder.encode("AdminPassword123!"))
                .role(Role.ADMIN)
                .active(true)
                .build();
        userRepository.save(admin);
        System.out.println(">>> DataInitializer: Default Admin user seeded successfully (username: admin, email: admin@sreyas.ac.in)");
    }

    private void seedEvents() {
        eventRepository.save(Event.builder()
                .title("FIRST FRAME")
                .subtitle("MEDIA CLUB LAUNCH EVENT")
                .description("The grand unveiling of Sreyas Institute of Engineering and Technology Media Club. Keynote talks by industry filmmakers, live photography exhibitions, short film premieres, and membership orientation.")
                .date("14 AUGUST 2026")
                .time("10:00 AM IST")
                .venue("MAIN AUDITORIUM")
                .category("Launch")
                .posterUrl("https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop")
                .registrationUrl("/join")
                .isUpcoming(true)
                .registrationOpen(true)
                .agendaJson("[\"10:00 AM — Inaugural Keynote\",\"10:45 AM — Premiere: One Club. Many Voices.\",\"11:30 AM — Interactive Workshop\",\"01:30 PM — Gallery Walkthrough\",\"03:00 PM — Live Recruitment Pitch\"]")
                .build());

        eventRepository.save(Event.builder()
                .title("FRAMES & SHADOWS")
                .subtitle("CAMPUS PHOTOGRAPHY WORKSHOP")
                .description("A hands-on masterclass covering manual exposure controls, natural light diffusion, portrait composition, and Adobe Lightroom workflow.")
                .date("25 MAY 2026")
                .time("02:00 PM IST")
                .venue("MEDIA LAB 204")
                .category("Workshop")
                .posterUrl("https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop")
                .isUpcoming(false)
                .registrationOpen(false)
                .build());

        eventRepository.save(Event.builder()
                .title("REEL RUSH 2026")
                .subtitle("60-SECOND REEL MAKING COMPETITION")
                .description("48 teams competed to shoot, edit, and score a compelling 60-second video reel centered around campus life within 12 hours.")
                .date("18 APRIL 2026")
                .time("09:00 AM IST")
                .venue("COLLEGE QUADRANGLE")
                .category("Competition")
                .posterUrl("https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop")
                .isUpcoming(false)
                .registrationOpen(false)
                .build());
    }

    private void seedGallery() {
        galleryItemRepository.save(GalleryItem.builder()
                .title("Silhouetted Motion at Dusk")
                .category("PHOTOGRAPHY")
                .imageUrl("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop")
                .photographer("Siddharth Rao")
                .dateStr("12 August 2026")
                .likesCount(142)
                .camera("Sony A7 IV")
                .lens("85mm f/1.4 GM")
                .iso("ISO 100")
                .tags("Sunset, Cinematic, Drones")
                .location("Sreyas Main Lawn")
                .build());

        galleryItemRepository.save(GalleryItem.builder()
                .title("Electric Stage Performances")
                .category("EVENTS")
                .imageUrl("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop")
                .photographer("K. Sreyas Vardhan")
                .dateStr("04 March 2026")
                .likesCount(289)
                .camera("Canon R6")
                .lens("70-200mm f/2.8L")
                .iso("ISO 1600")
                .tags("Fest, Concert, Lights")
                .location("Open Air Auditorium")
                .build());

        galleryItemRepository.save(GalleryItem.builder()
                .title("Architectural Shadows & Sunlight")
                .category("CAMPUS LIFE")
                .imageUrl("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop")
                .photographer("Vikramaditya Rao")
                .dateStr("28 July 2026")
                .likesCount(98)
                .camera("Fujifilm X-T4")
                .lens("23mm f/1.4")
                .iso("ISO 200")
                .tags("Architecture, Geometry")
                .location("Engineering Block A")
                .build());

        galleryItemRepository.save(GalleryItem.builder()
                .title("Behind the Lens: Director Focus")
                .category("BEHIND THE SCENES")
                .imageUrl("https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop")
                .photographer("Meera Nambiar")
                .dateStr("15 June 2026")
                .likesCount(215)
                .camera("Sony FX3")
                .lens("35mm f/1.8")
                .iso("ISO 800")
                .tags("Filmmaking, BTS")
                .location("Studio Room 102")
                .build());

        galleryItemRepository.save(GalleryItem.builder()
                .title("Student Expressions in Monochrome")
                .category("PORTRAITS")
                .imageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop")
                .photographer("Ananya Reddy")
                .dateStr("02 May 2026")
                .likesCount(176)
                .camera("Canon EOS R5")
                .lens("50mm f/1.2L")
                .iso("ISO 100")
                .tags("B&W, Studio")
                .location("Media Lab Studio")
                .build());
    }

    private void seedVideos() {
        videoRepository.save(Video.builder()
                .title("Sreyas Media Club Official Launch Teaser")
                .description("Experience the energy, passion, and creative fire behind the launch of Sreyas Media Club. One Club. Many Voices. Endless Stories.")
                .category("Event Highlights")
                .thumbnailUrl("https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop")
                .videoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
                .duration("02:45")
                .viewsCount(4820)
                .dateStr("10 August 2026")
                .featured(true)
                .build());

        videoRepository.save(Video.builder()
                .title("A Day in the Life of a Sreyas Student")
                .description("A cinematic reel tracking 24 hours across workshops, labs, cafeteria laughs, and sunset quadrangle moments.")
                .category("Reels")
                .thumbnailUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop")
                .videoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
                .duration("00:59")
                .viewsCount(12400)
                .dateStr("02 July 2026")
                .featured(true)
                .build());

        videoRepository.save(Video.builder()
                .title("Echoes of Tomorrow — Short Film")
                .description("An emotional narrative exploring student aspirations, friendships, and the leap into the unknown future.")
                .category("Short Films")
                .thumbnailUrl("https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop")
                .videoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
                .duration("14:20")
                .viewsCount(8900)
                .dateStr("15 May 2026")
                .featured(true)
                .build());
    }

    private void seedStories() {
        storyRepository.save(Story.builder()
                .title("Behind the Lens: A Day with the Capture Team")
                .slug("behind-the-lens-capture-team")
                .excerpt("Step behind the camera to discover how our photography crew prepares for live event coverage.")
                .content("When the sun dips below the horizon at Sreyas Institute of Engineering and Technology, casting warm golden light across the central quadrangle, most students head home. But for the Capture Team, the real work is just beginning.\n\n### The Anatomy of Live Event Coverage\nCovering an annual fest or guest keynote requires precision, speed, and sharp anticipation.")
                .category("Behind the Lens")
                .coverImageUrl("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop")
                .authorName("Ananya Reddy")
                .authorRole("Vice President & Editor")
                .authorAvatarUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop")
                .readingTime(4)
                .published(true)
                .publishedAt(LocalDateTime.now().minusDays(5))
                .build());

        storyRepository.save(Story.builder()
                .title("Moments That Made Our Campus Come Alive")
                .slug("moments-that-made-our-campus-come-alive")
                .excerpt("A retrospective look at the defining visual highlights of the past academic year.")
                .content("A college campus is a living organism, vibrating with energy, intellect, and emotion. Over the past 12 months, Sreyas Media Club documented over 20 major events.\n\n### Archiving Memories for Generations\nLong after degrees are awarded, these photographs remain.")
                .category("Campus Life")
                .coverImageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop")
                .authorName("Rahul Sharma")
                .authorRole("General Secretary")
                .authorAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop")
                .readingTime(5)
                .published(true)
                .publishedAt(LocalDateTime.now().minusDays(12))
                .build());
    }

    private void seedTeam() {
        teamMemberRepository.save(TeamMember.builder()
                .name("K. Sreyas Vardhan")
                .position("President")
                .roleType("CORE_EXECUTIVE")
                .team("Core Executive")
                .bio("Visionary creative leader overseeing strategic expansion, campus partnerships, and flagship media productions.")
                .branch("CSE (AI & ML)")
                .year("4th Year")
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop")
                .instagramUrl("https://instagram.com")
                .linkedinUrl("https://linkedin.com")
                .displayOrder(1)
                .active(true)
                .build());

        teamMemberRepository.save(TeamMember.builder()
                .name("Ananya Reddy")
                .position("Vice President")
                .roleType("CORE_EXECUTIVE")
                .team("Core Executive")
                .bio("Drives operational planning, cross-team synergy, and student engagement initiatives.")
                .branch("ECE")
                .year("4th Year")
                .avatarUrl("https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop")
                .instagramUrl("https://instagram.com")
                .linkedinUrl("https://linkedin.com")
                .displayOrder(2)
                .active(true)
                .build());

        teamMemberRepository.save(TeamMember.builder()
                .name("Rahul Sharma")
                .position("General Secretary")
                .roleType("CORE_EXECUTIVE")
                .team("Core Executive")
                .bio("Manages administrative workflows, official college communications, and member onboarding.")
                .branch("CSE")
                .year("3rd Year")
                .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop")
                .linkedinUrl("https://linkedin.com")
                .displayOrder(3)
                .active(true)
                .build());
    }

    private void seedAchievements() {
        achievementRepository.save(Achievement.builder()
                .title("Best Inter-College Short Film Award")
                .year("2026")
                .award("1st Place & Gold Trophy")
                .organizer("Telangana State Youth Film Festival")
                .description("Awarded for Echoes of Tomorrow, produced entirely by the Sreyas Film Team.")
                .imageUrl("https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=1200&auto=format&fit=crop")
                .highlightStat("1st Place")
                .category("Film")
                .build());

        achievementRepository.save(Achievement.builder()
                .title("Outstanding Institutional Media Coverage")
                .year("2026")
                .award("Excellence Award")
                .organizer("National Technical Education Forum")
                .description("Recognized for innovation in student-led institutional journalism.")
                .imageUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop")
                .highlightStat("Top Unit")
                .category("Media")
                .build());
    }
}
