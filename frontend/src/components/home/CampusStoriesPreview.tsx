import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { StoryModal } from '../ui/StoryModal';
import { STORIES_DATA } from '../../data/stories';
import { StoryItem } from '../../types/models';
import { LazyImage } from '../ui/LazyImage';

export const CampusStoriesPreview: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="JOURNAL"
          title="STORIES FROM OUR CAMPUS"
          subtitle="Editorial features, behind-the-scenes insights, and student voices."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES_DATA.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden bg-navy-900">
                <LazyImage
                  src={story.coverImageUrl}
                  alt={story.title}
                  widthParam={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-navy-950 bg-gold-400 font-mono tracking-wider shadow-md">
                  {story.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{story.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{story.publishedAt}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedStory(story)}
                    className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors cursor-pointer leading-snug"
                  >
                    {story.title}
                  </h3>

                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{story.author?.name || story.authorName || 'Media Club Team'}</span>
                  </div>

                  <button
                    onClick={() => setSelectedStory(story)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-slate-100 bg-navy-900 border border-amber-500/30 hover:border-gold-400 hover:text-gold-400 transition-all group"
          >
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>READ ALL CAMPUS STORIES</span>
          </Link>
        </div>
      </div>

      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </section>
  );
};
