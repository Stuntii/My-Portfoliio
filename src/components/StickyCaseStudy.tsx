import React from 'react';
import { motion } from 'motion/react';
import { 
  UserCheck, 
  Sparkles, 
  Palette, 
  Code2, 
  Database, 
  Network, 
  Crown, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  Send,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';

export const StickyCaseStudy: React.FC = () => {
  return (
    <section id="about-introduction" className="py-24 bg-[#09090b] text-zinc-100 border-y border-zinc-800 transition-colors relative overflow-hidden">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,158,11,0.06),transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            PROFESSIONAL CREATOR PROFILE
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading uppercase">
            Ndumiso Shoba <br />
            <span className="text-amber-400 font-serif italic font-normal">&amp; Creative Discipline</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Frontend Designer &amp; UI Specialist available for freelance hire, Lead Graphic Designer for BrokeBoy_RichMind, and complete full-stack all-rounder.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Core Bio & Leadership Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-sm bg-zinc-950 text-white border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Background Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white text-black text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                    <Crown className="w-3.5 h-3.5 text-black" />
                    <span>LEAD GRAPHIC DESIGNER</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AVAILABLE FOR FREELANCE</span>
                  </div>
                </div>

                {/* Main Headline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white uppercase">
                    Frontend Designer <br />
                    <span className="text-amber-400">&amp; UI Specialist</span>
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider mt-1">
                    BrokeBoy_RichMind Lead Designer • Full-Stack Engineer
                  </p>
                </div>

                {/* Paragraph Overview */}
                <div className="space-y-4 text-zinc-300 text-sm leading-relaxed font-sans">
                  <p>
                    I am a versatile multi-disciplinary creator specializing in high-fidelity <strong className="text-white font-semibold">Frontend &amp; UI/UX Design</strong>, bespoke <strong className="text-white font-semibold">Brand Identity Architecture</strong>, and complete web systems.
                  </p>
                  <p>
                    Serving as the <strong className="text-amber-400 font-semibold">Lead Graphic Designer for BrokeBoy_RichMind</strong>, I shape the brand's visual identity, typography, and graphic assets while engineering robust web applications.
                  </p>
                  <p>
                    As an all-rounder, my technical foundation extends into complete backend microservices with <strong className="text-white font-semibold">C# / ASP.NET Core</strong>, relational databases (<strong className="text-white font-semibold">SQL Server &amp; PostgreSQL</strong>), and Cisco networking infrastructure.
                  </p>
                </div>

                {/* Key Experience Stats */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-sm bg-zinc-900 border border-zinc-800 text-center font-mono">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-amber-400">6+ YRS</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Industry Exp</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-white">100%</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Custom UI</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-emerald-400">C# + React</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Full Stack</span>
                  </div>
                </div>

              </div>

              {/* Contact CTA */}
              <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="text-xs font-mono text-zinc-400">
                  <span>KwaZulu-Natal / Remote</span>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>HIRE FOR FREELANCE</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Pillars of Expertise */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pillar 1: Frontend & UI Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-sm bg-zinc-950 border border-zinc-800 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">1. Frontend &amp; UI/UX Design</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  PRIMARY FOCUS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Crafting pixel-perfect, accessible, and high-performance user interfaces using React, TypeScript, Tailwind CSS, Motion micro-interactions, and custom design component systems.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                {['React', 'TypeScript', 'Tailwind CSS', 'Motion / Animations', 'Responsive Systems', 'Design Tokens'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pillar 2: Brand Identity & Graphic Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-sm bg-zinc-950 border border-zinc-800 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">2. Brand Identity &amp; Visual Design</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  BROKEBOY_RICHMIND LEAD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Directing brand aesthetics as Lead Graphic Designer for BrokeBoy_RichMind. Creating vector logo systems, color palettes, editorial layouts, and brand identity manuals.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                {['Brand Systems', 'Vector Logos', 'Editorial Layouts', 'Typography Pairing', 'Packaging Graphics'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pillar 3: C# ASP.NET Core & Database Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-sm bg-zinc-950 border border-zinc-800 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">3. C# ASP.NET Core &amp; Relational Databases</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  BACKEND LOGIC
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Architecting high-throughput REST API microservices in C# / ASP.NET Core, utilizing Entity Framework Core, SQL Server, and PostgreSQL with optimized query execution.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                {['C#', 'ASP.NET Core', 'SQL Server', 'PostgreSQL', 'RESTful APIs', 'EF Core'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pillar 4: Cisco Networking & Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-sm bg-zinc-950 border border-zinc-800 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">4. Network Engineering &amp; Systems</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  CISCO CERTIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Cisco-certified networking foundation including routing &amp; switching, VLAN configuration, enterprise network topology security, and server deployment.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                {['Cisco CCNA', 'Routing & Switching', 'VLANs / Subnetting', 'Server Deployment', 'Network Security'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
