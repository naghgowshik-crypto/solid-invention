import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, Play } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background Image / Video Simulation */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920&auto=format&fit=crop"
          alt="Sreyas Media Club Cinematic Background"
          widthParam={1920}
          className="w-full h-full object-cover scale-105 filter brightness-75"
        />
        {/* Dark Vignette Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-navy-950/40 to-navy-950" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
        {/* College & Club Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/80 border border-amber-500/30 backdrop-blur-md mb-6 shadow-gold-glow"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gold-400">
            SREYAS MEDIA CLUB
          </span>
        </motion.div>

        {/* Main Tagline Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-heading text-slate-100 tracking-tight leading-none mb-6"
        >
          CREATE. <span className="gold-gradient-text">CAPTURE.</span> CONNECT.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10"
        >
          We capture moments, create stories and turn campus experiences into memories.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/join"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <UserPlus className="w-4 h-4" />
            <span>JOIN THE CLUB</span>
          </Link>

          <Link
            to="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-slate-100 bg-navy-900/80 border border-amber-500/30 hover:border-gold-400 hover:text-gold-400 backdrop-blur-md transition-all duration-300 group"
          >
            <Play className="w-4 h-4 fill-current group-hover:translate-x-0.5 transition-transform" />
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-amber-500/30 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
