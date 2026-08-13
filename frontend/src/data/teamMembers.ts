import { TeamMember } from '../types/models';

export const CORE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'core-1',
    name: 'K. Sreyas Vardhan',
    position: 'President',
    roleType: 'CORE_EXECUTIVE',
    team: 'Core Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    bio: 'Visionary creative leader overseeing strategic expansion, campus partnerships, and flagship media productions.',
    branch: 'CSE (AI & ML)',
    year: '4th Year',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      portfolio: 'https://github.com'
    }
  },
  {
    id: 'core-2',
    name: 'Ananya Reddy',
    position: 'Vice President',
    roleType: 'CORE_EXECUTIVE',
    team: 'Core Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    bio: 'Drives operational planning, cross-team synergy, and student engagement initiatives across all four creative divisions.',
    branch: 'ECE',
    year: '4th Year',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'core-3',
    name: 'Rahul Sharma',
    position: 'General Secretary',
    roleType: 'CORE_EXECUTIVE',
    team: 'Core Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bio: 'Manages administrative workflows, official college communications, member onboarding, and event documentation.',
    branch: 'CSE',
    year: '3rd Year',
    socials: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'core-4',
    name: 'Vikramaditya Rao',
    position: 'Creative Director',
    roleType: 'CORE_EXECUTIVE',
    team: 'Film',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bio: 'Curates the overall visual identity, film aesthetics, tone, color palette, and storytelling direction of Media Club.',
    branch: 'CSE (Data Science)',
    year: '4th Year',
    socials: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: 'core-5',
    name: 'Meera Nambiar',
    position: 'Executive Producer',
    roleType: 'CORE_EXECUTIVE',
    team: 'Shoot',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    bio: 'Head of video logistics, camera rig allocations, shooting timelines, and post-production delivery schedules.',
    branch: 'ECE',
    year: '3rd Year',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'core-6',
    name: 'Karthik Varma',
    position: 'Technical Head',
    roleType: 'CORE_EXECUTIVE',
    team: 'Core Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
    bio: 'Architect of digital infrastructure, media asset management server, web applications, and live streaming rigs.',
    branch: 'CSE',
    year: '4th Year',
    socials: {
      linkedin: 'https://linkedin.com',
      portfolio: 'https://github.com'
    }
  },
  {
    id: 'core-7',
    name: 'Sravya Chowdary',
    position: 'PR & Outreach Head',
    roleType: 'CORE_EXECUTIVE',
    team: 'Ambassadors',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    bio: 'Leads external institutional ties, press releases, dignitary welcomes, and inter-college media collaborations.',
    branch: 'IT',
    year: '3rd Year',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'core-8',
    name: 'Aditya Teja',
    position: 'Social Media & Branding Head',
    roleType: 'CORE_EXECUTIVE',
    team: 'Ambassadors',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    bio: 'Spearheads social strategy, Instagram grid aesthetic, reel publishing schedules, and brand growth analytics.',
    branch: 'CSE (IOT)',
    year: '3rd Year',
    socials: {
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'core-9',
    name: 'Priyanka Sen',
    position: 'Operations & Event Coordinator',
    roleType: 'CORE_EXECUTIVE',
    team: 'Core Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    bio: 'Coordinates auditorium stage management, crew shifts, backstage access passes, and event execution accuracy.',
    branch: 'Civil Engg',
    year: '3rd Year',
    socials: {
      linkedin: 'https://linkedin.com'
    }
  }
];

export const SPECIALIZED_TEAM_LEADS: TeamMember[] = [
  {
    id: 'lead-1',
    name: 'Siddharth Rao',
    position: 'Capture Team Lead',
    roleType: 'DEPARTMENT_HEAD',
    team: 'Capture',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop',
    bio: 'Specializes in high-speed sports photography and concert lighting captures.',
    branch: 'Mechanical Engg',
    year: '3rd Year',
    socials: { instagram: 'https://instagram.com' }
  },
  {
    id: 'lead-2',
    name: 'Rohan Gupta',
    position: 'Shoot Team Lead',
    roleType: 'DEPARTMENT_HEAD',
    team: 'Shoot',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
    bio: 'Master of FPV drone cinematic shots and color grading in DaVinci Resolve.',
    branch: 'ECE',
    year: '3rd Year',
    socials: { instagram: 'https://instagram.com' }
  },
  {
    id: 'lead-3',
    name: 'Divya Reddy',
    position: 'Ambassadors Team Lead',
    roleType: 'DEPARTMENT_HEAD',
    team: 'Ambassadors',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    bio: 'Lead anchor with 50+ stage hosting appearances and celebrity interviews.',
    branch: 'CSE',
    year: '3rd Year',
    socials: { instagram: 'https://instagram.com' }
  },
  {
    id: 'lead-4',
    name: 'Arjun Verma',
    position: 'Film Team Lead',
    roleType: 'DEPARTMENT_HEAD',
    team: 'Film',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&auto=format&fit=crop',
    bio: 'Award-winning short film director and screenplay writer.',
    branch: 'EEE',
    year: '4th Year',
    socials: { instagram: 'https://instagram.com' }
  }
];
