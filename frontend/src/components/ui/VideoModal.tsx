import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Calendar, Film } from 'lucide-react';
import { VideoItem } from '../../types/models';

interface VideoModalProps {
  item: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
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
            className="relative z-10 w-full max-w-4xl glass-panel rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Video Player"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-900/80 border border-amber-500/30 text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Frame */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`${item.videoUrl}?autoplay=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Details */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 uppercase tracking-widest">
                  {item.category}
                </span>

                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5 text-gold-400" />
                    <span>{item.viewsCount.toLocaleString()} Views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Film className="w-3.5 h-3.5 text-flame-400" />
                    <span>{item.duration}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-slate-100">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
