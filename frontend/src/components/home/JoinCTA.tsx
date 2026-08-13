import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

export const JoinCTA: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-navy-950 border-t border-amber-500/15">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920&auto=format&fit=crop"
          alt="Sreyas Media Club Join Banner"
          widthParam={1920}
          className="w-full h-full object-cover filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest"
        >
          <UserPlus className="w-4 h-4 text-gold-400" />
          <span>RECRUITMENT OPEN FOR 2026</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight leading-none"
        >
          YOUR STORY COULD BE <br />
          <span className="gold-gradient-text">THE NEXT FRAME.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base md:text-xl text-slate-300 font-normal leading-relaxed"
        >
          Whether you capture moments, create films, host conversations or build our digital presence, there's a place for you here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-4"
        >
          <Link
            to="/join"
            className="inline-flex items-center space-x-3 px-10 py-5 rounded-full text-base font-extrabold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>JOIN THE MEDIA CLUB</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
