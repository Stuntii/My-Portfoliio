import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Award, Code2, Palette, ShieldCheck, ArrowRight, Download, Terminal, Layers, Upload, X, Image as ImageIcon, Quote, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenImageGuide: () => void;
}

const HERO_AVATAR_KEY = 'ndumiso_hero_avatar_image_v1';
const HERO_QUOTE_KEY = 'ndumiso_hero_quote_v1';
const DEFAULT_HERO_AVATAR = '/images/avatar.jpg';
const DEFAULT_HERO_QUOTE = 'Mindset over circumstance — designing functional art and architecture.';

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenImageGuide }) => {
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yBg = useTransform(scrollY, [0, 600], [0, 150]);
  const yForeground = useTransform(scrollY, [0, 600], [0, -60]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.4]);

  // Custom Avatar Image State
  const [avatarImage, setAvatarImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(HERO_AVATAR_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to load saved hero avatar image:', e);
    }
    return DEFAULT_HERO_AVATAR;
  });

  // Custom Quote State
  const [heroQuote, setHeroQuote] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(HERO_QUOTE_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to load hero quote:', e);
    }
    return DEFAULT_HERO_QUOTE;
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [quoteInput, setQuoteInput] = useState<string>(heroQuote);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Save image to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HERO_AVATAR_KEY, avatarImage);
    } catch (e) {
      console.error('Failed to store hero avatar image:', e);
    }
  }, [avatarImage]);

  // Save quote to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HERO_QUOTE_KEY, heroQuote);
    } catch (e) {
      console.error('Failed to store hero quote:', e);
    }
  }, [heroQuote]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = (e: React.FormEvent) => {
    e.preventDefault();

    setIsUploading(true);
    if (previewUrl) {
      setAvatarImage(previewUrl);
    }
    if (quoteInput.trim()) {
      setHeroQuote(quoteInput.trim());
    }
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploading(false);
      setUploadModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }, 600);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#09090b] text-zinc-100 transition-colors">
      {/* Parallax Background Ambient Grid */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,_#1c1c1f_0%,_transparent_70%)] opacity-80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </motion.div>

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              {/* Winner & Freelance Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
                  <Award className="w-3.5 h-3.5 text-black" />
                  <span>Digital/Physical art + Web Developer</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FREELANCER FOR HIRE</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-light leading-[0.95] tracking-tight text-white font-heading"
              >
                Frontend Designer <br />
                <span className="text-zinc-500 italic font-serif">&amp; Full-Stack</span> All-Rounder.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-zinc-300 max-w-xl text-sm sm:text-base leading-relaxed font-sans"
              >
                Mainly a <strong className="text-white font-semibold">Frontend Designer &amp; UI Specialist</strong> available for freelance hire. As an experienced all-rounder, I also engineer robust <strong className="text-white font-semibold">backend logic, C# ASP.NET Core APIs, relational databases</strong>, and Cisco networking solutions.
              </motion.p>
            </div>

            {/* Key Skill Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { label: 'C# / ASP.NET CORE', icon: Terminal },
                { label: 'REACT / TYPESCRIPT', icon: Code2 },
                { label: 'BRANDING / GRAPHIC', icon: Palette },
                { label: 'DATABASE MGMT / SQL', icon: Layers },
                { label: 'CISCO CCNA CERTIFIED', icon: ShieldCheck }
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  <tag.icon className="w-3 h-3 text-zinc-400" />
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects-gallery"
                className="px-6 py-3 rounded-sm bg-white text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2 group"
              >
                <span>Explore Showcase</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80 w-full"
            >
              {PERSONAL_INFO.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Hero Interactive Visual Card (Parallax Foreground) */}
          <motion.div
            style={{ y: yForeground }}
            className="lg:col-span-5 relative flex flex-col justify-between"
          >
            <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-sm space-y-6 flex-grow flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 font-mono">
                    System Architecture &amp; Identity
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Available
                  </span>
                </div>

                {/* Avatar with Upload Support, Orange Gradient Filter & Overlay Quote */}
                <div className="relative rounded-sm overflow-hidden mb-6 aspect-square bg-zinc-950 border border-zinc-800 group">
                  <img
                    src={avatarImage}
                    alt="Developer and Designer Portfolio Avatar"
                    className="object-cover w-full h-full filter brightness-[0.88] contrast-[1.05] hover:brightness-100 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/avatar.svg';
                    }}
                  />
                  
                  {/* Subtle Warm Accent Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/12 via-orange-500/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />

                  {/* Small Quote On Top of the Gradient Orange Filter */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-sm bg-black/80 border border-amber-500/40 backdrop-blur-md space-y-1 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                        <Quote className="w-3 h-3 text-amber-400" />
                        <span>lytg</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    </div>
                    <p className="text-zinc-100 text-[11px] font-sans italic leading-snug">
                      "{heroQuote}"
                    </p>
                  </div>


                </div>
              </div>

              {/* Competency Bars */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">C# / ASP.NET CORE</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-zinc-800" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">REACT / TYPESCRIPT</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">DATABASE MGMT / SQL</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-zinc-800" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-300">BRANDING / GRAPHIC</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>[ CISCO CERTIFIED ]</span>
                <span>[ TFG ASSOCIATE ]</span>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Hero Avatar Image Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 max-w-lg w-full text-zinc-100 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setUploadModalOpen(false);
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className="absolute top-4 right-4 p-1 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Upload your custom image for the hero profile card. The brand announcement filter (<span className="text-amber-400 font-mono">70% Brightness / 1.1 Contrast</span>) will automatically be applied.
              </p>

              <form onSubmit={handleSaveAvatar} className="space-y-6">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileSelect(e.dataTransfer.files[0]);
                    }
                  }}
                  className="border-2 border-dashed border-zinc-700 hover:border-amber-400/60 rounded-sm p-6 text-center bg-zinc-950/50 transition-colors cursor-pointer relative"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-sm overflow-hidden mb-3 border border-zinc-700 bg-black">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.1]"
                        />
                      </div>
                      <span className="text-xs text-amber-400 font-mono font-bold">
                        {selectedFile?.name || 'Custom Image Selected'}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-1">
                        Click or drag to replace
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                      <span className="text-xs font-mono text-zinc-300 font-bold uppercase">
                        CLICK OR DRAG IMAGE HERE
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 mt-1">
                        Supports PNG, JPG, WEBP, SVG
                      </span>
                    </div>
                  )}
                </div>

                {/* Custom Quote Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Quote className="w-3 h-3 text-amber-400" />
                    <span>QUOTE ON GRADIENT FILTER OVERLAY</span>
                  </label>
                  <input
                    type="text"
                    value={quoteInput}
                    onChange={(e) => setQuoteInput(e.target.value)}
                    placeholder="Enter statement or quote..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-3 py-2 text-xs text-zinc-100 font-sans focus:outline-none focus:border-amber-400/80 transition-colors"
                  />
                </div>

                {/* Filter Info */}
                <div className="p-3 bg-zinc-950 rounded-sm border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>FILTER PRESET:</span>
                  <span className="text-amber-400 font-bold">BRAND GRADIENT ORANGE + QUOTE OVERLAY</span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadModalOpen(false);
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setQuoteInput(heroQuote);
                    }}
                    className="px-4 py-2 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={(!previewUrl && quoteInput === heroQuote) || isUploading}
                    className="px-5 py-2 rounded-sm bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isUploading ? (
                      <span>SAVING...</span>
                    ) : uploadSuccess ? (
                      <span>APPLIED!</span>
                    ) : (
                      <span>UPDATE AVATAR & QUOTE</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

