import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Ticket } from 'lucide-react';
import { EventModal } from '../ui/EventModal';
import { EVENTS_DATA } from '../../data/events';
import { LazyImage } from '../ui/LazyImage';
import { EventItem } from '../../types/models';

interface FirstFrameBannerProps {
  event?: EventItem;
}

export const FirstFrameBanner: React.FC<FirstFrameBannerProps> = ({ event: propEvent }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const event = propEvent || EVENTS_DATA[0];

  return (
    <section className="py-20 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden glass-panel border-2 border-gold-500/40 shadow-gold-glow p-8 md:p-14"
        >
          {/* Background Poster Overlay */}
          <div className="absolute inset-0 z-0">
            <LazyImage
              src={event.posterUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600'}
              alt={event.title}
              widthParam={1600}
              className="w-full h-full object-cover filter brightness-50 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 text-xs font-extrabold uppercase tracking-widest shadow-gold-glow">
                <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
                <span>{event.category || 'UPCOMING FLAGSHIP EVENT'}</span>
              </div>

              <div>
                <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-none">
                  {event.title}
                </h2>
                {event.subtitle && (
                  <p className="text-lg md:text-xl font-bold font-serif text-gold-400 tracking-wider uppercase mt-2">
                    {event.subtitle}
                  </p>
                )}
              </div>

              <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-200 font-semibold">
                <div className="flex items-center space-x-2 bg-navy-900/80 px-4 py-2 rounded-xl border border-amber-500/20">
                  <Calendar className="w-5 h-5 text-gold-400" />
                  <span>{event.date} {event.time ? `• ${event.time}` : ''}</span>
                </div>
                <div className="flex items-center space-x-2 bg-navy-900/80 px-4 py-2 rounded-xl border border-amber-500/20">
                  <MapPin className="w-5 h-5 text-flame-400" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-extrabold uppercase tracking-wider text-sm shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <Ticket className="w-5 h-5" />
                <span>REGISTER NOW</span>
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-navy-900/90 border border-amber-500/40 text-slate-100 font-bold uppercase tracking-wider text-sm hover:border-gold-400 hover:text-gold-400 transition-all text-center"
              >
                VIEW EVENT DETAILS
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <EventModal event={modalOpen ? event : null} onClose={() => setModalOpen(false)} />
    </section>
  );
};

