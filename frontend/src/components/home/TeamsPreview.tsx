import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Video, Mic, Film, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { CREATIVE_TEAMS } from '../../data/teams';
import { LazyImage } from '../ui/LazyImage';

const ICON_MAP = {
  Camera: Camera,
  Video: Video,
  Mic: Mic,
  Film: Film,
};

export const TeamsPreview: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR STRUCTURE"
          title="FOUR TEAMS. ONE CREATIVE VISION."
          subtitle="Specialized wings working together to turn campus life into cinema."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CREATIVE_TEAMS.map((team, idx) => {
            const Icon = ICON_MAP[team.iconName as keyof typeof ICON_MAP] || Camera;
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between p-8"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 overflow-hidden pointer-events-none">
                  <LazyImage
                    src={team.heroImage}
                    alt={team.name}
                    widthParam={600}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-transparent" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold font-mono tracking-widest text-slate-500 uppercase">
                      0{idx + 1} / DIVISION
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {team.subtitle}
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-white mt-1 group-hover:text-gold-300 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      "{team.description}"
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-amber-500/10 mt-6">
                  <Link
                    to="/teams"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors group/link"
                  >
                    <span>EXPLORE TEAM</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
