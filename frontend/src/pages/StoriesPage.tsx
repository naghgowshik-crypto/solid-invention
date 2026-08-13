import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PaginationControls } from '../components/ui/PaginationControls';
import { StoryModal } from '../components/ui/StoryModal';
import { STORIES_DATA } from '../data/stories';

import { StoryItem } from '../types/models';
import { LazyImage } from '../components/ui/LazyImage';
import { Clock, ArrowRight, User } from 'lucide-react';
import { apiFetchStories } from '../api/client';

const CATEGORIES = ['ALL', 'Behind the Lens', 'Campus Life', 'Creative Journey'];

export const StoriesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [stories, setStories] = useState<StoryItem[]>(STORIES_DATA);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(STORIES_DATA.length);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    apiFetchStories(currentPage - 1, 6)
      .then(res => {
        if (isMounted) {
          setStories(res.content);
          setTotalPages(res.totalPages);
          setTotalItems(res.totalElements);
        }
      })
      .catch(err => console.error('Error fetching paginated stories from API:', err));
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const filteredStories = activeCategory === 'ALL'
    ? stories
    : stories.filter(s => s.category?.toUpperCase() === activeCategory.toUpperCase());


  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          badge="CAMPUS JOURNAL"
          title="STORIES FROM OUR CAMPUS"
          subtitle="Editorial articles, photography diaries, behind-the-scenes interviews, and student life."
        />

        {/* Category Filter Tabs */}
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden bg-navy-900">
                <LazyImage
                  src={story.coverImageUrl}
                  alt={story.title}
                  widthParam={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-navy-950 bg-gold-400 font-mono tracking-wider">
                  {story.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{story.readTimeMinutes || story.readingTime || 5} min read</span>
                    {story.publishedAt && (
                      <>
                        <span>•</span>
                        <span>{story.publishedAt}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-semibold text-slate-200">{story.author?.name || story.authorName || 'Editorial Team'}</span>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-gold-400">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </PageLayout>
  );
};


