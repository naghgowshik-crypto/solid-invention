import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Camera, Calendar, MapPin } from 'lucide-react';
import { GalleryItem } from '../../types/models';
import { LazyImage } from './LazyImage';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
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
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-900/80 border border-amber-500/30 text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image View Area */}
            <div className="lg:w-2/3 bg-black flex items-center justify-center p-2 min-h-[300px] lg:min-h-[500px]">
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                widthParam={1600}
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            {/* Metadata Sidebar */}
            <div className="lg:w-1/3 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 uppercase tracking-widest">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold font-heading text-slate-100 leading-tight">
                  {item.title}
                </h3>

                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-gold-400 text-xs">
                    {item.photographer[0]}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Captured by</p>
                    <p className="font-semibold text-slate-200">{item.photographer}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-amber-500/10 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>{item.date}</span>
                  </div>

                  {item.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-flame-500" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {item.cameraInfo?.camera && (
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-gold-400" />
                      <span>
                        {item.cameraInfo.camera} {item.cameraInfo.lens ? `• ${item.cameraInfo.lens}` : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(Array.isArray(item.tags) ? item.tags : String(item.tags).split(',')).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-gold-500/10 border border-gold-500/30 text-gold-300"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-500/10">
                <button className="flex items-center space-x-2 text-sm text-slate-300 hover:text-flame-400 transition-colors">
                  <Heart className="w-5 h-5 text-flame-500 fill-flame-500/20" />
                  <span>{item.likesCount} Likes</span>
                </button>

                <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                  SREYAS MEDIA CLUB
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
