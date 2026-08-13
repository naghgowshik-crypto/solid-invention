import { AchievementItem } from '../types/models';

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Best Inter-College Short Film Award',
    year: '2026',
    award: '1st Place & Gold Trophy',
    organizer: 'Telangana State Youth Film Festival',
    description: 'Awarded for "Echoes of Tomorrow", produced entirely by the Sreyas Film Team, praised for outstanding cinematography and narrative depth.',
    imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=1200&auto=format&fit=crop',
    highlightStat: '1st Place'
  },
  {
    id: 'ach-2',
    title: 'Outstanding Institutional Media Coverage',
    year: '2026',
    award: 'Excellence Award',
    organizer: 'National Technical Education Forum',
    description: 'Recognized for innovation in student-led institutional journalism, live video broadcasts, and social media storytelling impact.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    highlightStat: 'Top Media Unit'
  },
  {
    id: 'ach-3',
    title: 'Best Cinematic Reel After-Movie',
    year: '2025',
    award: 'Winner — Editing Category',
    organizer: 'Hyderabad Student Media Conclave',
    description: 'Honored for seamless beat-matched editing, color grading, and dynamic FPV drone choreography in the Annual Cultural Fest Teaser.',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    highlightStat: '100K+ Views'
  }
];

export const MILESTONES = [
  { year: '2025 (Q3)', title: 'Ideation & Founding', desc: 'Conceived by 4 student visionaries to unify photography, video, and journalism.' },
  { year: '2025 (Q4)', title: '4 Creative Divisions Established', desc: 'Formed Capture, Shoot, Ambassadors, and Film teams with defined leadership.' },
  { year: '2026 (Q1)', title: 'First Media Studio Setup', desc: 'Equipped dedicated editing suite, camera equipment vault, and recording room.' },
  { year: '2026 (Q2)', title: '100+ Stories Milestone', desc: 'Surpassed 100 featured campus stories, event after-movies, and photo essays.' },
  { year: '2026 (Q3)', title: 'FIRST FRAME Official Launch', desc: 'Launch of Sreyas Media Club web platform, student recruitment, and festival screening.' }
];
