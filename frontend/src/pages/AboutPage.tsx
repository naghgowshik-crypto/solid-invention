import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StatCounter } from '../components/ui/StatCounter';
import { MILESTONES } from '../data/achievements';
import { LazyImage } from '../components/ui/LazyImage';
import { Camera, Video, Mic, Film } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          badge="ABOUT SREYAS MEDIA CLUB"
          title="MORE THAN MEDIA. WE BUILD MEMORIES."
          subtitle="Discover our history, creative philosophy, structural pillars, and vision for student-led media excellence."
        />

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-gold-400">
              One Club. Many Voices. Endless Stories.
            </h3>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Established at Sreyas Institute of Engineering and Technology, the Media Club serves as the premier student body responsible for official campus media coverage, video documentation, event broadcasts, and creative storytelling.
            </p>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We bridge technical engineering discipline with cinematic artistry. Our members learn hands-on camera operation, professional lighting setups, video editing in Premiere and DaVinci Resolve, public anchoring, and digital brand management.
            </p>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark">
            <LazyImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Sreyas Media Club Team"
              widthParam={1000}
              aspectRatio="landscape"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* 4 Creative Pillars */}
        <div className="mb-24">
          <SectionHeading
            badge="FOUNDATIONS"
            title="THE FOUR CREATIVE PILLARS"
            subtitle="How we structure our passions into specialized excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 glass-panel rounded-2xl border border-amber-500/20 space-y-4">
              <Camera className="w-10 h-10 text-gold-400" />
              <h4 className="text-xl font-bold font-heading text-white">Capture</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Freezing split-second event emotion, campus portraits, and architectural light play through high-resolution photography.
              </p>
            </div>

            <div className="p-8 glass-panel rounded-2xl border border-amber-500/20 space-y-4">
              <Video className="w-10 h-10 text-gold-400" />
              <h4 className="text-xl font-bold font-heading text-white">Shoot</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dynamic videography, trending reels, FPV drone cinematography, and high-energy after-movies.
              </p>
            </div>

            <div className="p-8 glass-panel rounded-2xl border border-amber-500/20 space-y-4">
              <Mic className="w-10 h-10 text-gold-400" />
              <h4 className="text-xl font-bold font-heading text-white">Ambassadors</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connecting people through vox-pop interviews, red-carpet event anchoring, and institutional PR.
              </p>
            </div>

            <div className="p-8 glass-panel rounded-2xl border border-amber-500/20 space-y-4">
              <Film className="w-10 h-10 text-gold-400" />
              <h4 className="text-xl font-bold font-heading text-white">Film</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scriptwriting, screenplays, direction, sound design, and festival short film productions.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Growth Timeline */}
        <div className="mb-24">
          <SectionHeading
            badge="EVOLUTION"
            title="OUR JOURNEY & MILESTONES"
            subtitle="Tracing the growth of Sreyas Media Club from founding spark to campus powerhouse."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="flex items-start space-x-6 p-6 glass-panel rounded-2xl border border-amber-500/15"
              >
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold text-navy-950 bg-gold-400">
                  {m.year}
                </span>
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">{m.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <StatCounter value={50} suffix="+" label="Members" />
          <StatCounter value={20} suffix="+" label="Events Covered" />
          <StatCounter value={100} suffix="+" label="Stories Published" />
          <StatCounter value={15} suffix="+" label="Awards & Mentions" />
        </div>
      </div>
    </PageLayout>
  );
};
