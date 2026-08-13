export type CategoryType = 'ALL' | 'PHOTOGRAPHY' | 'EVENTS' | 'CAMPUS LIFE' | 'BEHIND THE SCENES' | 'PORTRAITS' | 'CREATIVE' | 'REELS' | 'FILMS' | 'INTERVIEWS' | string;

export interface GalleryItem {
  id: string | number;
  title: string;
  category: CategoryType;
  imageUrl: string;
  thumbnailUrl?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  photographer: string;
  date?: string;
  dateStr?: string;
  likesCount: number;
  tags?: string[] | string;
  location?: string;
  camera?: string;
  lens?: string;
  iso?: string;
  cameraInfo?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    iso?: string;
  };
}

export interface VideoItem {
  id: string | number;
  title: string;
  description: string;
  category: 'Reels' | 'Event Highlights' | 'Short Films' | 'Interviews' | 'Behind the Scenes' | string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  viewsCount: number;
  date?: string;
  dateStr?: string;
  featured?: boolean;
}

export interface EventItem {
  id: string | number;
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  venue: string;
  category: 'Launch' | 'Workshop' | 'Competition' | 'Exhibition' | 'Screening' | string;
  description: string;
  posterUrl: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  registrationUrl?: string;
  agenda?: string[];
  agendaJson?: string;
}

export interface StoryItem {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Behind the Lens' | 'Campus Life' | 'Creative Journey' | 'Spotlight' | string;
  coverImageUrl: string;
  authorName?: string;
  authorRole?: string;
  authorAvatarUrl?: string;
  author?: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt?: string;
  published?: boolean;
  readTimeMinutes?: number;
  readingTime?: number;
  featured?: boolean;
}

export interface TeamMember {
  id: string | number;
  name: string;
  position: string;
  roleType?: 'CORE_EXECUTIVE' | 'DEPARTMENT_HEAD' | 'LEAD' | string;
  team: 'Capture' | 'Shoot' | 'Ambassadors' | 'Film' | 'Core Executive' | string;
  avatarUrl: string;
  bio: string;
  branch?: string;
  year?: string;
  active?: boolean;
  socials?: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    portfolio?: string;
  };
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  portfolioUrl?: string;
}

export interface CreativeTeamInfo {
  id: string;
  name: string;
  subtitle: string;
  category: 'Photography' | 'Videography' | 'Hosting, Anchoring & Interviews' | 'Short Films & Cinematic Projects';
  description: string;
  longDescription: string;
  iconName: string;
  heroImage: string;
  activities: string[];
  toolsUsed: string[];
}

export interface AchievementItem {
  id: string | number;
  title: string;
  year: string;
  award: string;
  organizer: string;
  description: string;
  imageUrl: string;
  highlightStat?: string;
}

export interface RecruitmentFormState {
  fullName: string;
  rollNumber: string;
  branch: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  preferredTeam: string;
  skills: string[];
  previousExperience: string;
  portfolioLink: string;
  whyJoin: string;
}

export interface ApplicationRequest {
  fullName: string;
  rollNumber: string;
  branch: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  preferredTeam: string;
  skills?: string;
  previousExperience?: string;
  portfolioUrl?: string;
  motivation: string;
}

export interface ApplicationResponse {
  id: number;
  fullName: string;
  rollNumber: string;
  branch: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  preferredTeam: string;
  skills?: string;
  previousExperience?: string;
  portfolioUrl?: string;
  motivation: string;
  status: string;
  createdAt: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
