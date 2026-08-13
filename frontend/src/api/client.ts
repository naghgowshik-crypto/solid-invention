import {
  ApplicationRequest,
  ApplicationResponse,
  ContactFormState,
  ContactMessageResponse,
  EventItem,
  GalleryItem,
  VideoItem,
  StoryItem,
  TeamMember,
  AchievementItem
} from '../types/models';
import { EVENTS_DATA } from '../data/events';
import { GALLERY_ITEMS } from '../data/gallery';
import { VIDEO_ITEMS } from '../data/videos';
import { STORIES_DATA } from '../data/stories';
import { CORE_TEAM_MEMBERS } from '../data/teamMembers';
import { ACHIEVEMENTS_DATA } from '../data/achievements';

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('media_club_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) errorMessage = errorData.message;
      if (errorData.errors) {
        const details = Object.entries(errorData.errors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        errorMessage += ` (${details})`;
      }
    } catch (e) {
      // ignore json parse error
    }
    throw new Error(errorMessage);
  }
  if (response.status === 240 || response.status === 204) {
    return {} as T;
  }
  return response.json() as Promise<T>;
}

// 1. Submit Application
export async function apiSubmitApplication(data: ApplicationRequest): Promise<ApplicationResponse> {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<ApplicationResponse>(response);
}

// 2. Submit Contact Message
export async function apiSubmitContact(data: ContactFormState): Promise<ContactMessageResponse> {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<ContactMessageResponse>(response);
}

// 3. Admin Authentication
export async function apiLogin(credentials: { username: string; password: string }): Promise<{ token: string; username: string; email: string; role: string }> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse<{ token: string; username: string; email: string; role: string }>(response);
}

// 4. Admin - Applications & Stats
export async function apiGetAdminApplications(
  search = '', preferredTeam = '', status = '', page = 0, size = 10, sortDir = 'desc'
): Promise<{ content: ApplicationResponse[]; totalPages: number; totalElements: number }> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (preferredTeam && preferredTeam !== 'ALL') params.append('preferredTeam', preferredTeam);
  if (status && status !== 'ALL') params.append('status', status);
  params.append('page', String(page));
  params.append('size', String(size));
  params.append('sortDir', sortDir);

  const response = await fetch(`${BASE_URL}/admin/applications?${params.toString()}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return handleResponse<{ content: ApplicationResponse[]; totalPages: number; totalElements: number }>(response);
}

export async function apiGetApplicationById(id: number): Promise<ApplicationResponse> {
  const response = await fetch(`${BASE_URL}/admin/applications/${id}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return handleResponse<ApplicationResponse>(response);
}

export async function apiUpdateApplicationStatus(id: number, status: string): Promise<ApplicationResponse> {
  const response = await fetch(`${BASE_URL}/admin/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ status }),
  });
  return handleResponse<ApplicationResponse>(response);
}

export async function apiGetAdminContactMessages(page = 0, size = 10): Promise<{ content: ContactMessageResponse[]; totalPages: number; totalElements: number }> {
  const response = await fetch(`${BASE_URL}/admin/contact-messages?page=${page}&size=${size}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return handleResponse<{ content: ContactMessageResponse[]; totalPages: number; totalElements: number }>(response);
}

export async function apiGetAdminStats(): Promise<{
  totalApplications: number;
  newApplications: number;
  reviewingApplications: number;
  shortlistedApplications: number;
  selectedApplications: number;
  rejectedApplications: number;
  totalContactMessages: number;
}> {
  const response = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return handleResponse<any>(response);
}

// --- PHASE 3B ADMIN CONTENT MANAGEMENT API CALLS ---

// Events CRUD
export async function apiCreateEvent(data: Partial<EventItem>): Promise<EventItem> {
  const response = await fetch(`${BASE_URL}/admin/content/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<EventItem>(response);
}

export async function apiUpdateEvent(id: number, data: Partial<EventItem>): Promise<EventItem> {
  const response = await fetch(`${BASE_URL}/admin/content/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<EventItem>(response);
}

export async function apiDeleteEvent(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/content/events/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<void>(response);
}

export async function apiToggleEventUpcoming(id: number): Promise<EventItem> {
  const response = await fetch(`${BASE_URL}/admin/content/events/${id}/toggle-upcoming`, {
    method: 'PATCH',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<EventItem>(response);
}

// Gallery CRUD
export async function apiCreateGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  const response = await fetch(`${BASE_URL}/admin/content/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(response);
}

export async function apiUpdateGalleryItem(id: number, data: Partial<GalleryItem>): Promise<GalleryItem> {
  const response = await fetch(`${BASE_URL}/admin/content/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(response);
}

export async function apiDeleteGalleryItem(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/content/gallery/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<void>(response);
}

// Team Members CRUD
export async function apiCreateTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
  const response = await fetch(`${BASE_URL}/admin/content/team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<TeamMember>(response);
}

export async function apiUpdateTeamMember(id: number, data: Partial<TeamMember>): Promise<TeamMember> {
  const response = await fetch(`${BASE_URL}/admin/content/team/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<TeamMember>(response);
}

export async function apiDeleteTeamMember(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/content/team/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<void>(response);
}

export async function apiToggleTeamActive(id: number): Promise<TeamMember> {
  const response = await fetch(`${BASE_URL}/admin/content/team/${id}/toggle-active`, {
    method: 'PATCH',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<TeamMember>(response);
}

// Stories / Announcements CRUD
export async function apiCreateStory(data: Partial<StoryItem>): Promise<StoryItem> {
  const response = await fetch(`${BASE_URL}/admin/content/stories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<StoryItem>(response);
}

export async function apiUpdateStory(id: number, data: Partial<StoryItem>): Promise<StoryItem> {
  const response = await fetch(`${BASE_URL}/admin/content/stories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<StoryItem>(response);
}

export async function apiDeleteStory(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/admin/content/stories/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<void>(response);
}

export async function apiToggleStoryPublish(id: number): Promise<StoryItem> {
  const response = await fetch(`${BASE_URL}/admin/content/stories/${id}/toggle-publish`, {
    method: 'PATCH',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse<StoryItem>(response);
}

// Public Data Fetchers
export async function apiFetchEvents(): Promise<EventItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return data.length > 0 ? data : EVENTS_DATA;
  } catch (e) {
    return EVENTS_DATA;
  }
}

export async function apiFetchPaginatedEvents(upcoming?: boolean, page = 0, size = 10): Promise<{ content: EventItem[]; totalPages: number; totalElements: number }> {
  try {
    const queryParams = new URLSearchParams();
    if (upcoming !== undefined) queryParams.append('upcoming', String(upcoming));
    queryParams.append('page', String(page));
    queryParams.append('size', String(size));

    const response = await fetch(`${BASE_URL}/events/page?${queryParams.toString()}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || data.content?.length || 0,
    };
  } catch (e) {
    const filtered = upcoming !== undefined ? EVENTS_DATA.filter(ev => ev.isUpcoming === upcoming) : EVENTS_DATA;
    return {
      content: filtered,
      totalPages: 1,
      totalElements: filtered.length,
    };
  }
}


export async function apiFetchGallery(category = 'ALL', page = 0, size = 12): Promise<{ content: GalleryItem[]; totalPages: number; totalElements: number }> {
  try {
    const query = category && category !== 'ALL' ? `?category=${encodeURIComponent(category)}&page=${page}&size=${size}` : `?page=${page}&size=${size}`;
    const response = await fetch(`${BASE_URL}/gallery${query}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || data.content?.length || 0,
    };
  } catch (e) {
    const filtered = category === 'ALL' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category.toUpperCase() === category.toUpperCase());
    return {
      content: filtered,
      totalPages: Math.ceil(filtered.length / size) || 1,
      totalElements: filtered.length,
    };
  }
}

export async function apiFetchVideos(category = 'ALL', page = 0, size = 12): Promise<{ content: VideoItem[]; totalPages: number; totalElements: number }> {
  try {
    const query = category && category !== 'ALL' ? `?category=${encodeURIComponent(category)}&page=${page}&size=${size}` : `?page=${page}&size=${size}`;
    const response = await fetch(`${BASE_URL}/videos${query}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || data.content?.length || 0,
    };
  } catch (e) {
    const filtered = category === 'ALL' ? VIDEO_ITEMS : VIDEO_ITEMS.filter(v => v.category.toUpperCase() === category.toUpperCase());
    return {
      content: filtered,
      totalPages: Math.ceil(filtered.length / size) || 1,
      totalElements: filtered.length,
    };
  }
}

export async function apiFetchStories(page = 0, size = 10): Promise<{ content: StoryItem[]; totalPages: number; totalElements: number }> {
  try {
    const response = await fetch(`${BASE_URL}/stories?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || data.content?.length || 0,
    };
  } catch (e) {
    return {
      content: STORIES_DATA,
      totalPages: 1,
      totalElements: STORIES_DATA.length,
    };
  }
}

export async function apiFetchTeam(team?: string): Promise<TeamMember[]> {
  try {
    const query = team && team !== 'ALL' ? `?team=${encodeURIComponent(team)}` : '';
    const response = await fetch(`${BASE_URL}/team${query}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return data.length > 0 ? data : CORE_TEAM_MEMBERS;
  } catch (e) {
    return CORE_TEAM_MEMBERS;
  }
}

export async function apiFetchAchievements(page = 0, size = 10): Promise<{ content: AchievementItem[]; totalPages: number; totalElements: number }> {
  try {
    const response = await fetch(`${BASE_URL}/achievements?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('API offline');
    const data = await response.json();
    return {
      content: data.content || [],
      totalPages: data.totalPages || 1,
      totalElements: data.totalElements || data.content?.length || 0,
    };
  } catch (e) {
    return {
      content: ACHIEVEMENTS_DATA,
      totalPages: 1,
      totalElements: ACHIEVEMENTS_DATA.length,
    };
  }
}
