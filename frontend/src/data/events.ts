import { EventItem } from '../types/models';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-first-frame',
    title: 'FIRST FRAME',
    subtitle: 'MEDIA CLUB LAUNCH EVENT',
    date: '14 AUGUST 2026',
    time: '10:00 AM IST',
    venue: 'MAIN AUDITORIUM',
    category: 'Launch',
    description: 'The grand unveiling of Sreyas Institute of Engineering and Technology Media Club. Join us for keynote talks by industry filmmakers, live photography exhibitions, short film premieres, and membership orientation.',
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    isUpcoming: true,
    registrationOpen: true,
    registrationUrl: '/join',
    agenda: [
      '10:00 AM — Inaugural Keynote & Lighting of the Lamp',
      '10:45 AM — Premiere: "One Club. Many Voices."',
      '11:30 AM — Interactive Workshop: Cinematic Storytelling 101',
      '01:30 PM — Photography & Visual Art Gallery Walkthrough',
      '03:00 PM — Live Recruitment Pitch & Team Q&A'
    ]
  },
  {
    id: 'evt-2',
    title: 'FRAMES & SHADOWS',
    subtitle: 'CAMPUS PHOTOGRAPHY WORKSHOP',
    date: '25 MAY 2026',
    time: '02:00 PM IST',
    venue: 'MEDIA LAB 204',
    category: 'Workshop',
    description: 'A hands-on masterclass covering manual exposure controls, natural light diffusion, portrait composition, and Adobe Lightroom workflow.',
    posterUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop',
    isUpcoming: false,
    registrationOpen: false
  },
  {
    id: 'evt-3',
    title: 'REEL RUSH 2026',
    subtitle: '60-SECOND REEL MAKING COMPETITION',
    date: '18 APRIL 2026',
    time: '09:00 AM IST',
    venue: 'COLLEGE QUADRANGLE',
    category: 'Competition',
    description: '48 teams competed to shoot, edit, and score a compelling 60-second video reel centered around campus life within 12 hours.',
    posterUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    isUpcoming: false,
    registrationOpen: false
  },
  {
    id: 'evt-4',
    title: 'CINEMA SPECTRUM',
    subtitle: 'SHORT FILM SCREENING & PANEL',
    date: '12 MARCH 2026',
    time: '04:00 PM IST',
    venue: 'MINI AUDITORIUM',
    category: 'Screening',
    description: 'Showcasing original short films directed and produced by Sreyas students, followed by a Q&A session with regional indie directors.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    isUpcoming: false,
    registrationOpen: false
  }
];
