import { CreativeTeamInfo } from '../types/models';

export const CREATIVE_TEAMS: CreativeTeamInfo[] = [
  {
    id: 'capture-team',
    name: 'CAPTURE TEAM',
    subtitle: 'PHOTOGRAPHY',
    category: 'Photography',
    description: 'Captures moments that tell stories and preserve memories.',
    longDescription: 'The Capture Team is the visual foundation of Sreyas Media Club. Equipped with professional cameras, prime lenses, and an artistic eye, our photographers freeze high-octane event moments, intimate candid emotion, campus portraits, and architectural beauty.',
    iconName: 'Camera',
    heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    activities: [
      'Event Photo Coverage & Live Broadcast Stills',
      'Portrait Photography & Member Headshots',
      'Campus Life & Architectural Photo Essays',
      'Color Grading & Professional Post-Processing'
    ],
    toolsUsed: ['Sony A7IV / Canon R6', 'Adobe Lightroom Classic', 'Adobe Photoshop', 'Capture One']
  },
  {
    id: 'shoot-team',
    name: 'SHOOT TEAM',
    subtitle: 'VIDEOGRAPHY & REELS',
    category: 'Videography',
    description: 'Brings ideas to life through videos, reels and dynamic visual storytelling.',
    longDescription: 'The Shoot Team creates motion imagery that captivates audiences. From high-energy Instagram Reels and after-movie event teasers to drone cinematic aerial shots and promotional commercials, we turn raw footage into compelling visual experiences.',
    iconName: 'Video',
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    activities: [
      'High-Energy Event Teasers & After-Movies',
      'Trending Instagram Reels & Social Content',
      'Cinematic Gimbal & Stabilized Camera Moves',
      'Dynamic Editing, Sound Design & Motion VFX'
    ],
    toolsUsed: ['DJI Ronin / Gimbals', 'Adobe Premiere Pro', 'DaVinci Resolve Studio', 'After Effects']
  },
  {
    id: 'ambassadors-team',
    name: 'AMBASSADORS TEAM',
    subtitle: 'HOSTING, ANCHORING & INTERVIEWS',
    category: 'Hosting, Anchoring & Interviews',
    description: 'Represents the club, engages with people and brings stories closer to everyone.',
    longDescription: 'The Ambassadors Team is the voice and personality of Sreyas Media Club. Our anchors, interviewers, and public relations representatives connect with students, faculty, dignitaries, and guest speakers, bringing human stories to the spotlight.',
    iconName: 'Mic',
    heroImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    activities: [
      'Campus Vox-Pop Interviews & Student Speaks',
      'Official Event Hosting & Red Carpet Coverage',
      'Dignitary & Celebrity Speaker Interviews',
      'Public Relations & Institutional Communications'
    ],
    toolsUsed: ['Wireless Lavalier Mics', 'Rode Wireless GO II', 'Teleprompter Systems', 'Public Speaking']
  },
  {
    id: 'film-team',
    name: 'FILM TEAM',
    subtitle: 'SHORT FILMS & CINEMATIC PROJECTS',
    category: 'Short Films & Cinematic Projects',
    description: 'Creates impactful stories that inspire and connect.',
    longDescription: 'The Film Team is dedicated to scripted fiction, documentary storytelling, and creative short film productions. From screenwriting and storyboarding to directing, cinematography, lighting design, and audio post-production, we turn script pages into cinematic cinema.',
    iconName: 'Film',
    heroImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    activities: [
      'Scriptwriting, Screenplay & Storyboarding',
      'Cinematography & Cinematic Lighting Setups',
      'Short Film Direction & Actor Staging',
      'Sound Score Composition & Foley Editing'
    ],
    toolsUsed: ['Cinema Cameras', 'Aputure / Godox Lighting', 'DaVinci Color Wheels', 'Pro Tools / Logic Pro']
  }
];
