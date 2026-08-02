import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Award, ShieldCheck, ShoppingBag, CheckCircle, MapPin } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'certification':
        return <ShieldCheck className="w-4 h-4 text-zinc-200" />;
      case 'retail-sales':
        return <ShoppingBag className="w-4 h-4 text-zinc-300" />;
      default:
        return <Briefcase className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#09090b] text-zinc-100 transition-colors border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
            PROVEN WORK HISTORY &amp; QUALIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-heading">
            Work Experience &amp; <br />
            <span className="text-zinc-500 italic font-serif">Certified Qualifications</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto">
            A comprehensive journey from TFG retail sales customer empathy, to Cisco network certification, to winning 2nd Place at KZN Tech Horizon 2026.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {EXPERIENCE_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-sm bg-zinc-900 border border-zinc-700 shadow-md flex items-center justify-center z-10 my-2 sm:my-0">
                    {getItemIcon(item.type)}
                  </div>

                  {/* Content Card */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)] p-6 rounded-sm bg-zinc-900 border border-zinc-800 shadow-xl space-y-3 hover:border-zinc-700 transition-colors ml-12 sm:ml-0">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono">
                      <span className="px-2.5 py-1 rounded-sm text-[10px] font-bold bg-zinc-950 text-zinc-300 border border-zinc-800 uppercase tracking-widest">
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" /> {item.location}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-zinc-400">
                        {item.company}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                      {item.keyAchivements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs font-sans text-zinc-300">
                          <CheckCircle className="w-3.5 h-3.5 text-zinc-100 mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-sm text-[10px] bg-zinc-950 text-zinc-400 border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

