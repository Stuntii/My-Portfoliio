import React from 'react';
import { ArrowUp, FolderSync } from 'lucide-react';

interface FooterProps {
  onOpenImageGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenImageGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090b] text-zinc-400 border-t border-zinc-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800">
          
          {/* Left Brand Summary */}
          <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-heading font-light text-white text-lg tracking-wider">
                C# .NET × BRAND DESIGN
              </span>
              <span className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-widest">
                KZN 2026 Winners 🏆
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Full-Stack Engineering (C#, ASP.NET, React, SQL) + Corporate Brand Design &amp; Digital Art
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-lg flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} Professional Portfolio. Built with React 19, Motion, and Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span>6+ Years Experience</span>
            <span>•</span>
            <span>Cisco Certified</span>
            <span>•</span>
            <span>TFG Sales Associate Alum</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

