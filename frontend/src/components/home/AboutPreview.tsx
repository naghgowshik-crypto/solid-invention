import React from 'react';
import { motion } from 'framer-motion';
import { StatCounter } from '../ui/StatCounter';
import { LazyImage } from '../ui/LazyImage';

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative bg-navy-950 overflow-hidden border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-card-dark group">
              <LazyImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Sreyas Media Club Creative Team Working"
                widthParam={1000}
                aspectRatio="portrait"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-xl border border-amber-500/30">
                <p className="text-sm font-semibold text-gold-300 italic font-serif">
                  "Telling Stories. Building Impact."
                </p>
                <span className="block text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-mono">
                  SREYAS MEDIA CLUB VISION
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy + Stat Counters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 uppercase tracking-widest">
                ABOUT THE CLUB
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-100 leading-tight">
                MORE THAN MEDIA. <br />
                <span className="gold-gradient-text">WE BUILD MEMORIES.</span>
              </h2>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-2">
                Sreyas Media Club is a creative community dedicated to capturing campus life through photography, videography, filmmaking, interviews, storytelling and digital media.
              </p>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                We empower student creators, screenwriters, hosts, and visual artists with professional studio workflows, high-end equipment, and platforms to amplify their creative voices across the globe.
              </p>
            </div>

            {/* Statistics Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <StatCounter value={50} suffix="+" label="Members" />
              <StatCounter value={20} suffix="+" label="Events" />
              <StatCounter value={100} suffix="+" label="Stories" />
              <StatCounter value={4} suffix="" label="Creative Teams" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
