import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Lightbulb, Clapperboard, SlidersHorizontal, Share2, Rocket } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'PLAN',
    desc: 'Define ideas and goals.',
    icon: Lightbulb,
  },
  {
    step: '02',
    title: 'CREATE',
    desc: 'Plan, film and produce.',
    icon: Clapperboard,
  },
  {
    step: '03',
    title: 'EDIT',
    desc: 'Review and refine content.',
    icon: SlidersHorizontal,
  },
  {
    step: '04',
    title: 'SHARE',
    desc: 'Publish and reach the audience.',
    icon: Share2,
  },
  {
    step: '05',
    title: 'IMPACT',
    desc: 'Inspire and make a difference.',
    icon: Rocket,
  },
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative bg-navy-950 border-t border-amber-500/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="WORKFLOW"
          title="FROM IDEA TO IMPACT"
          subtitle="How our team takes a spark of creative thought to finished cinema."
        />

        <div className="relative mt-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/10 via-gold-500/40 to-amber-500/10 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative p-6 glass-panel rounded-2xl border border-amber-500/20 shadow-card-dark hover:border-gold-400 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 border border-amber-500/30 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 mb-4 shadow-gold-glow">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono font-extrabold text-gold-400 tracking-widest uppercase">
                    STEP {item.step}
                  </span>

                  <h3 className="text-xl font-extrabold font-heading text-white mt-1 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    "{item.desc}"
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
