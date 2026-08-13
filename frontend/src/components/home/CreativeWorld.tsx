import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Film, Share2, Calendar, Mic, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { LazyImage } from '../ui/LazyImage';

const CREATIVE_CATEGORIES = [
  {
    title: 'PHOTOGRAPHY',
    desc: 'Freeze moments. Preserve memories.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    link: '/gallery'
  },
  {
    title: 'VIDEOGRAPHY',
    desc: 'Turn moments into moving stories.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    link: '/videos'
  },
  {
    title: 'FILM',
    desc: 'Create stories that inspire and connect.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    link: '/teams'
  },
  {
    title: 'SOCIAL MEDIA',
    desc: 'Take campus stories to the world.',
    icon: Share2,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    link: '/stories'
  },
  {
    title: 'EVENTS',
    desc: 'Capture the energy behind every event.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    link: '/events'
  },
  {
    title: 'INTERVIEWS',
    desc: 'Give voices and stories a platform.',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    link: '/teams'
  }
];

export const CreativeWorld: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="WHAT WE DO"
          title="OUR CREATIVE WORLD"
          subtitle="Explore the specialized domains where our creators turn ideas into visual mastery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CREATIVE_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark hover:border-gold-400 transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <LazyImage
                  src={cat.image}
                  alt={cat.title}
                  widthParam={800}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent group-hover:via-navy-950/40 transition-colors duration-500" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy-900/80 border border-amber-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-navy-900/60 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-gold-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-white tracking-wide group-hover:text-gold-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 font-normal opacity-90">
                      "{cat.desc}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
