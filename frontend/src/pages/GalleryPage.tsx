import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PaginationControls } from '../components/ui/PaginationControls';
import { LightboxModal } from '../components/ui/LightboxModal';
import { GALLERY_ITEMS } from '../data/gallery';

import { GalleryItem } from '../types/models';
import { LazyImage } from '../components/ui/LazyImage';
import { Maximize2, Heart } from 'lucide-react';
import { apiFetchGallery } from '../api/client';

const CATEGORIES = [
  'ALL',
  'PHOTOGRAPHY',
  'EVENTS',
  'CAMPUS LIFE',
  'BEHIND THE SCENES',
  'PORTRAITS',
  'CREATIVE',
];

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(GALLERY_ITEMS.length);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    apiFetchGallery(activeCategory, currentPage - 1, 9)
      .then(res => {
        if (isMounted) {
          setItems(res.content);
          setTotalPages(res.totalPages);
          setTotalItems(res.totalElements);
        }
      })
      .catch(err => console.error('Error fetching paginated gallery from API:', err));
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
          badge="EXHIBITION"
          title="PHOTOGRAPHY PORTFOLIO"
          subtitle="Curated imagery freezing campus emotion, concerts, portraits, and abstract light."
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

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark cursor-pointer h-80 hover:border-gold-400 transition-all duration-500"
            >
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                widthParam={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-navy-950 bg-gold-400 font-mono tracking-wider">
                    {item.category}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-navy-900/80 border border-amber-500/30 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-gold-400" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-400 font-mono">
                    <span>By {item.photographer}</span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3.5 h-3.5 text-flame-500 fill-flame-500/20" />
                      <span>{item.likesCount}</span>
                    </span>
                  </div>
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

      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageLayout>
  );
};

