import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Copy, Check, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCV = () => {
    const text = `
==================================================
PROFESSIONAL CV SUMMARY
==================================================
Name: Senior Software Engineer & Brand Architect
Experience: 6+ Years Industry Experience
Award: KZN Tech Horizon 2026 — 2nd Winner 🏆
Certifications: Cisco Certified Network Associate

CORE SKILLS:
- Backend & Enterprise: C#, ASP.NET Core, REST Web APIs, Microservices
- Frontend: React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind
- Database: Microsoft SQL Server, PostgreSQL, Relational DB Management & Indexing
- Networking: Cisco CCNA, Routing & Switching, Security, Subnetting
- Visual Design: Graphic Design, Brand Identity Systems, Digital Art, UI/UX
- Retail & Client Experience: TFG Sales Associate Background (Customer Empathy)

SUMMARY:
6+ years of multidisciplinary software engineering and graphic design experience. Recognized as 2nd place winner in the KZN Tech Horizon 2026 competition for high-performance software architecture and brand design.
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-bold font-heading text-white">
                Professional Credentials &amp; Resume Summary
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-300 text-sm">
            
            {/* Profile Summary Header */}
            <div className="p-4 rounded-sm bg-zinc-950 border border-zinc-800 space-y-2">
              <h4 className="text-base font-bold font-heading text-white">
                Full-Stack Software Engineer &amp; Brand Architect
              </h4>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                6+ Years Industry Experience | KZN Tech Horizon 2026 (2nd Winner) | Cisco Certified
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed pt-1">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div>
              <h5 className="font-mono font-bold text-[10px] uppercase text-zinc-500 tracking-widest mb-3">
                Core Qualifications &amp; Tech Stack
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800">
                  <strong className="block text-white mb-1 uppercase text-[10px]">Software Engineering:</strong>
                  <span className="text-zinc-400 font-sans text-xs">C#, ASP.NET Core, React 19, TypeScript, JavaScript, REST APIs, Microservices</span>
                </div>
                <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800">
                  <strong className="block text-white mb-1 uppercase text-[10px]">Visual &amp; Brand Design:</strong>
                  <span className="text-zinc-400 font-sans text-xs">Graphic Design, Brand Identity Systems, Digital Art, Vector Illustration, UI/UX</span>
                </div>
                <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800">
                  <strong className="block text-white mb-1 uppercase text-[10px]">Database &amp; Storage:</strong>
                  <span className="text-zinc-400 font-sans text-xs">Relational SQL Server, PostgreSQL, Schema Architecture, Index Tuning</span>
                </div>
                <div className="p-3 rounded-sm bg-zinc-950 border border-zinc-800">
                  <strong className="block text-white mb-1 uppercase text-[10px]">Networking &amp; Retail:</strong>
                  <span className="text-zinc-400 font-sans text-xs">Cisco CCNA Certificates, TFG Sales Associate Background</span>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h5 className="font-mono font-bold text-[10px] uppercase text-zinc-500 tracking-widest mb-3">
                Key Accomplishments
              </h5>
              <ul className="space-y-2 text-xs font-sans text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">🏆</span>
                  <span><strong>2nd Place Winner (KZN Tech Horizon 2026):</strong> Recognized for high-performance software architecture and design excellence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-200">📜</span>
                  <span><strong>Cisco Certificates Held:</strong> Verified credentials in enterprise networking fundamentals, routing, and security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">🛍️</span>
                  <span><strong>TFG Retail Sales Associate Experience:</strong> Real-world commercial sales and customer relationship management background.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between font-mono">
            <button
              onClick={handleCopyCV}
              className="px-4 py-2 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={() => alert("Downloading Curriculum Vitae PDF document...")}
              className="px-5 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full CV (PDF)</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

