import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StatCounter } from '../components/ui/StatCounter';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { LazyImage } from '../components/ui/LazyImage';
import { Trophy } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <div>
          <SectionHeading
            badge="WALL OF FAME"
            title="ACHIEVEMENTS & RECOGNITION"
            subtitle="Honors won by our filmmakers, photographers, and media teams at state and national forums."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACHIEVEMENTS_DATA.map((ach) => (
              <div
                key={ach.id}
                className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden bg-navy-900">
                  <LazyImage
                    src={ach.imageUrl}
                    alt={ach.title}
                    widthParam={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {ach.highlightStat && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-extrabold text-navy-950 bg-gold-400 font-mono shadow-gold-glow">
                      {ach.highlightStat}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-gold-400 font-mono">
                      <Trophy className="w-4 h-4 text-gold-400" />
                      <span>{ach.award} ({ach.year})</span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-white">
                      {ach.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Organized by {ach.organizer}
                    </p>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Level Impact Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-amber-500/10">
          <StatCounter value={15} suffix="+" label="State & National Trophies" />
          <StatCounter value={100} suffix="K+" label="Total Media Impressions" />
          <StatCounter value={25} suffix="+" label="Short Films Screened" />
          <StatCounter value={100} suffix="%" label="Student Created & Run" />
        </div>
      </div>
    </PageLayout>
  );
};
