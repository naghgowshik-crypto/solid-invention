import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Instagram } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { CORE_TEAM_MEMBERS } from '../../data/teamMembers';
import { LazyImage } from '../ui/LazyImage';

export const CoreTeamPreview: React.FC = () => {
  const featuredLeaders = CORE_TEAM_MEMBERS.slice(0, 4);

  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="LEADERSHIP"
          title="MEET THE PEOPLE BEHIND THE STORIES"
          subtitle="The student visionaries leading the creative and technical operations."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLeaders.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark hover:border-gold-500/40 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden bg-navy-900">
                <LazyImage
                  src={member.avatarUrl}
                  alt={member.name}
                  widthParam={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-gold-400">
                  {member.position}
                </span>
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-400">{member.branch} • {member.year}</p>

                <div className="flex items-center space-x-3 pt-3 border-t border-amber-500/10">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/teams"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-slate-100 bg-navy-900 border border-amber-500/30 hover:border-gold-400 hover:text-gold-400 transition-all group"
          >
            <span>MEET THE FULL TEAM</span>
            <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
