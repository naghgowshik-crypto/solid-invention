import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PaginationControls } from '../components/ui/PaginationControls';
import { VideoModal } from '../components/ui/VideoModal';
import { VIDEO_ITEMS } from '../data/videos';
import { VideoItem } from '../types/models';
import { LazyImage } from '../components/ui/LazyImage';
import { Play, Eye, Film } from 'lucide-react';


import { apiFetchVideos } from '../api/client';

const CATEGORIES = ['ALL', 'Reels', 'Event Highlights', 'Short Films', 'Interviews', 'Behind the Scenes'];

export const VideosPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<VideoItem[]>(VIDEO_ITEMS);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(VIDEO_ITEMS.length);

  useEffect(() => {
    let isMounted = true;
    apiFetchVideos(activeCategory, currentPage - 1, 6)
      .then(res => {
        if (isMounted) {
          setVideos(res.content);
          setTotalPages(res.totalPages);
          setTotalItems(res.totalElements);
        }
      })
      .catch(err => {
        console.error('Error fetching paginated videos:', err);
      });
    return () => {
      isMounted = false;
    };
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };


  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          badge="CINEMA"
          title="CINEMATIC VIDEO GALLERY"
          subtitle="Explore official event teasers, short films, Instagram reels, and campus interviews."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-navy-950 shadow-gold-glow font-extrabold'
                  : 'bg-navy-900 border border-amber-500/15 text-slate-300 hover:border-gold-500/40 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden bg-navy-900">
                <LazyImage
                  src={item.thumbnailUrl}
                  alt={item.title}
                  widthParam={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 text-[11px] font-mono font-bold text-white border border-white/10">
                  {item.duration}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-navy-950/40 group-hover:bg-navy-950/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center pl-1 shadow-gold-glow group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-navy-950" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold text-gold-400 font-mono uppercase">{item.category}</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-gold-400" />
                      <span>{item.viewsCount.toLocaleString()} views</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/10 text-xs text-slate-400 flex items-center justify-between">
                  <span>Published {item.date}</span>
                  <span className="text-gold-400 font-semibold flex items-center gap-1">
                    <Film className="w-3.5 h-3.5" />
                    <span>Watch Now</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
        />
      </div>

      <VideoModal item={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </PageLayout>
  );
};

