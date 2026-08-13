import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CREATIVE_TEAMS } from '../data/teams';
import { TeamMember } from '../types/models';
import { LazyImage } from '../components/ui/LazyImage';
import { Camera, Video, Mic, Film, Instagram, Linkedin, Wrench, CheckCircle2 } from 'lucide-react';
import { apiFetchTeam } from '../api/client';

const ICON_MAP = {
  Camera: Camera,
  Video: Video,
  Mic: Mic,
  Film: Film,
};

export const TeamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SPECIALIZED' | 'CORE'>('SPECIALIZED');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    apiFetchTeam()
      .then(data => {
        if (isMounted) {
          setTeamMembers(data || []);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching team members from API:', err);
        if (isMounted) {
          setTeamMembers([]);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          badge="OUR CREATIVE FORCE"
          title="FOUR TEAMS. ONE CREATIVE VISION."
          subtitle="Explore our specialized production divisions and meet the leadership behind every frame."
        />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 glass-panel rounded-full border border-amber-500/20 inline-flex space-x-2">
            <button
              onClick={() => setActiveTab('SPECIALIZED')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'SPECIALIZED'
                  ? 'bg-gold-500 text-navy-950 shadow-gold-glow'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              SPECIALIZED TEAMS (4 DIVISIONS)
            </button>
            <button
              onClick={() => setActiveTab('CORE')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'CORE'
                  ? 'bg-gold-500 text-navy-950 shadow-gold-glow'
                  : 'text-slate-300 hover:text-gold-400'
              }`}
            >
              CORE LEADERSHIP ({teamMembers.length} POSITIONS)
            </button>
          </div>
        </div>

        {/* Specialized Teams Section */}
        {activeTab === 'SPECIALIZED' && (
          <div className="space-y-16">
            {CREATIVE_TEAMS.map((team) => {
              const Icon = ICON_MAP[team.iconName as keyof typeof ICON_MAP] || Camera;
              return (
                <div
                  key={team.id}
                  className="p-8 md:p-12 glass-panel rounded-3xl border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold uppercase text-gold-400">
                          {team.subtitle}
                        </span>
                        <h3 className="text-2xl md:text-4xl font-extrabold font-heading text-white">
                          {team.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {team.longDescription}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
                        KEY ACTIVITIES & WORKFLOWS
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {team.activities.map((act, i) => (
                          <li key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-gold-400" />
                        <span>HARDWARE & SOFTWARE STACK</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {team.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-md text-xs font-mono bg-navy-900 border border-amber-500/15 text-slate-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 lg:h-96 border border-amber-500/20">
                    <LazyImage
                      src={team.heroImage}
                      alt={team.name}
                      widthParam={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Core Leadership Section */}
        {activeTab === 'CORE' && (
          isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-10 h-10 rounded-full border-2 border-gold-500/20 border-t-gold-400 animate-spin" />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-16 glass-panel rounded-2xl border border-amber-500/20">
              <p className="text-slate-400 text-sm">No team members currently listed.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden bg-navy-900">
                    <LazyImage
                      src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'}
                      alt={member.name}
                      widthParam={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-gold-400">
                        {member.position}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {member.branch ? `${member.branch} • ` : ''}{member.year || ''}
                      </p>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{member.bio || ''}</p>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t border-amber-500/10">
                      {(member.socials?.instagram || member.instagramUrl) && (
                        <a
                          href={member.socials?.instagram || member.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-gold-400 transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {(member.socials?.linkedin || member.linkedinUrl) && (
                        <a
                          href={member.socials?.linkedin || member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-gold-400 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </PageLayout>
  );
};

