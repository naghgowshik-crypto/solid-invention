import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, Search, LogOut, ArrowUpDown, Calendar, Image as ImageIcon, UserCheck, BookOpen, Plus, Edit, Trash2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  apiGetAdminApplications, apiGetAdminContactMessages, apiGetAdminStats,
  apiFetchEvents, apiCreateEvent, apiUpdateEvent, apiDeleteEvent, apiToggleEventUpcoming,
  apiFetchGallery, apiCreateGalleryItem, apiUpdateGalleryItem, apiDeleteGalleryItem,
  apiFetchTeam, apiCreateTeamMember, apiUpdateTeamMember, apiDeleteTeamMember, apiToggleTeamActive,
  apiFetchStories, apiCreateStory, apiUpdateStory, apiDeleteStory, apiToggleStoryPublish
} from '../../api/client';
import { ApplicationResponse, ContactMessageResponse, EventItem, GalleryItem, TeamMember, StoryItem } from '../../types/models';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'events' | 'gallery' | 'team' | 'stories'>('applications');

  // Stats State
  const [stats, setStats] = useState({
    totalApplications: 0,
    newApplications: 0,
    reviewingApplications: 0,
    shortlistedApplications: 0,
    selectedApplications: 0,
    rejectedApplications: 0,
    totalContactMessages: 0,
  });

  // Applications Filter & Data State
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [appsPage, setAppsPage] = useState(0);
  const [appsTotalPages, setAppsTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [loadingApps, setLoadingApps] = useState(false);

  // Messages State
  const [messages, setMessages] = useState<ContactMessageResponse[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Content Management State
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [storiesList, setStoriesList] = useState<StoryItem[]>([]);

  // Content Modals State
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Partial<TeamMember> | null>(null);

  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStory, setEditingStory] = useState<Partial<StoryItem> | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'event' | 'gallery' | 'team' | 'story'; id: number; title: string } | null>(null);

  // Fetch Dashboard Stats
  const loadStats = async () => {
    try {
      const data = await apiGetAdminStats();
      setStats(data);
    } catch (e) {
      console.warn('Failed to load admin stats', e);
    }
  };

  // Fetch Applications
  const loadApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await apiGetAdminApplications(search, teamFilter, statusFilter, appsPage, 10, sortDir);
      setApplications(res.content || []);
      setAppsTotalPages(res.totalPages || 1);
    } catch (e) {
      console.warn('Failed to load admin applications', e);
    } finally {
      setLoadingApps(false);
    }
  };

  // Fetch Messages
  const loadMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await apiGetAdminContactMessages(0, 50);
      setMessages(res.content || []);
    } catch (e) {
      console.warn('Failed to load contact messages', e);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch Content Data
  const loadContentData = async () => {
    try {
      if (activeTab === 'events') {
        const data = await apiFetchEvents();
        setEventsList(data);
      } else if (activeTab === 'gallery') {
        const res = await apiFetchGallery('ALL', 0, 50);
        setGalleryList(res.content || []);
      } else if (activeTab === 'team') {
        const data = await apiFetchTeam('ALL');
        setTeamList(data);
      } else if (activeTab === 'stories') {
        const res = await apiFetchStories(0, 50);
        setStoriesList(res.content || []);
      }
    } catch (e) {
      console.warn('Failed to load content management data', e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'applications') {
      loadApplications();
    } else if (activeTab === 'messages') {
      loadMessages();
    } else {
      loadContentData();
    }
  }, [activeTab, search, teamFilter, statusFilter, appsPage, sortDir]);

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">New</span>;
      case 'REVIEWING':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">Reviewing</span>;
      case 'SHORTLISTED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gold-500/20 border border-gold-500/40 text-gold-300">Shortlisted</span>;
      case 'SELECTED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">Selected</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/30 text-rose-400">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-500/10 border border-slate-500/30 text-slate-400">{status}</span>;
    }
  };

  // Helper to determine if an event is past using IST timezone (Asia/Kolkata)
  const isEventPastInAdmin = (dateStr?: string, timeStr?: string): boolean => {
    if (!dateStr) return false;
    const now = new Date();
    const nowISTStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const nowIST = new Date(nowISTStr);

    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) return false;

    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();
    const day = parsedDate.getDate();

    let hours = 23;
    let minutes = 59;
    let seconds = 59;
    let hasSpecificTime = false;

    if (timeStr && timeStr.trim()) {
      const match = timeStr.trim().match(/(\d{1,2}):(\d{2})(?:\s*([AP]M))?/i);
      if (match) {
        hasSpecificTime = true;
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const ampm = match[3] ? match[3].toUpperCase() : null;
        if (ampm === 'PM' && h < 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;
        hours = h;
        minutes = m;
        seconds = 0;
      }
    }

    if (!hasSpecificTime) {
      hours = 23;
      minutes = 59;
      seconds = 59;
    }

    const eventEndIST = new Date(year, month, day, hours, minutes, seconds);
    return nowIST.getTime() > eventEndIST.getTime();
  };

  // Event Handlers
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title || !editingEvent?.description || !editingEvent?.date) return;
    try {
      if (editingEvent.id) {
        await apiUpdateEvent(Number(editingEvent.id), editingEvent);
      } else {
        await apiCreateEvent(editingEvent);
      }
      setShowEventModal(false);
      setEditingEvent(null);
      await loadContentData();
    } catch (err: any) {
      alert('Failed to save event: ' + err.message);
    }
  };

  // Gallery Handlers
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.title || !editingGallery?.imageUrl) return;
    try {
      if (editingGallery.id) {
        await apiUpdateGalleryItem(Number(editingGallery.id), editingGallery);
      } else {
        await apiCreateGalleryItem(editingGallery);
      }
      setShowGalleryModal(false);
      setEditingGallery(null);
      await loadContentData();
    } catch (err: any) {
      alert('Failed to save gallery item: ' + err.message);
    }
  };

  // Team Handlers
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam?.name || !editingTeam?.position) return;
    try {
      if (editingTeam.id) {
        await apiUpdateTeamMember(Number(editingTeam.id), editingTeam);
      } else {
        await apiCreateTeamMember(editingTeam);
      }
      setShowTeamModal(false);
      setEditingTeam(null);
      await loadContentData();
    } catch (err: any) {
      alert('Failed to save team member: ' + err.message);
    }
  };

  // Story Handlers
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory?.title || !editingStory?.content || !editingStory?.excerpt) return;
    try {
      if (editingStory.id) {
        await apiUpdateStory(Number(editingStory.id), editingStory);
      } else {
        await apiCreateStory(editingStory);
      }
      setShowStoryModal(false);
      setEditingStory(null);
      await loadContentData();
    } catch (err: any) {
      alert('Failed to save story: ' + err.message);
    }
  };

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'event') await apiDeleteEvent(deleteTarget.id);
      else if (deleteTarget.type === 'gallery') await apiDeleteGalleryItem(deleteTarget.id);
      else if (deleteTarget.type === 'team') await apiDeleteTeamMember(deleteTarget.id);
      else if (deleteTarget.type === 'story') await apiDeleteStory(deleteTarget.id);

      setDeleteTarget(null);
      await loadContentData();
    } catch (err: any) {
      alert('Delete operation failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-amber-500/15 bg-navy-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-sm">
              SMC
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider uppercase font-heading text-white">Media Club Admin Portal</h1>
              <p className="text-[10px] text-slate-400">Sreyas Institute of Engineering and Technology</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-slate-200">{user?.username || 'Administrator'}</p>
              <p className="text-[10px] text-gold-400">{user?.email || 'admin@sreyas.ac.in'}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-navy-800 border border-amber-500/20 text-slate-400 hover:text-gold-400 hover:border-gold-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Analytics Summary Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="p-4 glass-panel rounded-2xl border border-amber-500/15">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Apps</p>
            <p className="text-2xl font-bold font-heading text-white mt-1">{stats.totalApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-blue-500/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">New</p>
            <p className="text-2xl font-bold font-heading text-blue-300 mt-1">{stats.newApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-amber-500/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Reviewing</p>
            <p className="text-2xl font-bold font-heading text-amber-300 mt-1">{stats.reviewingApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-gold-500/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Shortlisted</p>
            <p className="text-2xl font-bold font-heading text-gold-300 mt-1">{stats.shortlistedApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-emerald-500/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Selected</p>
            <p className="text-2xl font-bold font-heading text-emerald-300 mt-1">{stats.selectedApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-rose-500/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Rejected</p>
            <p className="text-2xl font-bold font-heading text-rose-300 mt-1">{stats.rejectedApplications}</p>
          </div>
          <div className="p-4 glass-panel rounded-2xl border border-amber-500/15 col-span-2 sm:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Messages</p>
            <p className="text-2xl font-bold font-heading text-white mt-1">{stats.totalContactMessages}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-amber-500/15 gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'applications' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications ({stats.totalApplications})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'messages' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({stats.totalContactMessages})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'events' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events ({eventsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'gallery' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery ({galleryList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'team' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Team ({teamList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors border-b-2 ${
              activeTab === 'stories' ? 'border-gold-400 text-gold-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Stories & News ({storiesList.length})</span>
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 glass-panel rounded-2xl border border-amber-500/15">
              <div className="relative">
                <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, roll, email..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setAppsPage(0); }}
                  className="w-full bg-navy-900 border border-amber-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <select
                value={teamFilter}
                onChange={(e) => { setTeamFilter(e.target.value); setAppsPage(0); }}
                className="bg-navy-900 border border-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-gold-400"
              >
                <option value="ALL">All Preferred Teams</option>
                <option value="Photography">Photography</option>
                <option value="Videography">Videography</option>
                <option value="Editing">Editing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Content & Scripting">Content & Scripting</option>
                <option value="Social Media & PR">Social Media & PR</option>
                <option value="Event Management">Event Management</option>
                <option value="Anchoring">Anchoring</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setAppsPage(0); }}
                className="bg-navy-900 border border-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-gold-400"
              >
                <option value="ALL">All Application Statuses</option>
                <option value="NEW">NEW</option>
                <option value="REVIEWING">REVIEWING</option>
                <option value="SHORTLISTED">SHORTLISTED</option>
                <option value="SELECTED">SELECTED</option>
                <option value="REJECTED">REJECTED</option>
              </select>

              <button
                onClick={() => setSortDir(sortDir === 'desc' ? 'asc' : 'desc')}
                className="bg-navy-900 border border-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-slate-300 hover:text-gold-400 flex items-center justify-between"
              >
                <span>Sort: {sortDir === 'desc' ? 'Newest First' : 'Oldest First'}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>

            {loadingApps ? (
              <div className="p-12 text-center text-slate-400 text-xs">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="p-12 text-center text-slate-400 glass-panel rounded-2xl border border-amber-500/15">
                No recruitment applications match the current filter.
              </div>
            ) : (
              <>
                <div className="hidden md:block glass-panel rounded-2xl border border-amber-500/15 overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-navy-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-amber-500/15">
                      <tr>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Roll / Branch</th>
                        <th className="px-6 py-4">Year</th>
                        <th className="px-6 py-4">Preferred Team</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-500/10">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-navy-900/40 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-100">
                            <div>{app.fullName}</div>
                            <div className="text-[10px] font-normal text-slate-400">{app.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div>{app.rollNumber}</div>
                            <div className="text-[10px] text-slate-400">{app.branch}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-300">{app.year}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-md text-[10px] bg-gold-500/10 border border-gold-500/20 text-gold-300 font-semibold">
                              {app.preferredTeam}
                            </span>
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                          <td className="px-6 py-4 text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden grid grid-cols-1 gap-4">
                  {applications.map((app) => (
                    <div key={app.id} className="p-5 glass-panel rounded-2xl border border-amber-500/15 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-100 text-sm">{app.fullName}</h4>
                          <p className="text-xs text-gold-400">{app.preferredTeam}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <p><strong className="text-slate-300">Roll:</strong> {app.rollNumber}</p>
                        <p><strong className="text-slate-300">Branch:</strong> {app.branch} • {app.year}</p>
                        <p><strong className="text-slate-300">Email:</strong> {app.email}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-4">
                  <span>Page {appsPage + 1} of {appsTotalPages}</span>
                  <div className="space-x-2">
                    <button
                      disabled={appsPage === 0}
                      onClick={() => setAppsPage(appsPage - 1)}
                      className="px-3 py-1.5 rounded-lg bg-navy-900 border border-amber-500/20 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      disabled={appsPage + 1 >= appsTotalPages}
                      onClick={() => setAppsPage(appsPage + 1)}
                      className="px-3 py-1.5 rounded-lg bg-navy-900 border border-amber-500/20 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: Contact Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            {loadingMessages ? (
              <div className="p-12 text-center text-slate-400 text-xs">Loading contact messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-slate-400 glass-panel rounded-2xl border border-amber-500/15">
                No contact messages received yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-6 glass-panel rounded-2xl border border-amber-500/15 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{msg.name}</h4>
                        <p className="text-xs text-gold-400">{msg.email}</p>
                      </div>
                      <span className="text-[10px] text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="pt-2 border-t border-amber-500/10">
                      <p className="text-xs font-semibold text-slate-200">Subject: {msg.subject}</p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Events Management */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Manage Events</h3>
                <p className="text-xs text-slate-400">Create, edit, toggle upcoming, or remove club events</p>
              </div>
              <button
                onClick={() => { setEditingEvent({ title: '', subtitle: '', description: '', date: '', time: '', venue: '', category: 'Event', isUpcoming: true, registrationOpen: true }); setShowEventModal(true); }}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsList.map((ev) => {
                const isPast = isEventPastInAdmin(ev.date, ev.time);
                const displayUpcoming = !isPast;
                return (
                  <div key={ev.id} className="glass-panel rounded-2xl border border-amber-500/15 p-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-white text-sm">{ev.title}</h4>
                        <button
                          onClick={async () => { await apiToggleEventUpcoming(Number(ev.id)); await loadContentData(); }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${displayUpcoming ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-slate-500/10 border border-slate-500/30 text-slate-400'}`}
                        >
                          {displayUpcoming ? 'Upcoming' : 'Past'}
                        </button>
                      </div>
                      <p className="text-xs text-gold-400">{ev.category} • {ev.date}</p>
                      <p className="text-xs text-slate-300 line-clamp-2">{ev.description}</p>
                    </div>

                  <div className="pt-4 border-t border-amber-500/10 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => { setEditingEvent(ev); setShowEventModal(true); }}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-gold-400"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'event', id: Number(ev.id), title: ev.title })}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Tab 4: Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Manage Gallery Items</h3>
                <p className="text-xs text-slate-400">Add photography, behind-the-scenes, or event highlights</p>
              </div>
              <button
                onClick={() => { setEditingGallery({ title: '', category: 'PHOTOGRAPHY', imageUrl: '', photographer: '', location: '' }); setShowGalleryModal(true); }}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList.map((item) => (
                <div key={item.id} className="glass-panel rounded-2xl border border-amber-500/15 overflow-hidden flex flex-col justify-between">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="p-4 space-y-2 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">{item.category}</span>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400">By {item.photographer || 'Media Club'}</p>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-end space-x-2 border-t border-amber-500/10 mt-auto">
                    <button
                      onClick={() => { setEditingGallery(item); setShowGalleryModal(true); }}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-gold-400"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'gallery', id: Number(item.id), title: item.title })}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Team Members Management */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Manage Team Members</h3>
                <p className="text-xs text-slate-400">Add core executives, team leads, or toggle active member status</p>
              </div>
              <button
                onClick={() => { setEditingTeam({ name: '', position: '', team: 'Core Executive', branch: 'CSE', year: '3rd Year', active: true }); setShowTeamModal(true); }}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamList.map((tm) => (
                <div key={tm.id} className="glass-panel rounded-2xl border border-amber-500/15 p-5 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={tm.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'} alt={tm.name} className="w-14 h-14 rounded-full object-cover border border-amber-500/30" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{tm.name}</h4>
                      <p className="text-xs text-gold-400 font-semibold">{tm.position}</p>
                      <p className="text-[10px] text-slate-400">{tm.branch} • {tm.year}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
                    <button
                      onClick={async () => { await apiToggleTeamActive(Number(tm.id)); await loadContentData(); }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${tm.active !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}
                    >
                      {tm.active !== false ? 'Active' : 'Inactive'}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => { setEditingTeam(tm); setShowTeamModal(true); }}
                        className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-gold-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ type: 'team', id: Number(tm.id), title: tm.name })}
                        className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Stories & Announcements Management */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Manage Stories & News</h3>
                <p className="text-xs text-slate-400">Publish articles, announcements, and campus stories</p>
              </div>
              <button
                onClick={() => { setEditingStory({ title: '', excerpt: '', content: '', category: 'Campus News', authorName: 'Media Club Team', published: true }); setShowStoryModal(true); }}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Article / Story</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storiesList.map((st) => (
                <div key={st.id} className="glass-panel rounded-2xl border border-amber-500/15 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-white text-sm">{st.title}</h4>
                      <button
                        onClick={async () => { await apiToggleStoryPublish(Number(st.id)); await loadContentData(); }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${st.published !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}
                      >
                        {st.published !== false ? 'Published' : 'Draft'}
                      </button>
                    </div>
                    <p className="text-xs text-gold-400">{st.category} • By {st.authorName || 'Editorial Team'}</p>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{st.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-amber-500/10 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => { setEditingStory(st); setShowStoryModal(true); }}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-gold-400"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'story', id: Number(st.id), title: st.title })}
                      className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-navy-900 border border-amber-500/20 rounded-3xl p-6 max-w-md w-full space-y-6 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
                <p className="text-xs text-slate-300">Are you sure you want to delete <strong className="text-gold-300">"{deleteTarget.title}"</strong>?</p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl bg-navy-800 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Form Modal */}
      {showEventModal && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveEvent} className="bg-navy-900 border border-amber-500/20 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">{editingEvent.id ? 'Edit Event' : 'Create New Event'}</h3>
            <input type="text" placeholder="Title" value={editingEvent.title || ''} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <input type="text" placeholder="Subtitle" value={editingEvent.subtitle || ''} onChange={e => setEditingEvent({ ...editingEvent, subtitle: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            <textarea placeholder="Description" value={editingEvent.description || ''} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" rows={3} required />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Date (e.g. 14 AUG 2026)" value={editingEvent.date || ''} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} className="bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
              <input type="text" placeholder="Time" value={editingEvent.time || ''} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} className="bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            </div>
            <input type="text" placeholder="Poster Image URL" value={editingEvent.posterUrl || ''} onChange={e => setEditingEvent({ ...editingEvent, posterUrl: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setShowEventModal(false)} className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 font-semibold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold">Save Event</button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Form Modal */}
      {showGalleryModal && editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveGallery} className="bg-navy-900 border border-amber-500/20 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">{editingGallery.id ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
            <input type="text" placeholder="Title" value={editingGallery.title || ''} onChange={e => setEditingGallery({ ...editingGallery, title: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <select value={editingGallery.category || 'PHOTOGRAPHY'} onChange={e => setEditingGallery({ ...editingGallery, category: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100">
              <option value="PHOTOGRAPHY">PHOTOGRAPHY</option>
              <option value="EVENTS">EVENTS</option>
              <option value="CAMPUS LIFE">CAMPUS LIFE</option>
              <option value="BEHIND THE SCENES">BEHIND THE SCENES</option>
              <option value="PORTRAITS">PORTRAITS</option>
            </select>
            <input type="text" placeholder="Image URL" value={editingGallery.imageUrl || ''} onChange={e => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <input type="text" placeholder="Photographer" value={editingGallery.photographer || ''} onChange={e => setEditingGallery({ ...editingGallery, photographer: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setShowGalleryModal(false)} className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 font-semibold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold">Save Item</button>
            </div>
          </form>
        </div>
      )}

      {/* Team Member Form Modal */}
      {showTeamModal && editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveTeam} className="bg-navy-900 border border-amber-500/20 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">{editingTeam.id ? 'Edit Team Member' : 'Add Team Member'}</h3>
            <input type="text" placeholder="Full Name" value={editingTeam.name || ''} onChange={e => setEditingTeam({ ...editingTeam, name: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <input type="text" placeholder="Position / Role" value={editingTeam.position || ''} onChange={e => setEditingTeam({ ...editingTeam, position: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Branch" value={editingTeam.branch || ''} onChange={e => setEditingTeam({ ...editingTeam, branch: e.target.value })} className="bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
              <input type="text" placeholder="Year" value={editingTeam.year || ''} onChange={e => setEditingTeam({ ...editingTeam, year: e.target.value })} className="bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            </div>
            <input type="text" placeholder="Avatar Photo URL" value={editingTeam.avatarUrl || ''} onChange={e => setEditingTeam({ ...editingTeam, avatarUrl: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" />
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setShowTeamModal(false)} className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 font-semibold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold">Save Member</button>
            </div>
          </form>
        </div>
      )}

      {/* Story Form Modal */}
      {showStoryModal && editingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveStory} className="bg-navy-900 border border-amber-500/20 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">{editingStory.id ? 'Edit Story / Article' : 'Create New Story'}</h3>
            <input type="text" placeholder="Title" value={editingStory.title || ''} onChange={e => setEditingStory({ ...editingStory, title: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" required />
            <textarea placeholder="Short Excerpt" value={editingStory.excerpt || ''} onChange={e => setEditingStory({ ...editingStory, excerpt: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" rows={2} required />
            <textarea placeholder="Article Content" value={editingStory.content || ''} onChange={e => setEditingStory({ ...editingStory, content: e.target.value })} className="w-full bg-navy-950 border border-amber-500/20 rounded-xl p-3 text-slate-100" rows={5} required />
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={() => setShowStoryModal(false)} className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 font-semibold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold">Save Story</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
