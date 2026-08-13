import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { LightboxModal } from '../ui/LightboxModal';
import { GALLERY_ITEMS } from '../../data/gallery';
import { GalleryItem } from '../../types/models';
import { LazyImage } from '../ui/LazyImage';

const CATEGORIES = ['ALL', 'PHOTOGRAPHY', 'EVENTS', 'CAMPUS LIFE', 'CREATIVE'];

export const FeaturedWork: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return GALLERY_ITEMS.slice(0, 6);
    return GALLERY_ITEMS.filter(
      item => item.category.toUpperCase() === activeCategory
    ).slice(0, 6);
  }, [activeCategory]);

  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="PORTFOLIO"
          title="FEATURED WORK"
          subtitle="Stories captured by our creative teams."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Asymmetric Editorial Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark cursor-pointer ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2 h-96 md:h-[480px]' : 'h-72 md:h-80'
                }`}
              >
                <LazyImage
                  src={item.imageUrl}
                  alt={item.title}
                  widthParam={idx === 0 ? 1200 : 800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
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
                    <h3 className="text-lg md:text-xl font-bold font-heading text-white group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      By {item.photographer} • {item.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-slate-100 bg-navy-900 border border-amber-500/30 hover:border-gold-400 hover:text-gold-400 transition-all group"
          >
            <span>VIEW ALL WORK</span>
            <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};
