import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Lazy loaded page components for optimal bundle performance & code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const TeamsPage = lazy(() => import('./pages/TeamsPage').then(m => ({ default: m.TeamsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const VideosPage = lazy(() => import('./pages/VideosPage').then(m => ({ default: m.VideosPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const StoriesPage = lazy(() => import('./pages/StoriesPage').then(m => ({ default: m.StoriesPage })));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage').then(m => ({ default: m.AchievementsPage })));
const JoinPage = lazy(() => import('./pages/JoinPage').then(m => ({ default: m.JoinPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 rounded-full border-2 border-gold-500/20 border-t-gold-400 animate-spin" />
    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
      SREYAS MEDIA CLUB
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
