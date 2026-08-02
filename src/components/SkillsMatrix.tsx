import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Database, Network, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categoryIcons = [Code2, Palette, Database, Network];

  return (
    <section id="skills-matrix" className="py-24 bg-[#09090b] text-zinc-100 transition-colors border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            TECHNICAL &amp; DESIGN COMPETENCY MATRIX
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-heading">
            Technical Stack &amp; <br />
            <span className="text-zinc-500 italic font-serif">Creative Design Proficiency</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto">
            6+ years in software engineering, database management, Cisco networking, graphic design, and brand architecture.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Code2;
            const isActive = activeCategoryIndex === idx;

            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-4 py-2.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <div className="p-8 rounded-sm bg-zinc-900 border border-zinc-800 shadow-2xl">
          
          <div className="mb-8 border-b border-zinc-800 pb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {SKILL_CATEGORIES[activeCategoryIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
              {SKILL_CATEGORIES[activeCategoryIndex].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-5 rounded-sm bg-[#09090b] border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                    {skill.name}
                    {skill.highlight && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-mono bg-white text-black font-bold uppercase tracking-widest">
                        Primary
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {skill.experience}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-zinc-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

