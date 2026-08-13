import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Share2 } from 'lucide-react';
import { StoryItem } from '../../types/models';
import { LazyImage } from './LazyImage';

interface StoryModalProps {
  story: StoryItem | null;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (story) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-navy-950/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl glass-panel rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close Article Reader"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-900/80 border border-amber-500/30 text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cover Hero */}
          <div className="relative h-72 md:h-96 w-full">
            <LazyImage
              src={story.coverImageUrl}
              alt={story.title}
              widthParam={1400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent flex flex-col justify-end p-6 md:p-10">
              <span className="inline-block self-start px-3.5 py-1 rounded-full text-xs font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 uppercase tracking-widest mb-3">
                {story.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight">
                {story.title}
              </h1>
            </div>
          </div>

          {/* Article Header & Author */}
          <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-500/15">
              <div className="flex items-center space-x-3">
                <LazyImage
                  src={story.author?.avatarUrl || story.authorAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300'}
                  alt={story.author?.name || story.authorName || 'Author'}
                  widthParam={100}
                  className="w-12 h-12 rounded-full border border-amber-500/30 object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-100">{story.author?.name || story.authorName || 'Sreyas Media Club'}</h4>
                  <p className="text-xs text-slate-400">{story.author?.role || story.authorRole || 'Editorial Team'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>{story.publishedAt}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-flame-400" />
                  <span>{story.readTimeMinutes} min read</span>
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
              {story.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold font-heading text-gold-400 pt-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="text-slate-300">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Footer share */}
            <div className="pt-8 border-t border-amber-500/15 flex items-center justify-between">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                SREYAS MEDIA CLUB STORIES
              </p>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: story.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Story link copied to clipboard!');
                  }
                }}
                className="flex items-center space-x-2 text-xs text-gold-400 hover:text-gold-300 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Story</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
