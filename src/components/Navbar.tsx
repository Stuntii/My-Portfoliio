import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, FolderSync, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenImageGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenImageGuide }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Introduction', href: '#about-introduction' },
    { name: 'BrokeBoy_RichMind', href: '#brand-designs' },
    { name: 'Art Gallery', href: '#art-exhibition' },
    { name: 'Stack', href: '#skills-matrix' },
    { name: 'Experience', href: '#experience' },
    { name: 'Playground', href: '#playground' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll Progress Bar */}
      <div className="h-[2px] w-full bg-zinc-900">
        <div
          className="h-full bg-white transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/90 py-3'
            : 'bg-[#09090b]/60 backdrop-blur-sm border-b border-zinc-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-sm bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs font-mono tracking-tighter">
              DEV
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base flex items-center gap-2 font-heading uppercase">
                NDUMISO SHOBA <span className="text-amber-400 font-mono text-xs">/ FREELANCE FOR HIRE</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.15em]">
                FRONTEND DESIGNER &amp; FULL-STACK ALL-ROUNDER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors hover:border-b hover:border-white pb-0.5"
              >
                {link.name}
              </a>
            ))}

            {/* Local Image Directory Helper Button */}
            <button
              onClick={onOpenImageGuide}
              className="px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all flex items-center gap-1.5"
              title="Open local image directory mapping & replacement guide"
            >
              <FolderSync className="w-3.5 h-3.5 text-zinc-400" />
              <span>[ Image Assets ]</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Theme"
              className="p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-300" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenImageGuide}
              className="p-2 rounded-sm text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1"
            >
              <FolderSync className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-zinc-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-zinc-200 hover:bg-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b] border-b border-zinc-800 px-4 pt-2 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-sm hover:bg-zinc-900 text-zinc-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

