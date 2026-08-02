import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Upload, 
  Crown, 
  CheckCircle2, 
  Image as ImageIcon, 
  X, 
  Palette, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { AvantGardeText } from './SlantedA';

const ANNOUNCEMENT_IMAGE_KEY = 'brokeboy_richmind_announcement_img_v1';

// Elegant default background image while waiting for user upload
const DEFAULT_ANNOUNCEMENT_IMAGE = '/images/project-brand-identity.jpg';

export const BrandDesignsShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth Y translation for image parallax
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);

  // Image State
  const [announcementImage, setAnnouncementImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENT_IMAGE_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to load saved announcement image:', e);
    }
    return DEFAULT_ANNOUNCEMENT_IMAGE;
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Save image to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ANNOUNCEMENT_IMAGE_KEY, announcementImage);
    } catch (e) {
      console.error('Failed to store announcement image:', e);
    }
  }, [announcementImage]);

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

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    setIsUploading(true);

    // Optional API upload
    try {
      const fileName = selectedFile?.name || `brokeboy_richmind_${Date.now()}.png`;
      await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          base64Data: previewUrl,
          title: 'BrokeBoy_RichMind Lead Graphic Designer Announcement',
          medium: 'Brand Identity',
          year: '2026'
        })
      });
    } catch (err) {
      console.warn('Backend image upload endpoint optional warning:', err);
    }

    setAnnouncementImage(previewUrl);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploading(false);
      setUploadModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl('');
    }, 800);
  };

  return (
    <section id="brand-designs" ref={containerRef} className="py-24 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Decorative Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-amber-400 uppercase tracking-widest shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>LEAD GRAPHIC DESIGNER ANNOUNCEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-avantgarde uppercase text-white">
              <AvantGardeText text="Official Brand Announcement" />
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              Official creative leadership role, visual direction, and brand architecture.
            </p>
          </div>


        </div>

        {/* High-Impact Parallax Announcement Card */}
        <div className="relative rounded-sm border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl min-h-[500px] sm:min-h-[560px] flex flex-col justify-end">
          
          {/* Parallax Background Image Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              style={{ y: yParallax, scale: scaleParallax }}
              className="absolute -inset-y-12 -inset-x-4 w-[108%] h-[125%] bg-zinc-900"
            >
              <img
                src={announcementImage}
                alt="BrokeBoy_RichMind Lead Graphic Designer"
                className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.1] transition-all duration-700"
                onError={(e) => {
                  // Fallback if image path broken
                  (e.target as HTMLImageElement).src = DEFAULT_ANNOUNCEMENT_IMAGE;
                }}
              />
            </motion.div>

            {/* Gradient Overlays for Superior Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_60%)]" />
          </div>



          {/* Text Content Overlay Layer (Positioned Above the Parallax Image) */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 space-y-6 max-w-4xl">
            
            {/* Title & Organization Pill */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL ROLE & CREATIVE LEADERSHIP</span>
              </div>

              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-avantgarde tracking-tight text-white leading-none">
                <span className="text-amber-400">Lead Graphic Designer</span>
                <br />
                <span className="text-white">for BrokeBoy_RichMind</span>
              </h3>
            </div>

            {/* Official Announcement Statement */}
            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed font-sans max-w-2xl font-normal drop-shadow-sm">
              Proud to announce my role as the <strong className="text-amber-400 font-semibold">Lead Graphic Designer for BrokeBoy_RichMind</strong>. Architecting bespoke visual brand identities, high-impact creative direction, vector logo systems, and editorial graphic design.
            </p>

            {/* Capability Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-sm bg-zinc-900/90 border border-zinc-700/80 text-zinc-200 flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Creative Direction</span>
              </div>
              <div className="px-3 py-1.5 rounded-sm bg-zinc-900/90 border border-zinc-700/80 text-zinc-200 flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Brand Identity Architecture</span>
              </div>
              <div className="px-3 py-1.5 rounded-sm bg-zinc-900/90 border border-zinc-700/80 text-zinc-200 flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Typography & Layout Systems</span>
              </div>
            </div>

          </div>

          {/* Bottom Accent Bar */}
          <div className="relative z-10 px-6 sm:px-10 py-3 bg-zinc-950/90 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL APPOINTMENT • BROKEBOY_RICHMIND</span>
            </span>
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              2026 EDITION
            </span>
          </div>

        </div>

      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-sm w-full max-w-lg text-white shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    UPLOAD BROKEBOY_RICHMIND IMAGE
                  </h3>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 rounded-sm bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveImage} className="p-6 space-y-5 font-mono text-xs">
                
                <div className="space-y-2">
                  <label className="block text-zinc-400 uppercase tracking-wider">
                    Select Graphic Design Image for Announcement
                  </label>

                  <div className="border-2 border-dashed border-zinc-800 hover:border-amber-400 rounded-sm p-6 text-center bg-zinc-900/40 relative cursor-pointer transition-colors">
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
                      <div className="space-y-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded border border-zinc-800 object-cover"
                        />
                        <p className="text-emerald-400 text-[11px] font-bold">✓ Ready to Apply as Announcement Parallax Image</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-zinc-400">
                        <ImageIcon className="w-8 h-8 text-amber-400 mx-auto" />
                        <p className="text-white font-bold">Click or Drag &amp; Drop Image Here</p>
                        <p className="text-[10px] text-zinc-500">PNG, JPG, WEBP, SVG supported</p>
                      </div>
                    )}
                  </div>
                </div>

                {uploadSuccess && (
                  <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-center font-bold">
                    ✓ Announcement Image Successfully Updated!
                  </div>
                )}

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-sm bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!previewUrl || isUploading}
                    className="px-6 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-40"
                  >
                    {isUploading ? 'Saving...' : 'Apply Announcement Image'}
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
