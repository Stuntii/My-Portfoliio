import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Maximize2, 
  Eye, 
  Plus, 
  X, 
  Image as ImageIcon, 
  Check, 
  Trash2, 
  Sparkles, 
  Share2, 
  Grid,
  Tag,
  AlertCircle,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FolderSync
} from 'lucide-react';
import { ArtworkPiece } from '../types';
import { LazyImage } from './LazyImage';
import { AvantGardeText } from './SlantedA';
import Masonry, { MasonryItem } from './Masonry';
import { EXHIBITION_DEFAULT_ARTWORKS, EXHIBITION_IMAGE_CONFIGS } from '../data/exhibitionData';

const LOCAL_STORAGE_KEY = 'ndumiso_uploaded_artworks_v3';

export const ArtExhibition: React.FC = () => {
  // Load initial artworks from localStorage or fallback to 20 default Bleach & MangaArt artworks
  const [artworks, setArtworks] = useState<ArtworkPiece[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved artworks:', e);
    }
    return EXHIBITION_DEFAULT_ARTWORKS;
  });

  const [activeArtwork, setActiveArtwork] = useState<ArtworkPiece | null>(null);
  const [fullScreenZoom, setFullScreenZoom] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [gitGuideModalOpen, setGitGuideModalOpen] = useState(false);
  const [spotlightMode, setSpotlightMode] = useState<'dark' | 'spotlight' | 'white'>('spotlight');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Form State for uploading new images
  const [newArt, setNewArt] = useState({
    title: '',
    medium: 'Digital Photography & Artwork',
    year: new Date().getFullYear().toString(),
    dimensions: '3840 x 2160 px',
    description: '',
    imagePath: '',
    previewUrl: '',
    tagsString: 'Uploaded Image, Portfolio'
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load initial artworks from backend API (/api/artworks) or fallback to localStorage / defaults
  useEffect(() => {
    async function loadArtworks() {
      try {
        const res = await fetch('/api/artworks');
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success && Array.isArray(data.artworks) && data.artworks.length > 0) {
            setArtworks(data.artworks);
            return;
          }
        }
      } catch (e) {
        console.warn('Backend API not available or error fetching artworks:', e);
      }

      // Fallback to local storage
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArtworks(parsed);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved artworks:', e);
      }

      setArtworks(EXHIBITION_DEFAULT_ARTWORKS);
    }

    loadArtworks();
  }, []);

  // Sync to localStorage whenever artworks change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(artworks));
    } catch (e) {
      console.error('Failed to save artworks to localStorage:', e);
    }
  }, [artworks]);

  // Extract all unique tags across uploaded artworks
  const allTags = Array.from(
    new Set(artworks.flatMap(art => art.tags || []))
  );

  // Filtered artworks
  const filteredArtworks = artworks.filter(art => {
    if (selectedTag === 'all') return true;
    return art.tags?.includes(selectedTag);
  });

  // Masonry items for GSAP layout
  const masonryItems: MasonryItem[] = useMemo(() => {
    return filteredArtworks.map((art, index) => {
      const heights = [460, 600, 520, 680, 480, 580, 640];
      const height = heights[index % heights.length];
      return {
        id: art.id,
        img: art.imagePath,
        height,
        title: art.title,
        original: art
      };
    });
  }, [filteredArtworks]);

  // Handle local file selection
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, SVG, etc.).');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setNewArt(prev => ({
          ...prev,
          previewUrl: result,
          imagePath: result,
          title: prev.title || file.name.replace(/\.[^/.]+$/, "")
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = newArt.previewUrl || newArt.imagePath;
    if (!newArt.title || !finalImage) {
      alert('Please provide a title and select an image file.');
      return;
    }

    setIsUploading(true);

    try {
      // Send image to backend server to save physically into /public/images directory
      const fileName = selectedFile?.name || `${newArt.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`;
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          base64Data: finalImage,
          title: newArt.title,
          medium: newArt.medium,
          year: newArt.year,
          dimensions: newArt.dimensions,
          description: newArt.description,
          tags: newArt.tagsString
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.artwork) {
          setArtworks(prev => [data.artwork, ...prev]);
          setUploadSuccess(true);
          setTimeout(() => {
            setUploadSuccess(false);
            setUploadModalOpen(false);
            setIsUploading(false);
            setSelectedFile(null);
            setNewArt({
              title: '',
              medium: 'Digital Photography & Artwork',
              year: new Date().getFullYear().toString(),
              dimensions: '3840 x 2160 px',
              description: '',
              imagePath: '',
              previewUrl: '',
              tagsString: 'Uploaded Image, Portfolio'
            });
          }, 1000);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend upload failed, utilizing client storage:', err);
    }

    // Fallback if backend API is not available
    const tagsArray = newArt.tagsString
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const piece: ArtworkPiece = {
      id: `uploaded-art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: newArt.title.toUpperCase(),
      medium: newArt.medium || 'Custom Image Upload',
      year: newArt.year || new Date().getFullYear().toString(),
      dimensions: newArt.dimensions || 'Original Dimensions',
      imagePath: finalImage,
      fallbackImageUrl: finalImage,
      description: newArt.description || 'Personal image uploaded by user.',
      tags: tagsArray.length > 0 ? tagsArray : ['Uploaded'],
      featured: true
    };

    setArtworks(prev => [piece, ...prev]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setIsUploading(false);
      setSelectedFile(null);
      setNewArt({
        title: '',
        medium: 'Digital Photography & Artwork',
        year: new Date().getFullYear().toString(),
        dimensions: '3840 x 2160 px',
        description: '',
        imagePath: '',
        previewUrl: '',
        tagsString: 'Uploaded Image, Portfolio'
      });
    }, 1000);
  };

  const handleDeleteArtwork = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to remove this uploaded image?')) {
      try {
        await fetch(`/api/artworks/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Failed to delete artwork on server:', err);
      }
      setArtworks(prev => prev.filter(art => art.id !== id));
      if (activeArtwork?.id === id) {
        setActiveArtwork(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all uploaded images?')) {
      setArtworks([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setActiveArtwork(null);
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm('Reset exhibition gallery to all 20 Bleach & MangaArt images (#1 to #20)?')) {
      setArtworks(EXHIBITION_DEFAULT_ARTWORKS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(EXHIBITION_DEFAULT_ARTWORKS));
      setActiveArtwork(null);
    }
  };

  return (
    <section id="art-exhibition" className="py-24 bg-[#09090b] text-zinc-100 border-b border-zinc-800 relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>BLEACH &amp; MANGAART EXHIBITION • 20 PRE-SET IMAGES</span>
            </div>

            <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight uppercase font-avantgarde">
              <AvantGardeText text="MANGA ART" /> <br />
              <span className="text-amber-400 font-light font-heading italic text-2xl sm:text-5xl">Bleach &amp; MangaArt Collection</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              20 Exhibition slots pre-configured for Bleach &amp; MangaArt images (<code className="text-amber-300 font-mono">image-1.jpg</code> to <code className="text-amber-300 font-mono">image-20.jpg</code>). Simply drop your images into <code className="text-zinc-200 font-mono">/public/images/</code> via Git to update them instantly!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setGitGuideModalOpen(true)}
              className="px-3.5 py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-wider border border-amber-500/30 hover:border-amber-400 transition-colors flex items-center gap-1.5 shadow-lg"
              title="View all 20 image filenames and Git paths"
            >
              <FolderSync className="w-3.5 h-3.5" />
              <span>Git Filenames Guide</span>
            </button>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-3.5 py-2.5 rounded-sm bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </button>

            <button
              onClick={handleRestoreDefaults}
              className="px-3 py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider border border-zinc-800 transition-colors flex items-center gap-1.5"
              title="Reset gallery to default 20 Bleach & MangaArt images"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Reset 20 Images</span>
            </button>

            {artworks.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-2.5 rounded-sm bg-zinc-950 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-red-900/50 transition-colors flex items-center gap-1.5"
                title="Clear gallery"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

        </div>

        {/* Filter Bar if images exist */}
        {artworks.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800 font-mono text-[10px]">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all border ${
                  selectedTag === 'all'
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                ALL UPLOADS ({artworks.length})
              </button>

              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all border ${
                    selectedTag === tag
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="text-zinc-500 uppercase tracking-widest">
              SHOWING {filteredArtworks.length} OF {artworks.length} IMAGES
            </div>
          </div>
        )}

        {/* Gallery Content or Empty Dropzone State */}
        {artworks.length === 0 ? (
          /* Empty State - Prompts user to upload */
          <div className="w-full my-6 p-10 sm:p-16 rounded-sm bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-amber-400/60 transition-all duration-300 text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white uppercase font-avantgarde tracking-tight">
                No Uploaded Images Yet
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Click below to upload artwork, posters, photography, or graphic designs from your device.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-6 py-3 rounded-sm bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Artwork Now</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-zinc-600">
              SUPPORTS PNG, JPG, WEBP, SVG • INSTANT LOCAL PERSISTENCE
            </div>

          </div>
        ) : (
          /* Uploaded Artworks Masonry Gallery */
          <div className="w-full">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.96}
              blurToFocus
              colorShiftOnHover={false}
              onItemClick={(item) => setActiveArtwork(item.original)}
            />
          </div>
        )}

      </div>

      {/* Lightbox Artwork Inspection Modal */}
      <AnimatePresence>
        {activeArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Bar */}
              <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-20 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-sm bg-zinc-900 text-amber-400 border border-zinc-800 text-[10px] uppercase font-bold">
                    UPLOADED ITEM
                  </span>
                  <span className="text-white font-bold hidden sm:inline uppercase">
                    {activeArtwork.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-sm text-[10px]">
                    <button
                      onClick={() => setSpotlightMode('spotlight')}
                      className={`px-2 py-0.5 rounded-sm ${spotlightMode === 'spotlight' ? 'bg-white text-black font-bold' : 'text-zinc-400'}`}
                    >
                      SPOTLIGHT
                    </button>
                    <button
                      onClick={() => setSpotlightMode('dark')}
                      className={`px-2 py-0.5 rounded-sm ${spotlightMode === 'dark' ? 'bg-white text-black font-bold' : 'text-zinc-400'}`}
                    >
                      DARKROOM
                    </button>
                    <button
                      onClick={() => setSpotlightMode('white')}
                      className={`px-2 py-0.5 rounded-sm ${spotlightMode === 'white' ? 'bg-white text-black font-bold' : 'text-zinc-400'}`}
                    >
                      WHITE CUBE
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveArtwork(null)}
                    className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
                <div className={`lg:col-span-8 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[50vh] transition-colors ${
                  spotlightMode === 'white'
                    ? 'bg-zinc-100 text-black'
                    : spotlightMode === 'spotlight'
                    ? 'bg-gradient-to-b from-zinc-900 via-black to-zinc-950'
                    : 'bg-black'
                }`}>
                  <div className="relative max-w-full max-h-[68vh] shadow-2xl border border-zinc-800/80 overflow-hidden flex items-center justify-center rounded-sm bg-black/40 group">
                    <img
                      src={activeArtwork.imagePath}
                      alt={activeArtwork.title}
                      className="max-h-[65vh] max-w-full w-auto h-auto object-contain cursor-zoom-in transition-transform duration-300"
                      onClick={() => setFullScreenZoom(true)}
                    />
                    <button
                      onClick={() => setFullScreenZoom(true)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-sm bg-black/85 hover:bg-black text-white text-[10px] font-mono border border-zinc-700 opacity-90 hover:opacity-100 transition-all flex items-center gap-1.5 shadow-xl"
                      title="Click for full-screen uncropped zoom"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>FULLSCREEN ZOOM</span>
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2">
                    FULL UNCROPPED VIEW • CLICK IMAGE FOR FULLSCREEN DETAILED ZOOM
                  </span>
                </div>

                {/* Plaque Metadata Column */}
                <div className="lg:col-span-4 p-6 bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-800 space-y-6 font-mono flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase tracking-widest block font-bold">ARTWORK PLAQUE</span>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight font-avantgarde mt-1">
                        <AvantGardeText text={activeArtwork.title} />
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                        {activeArtwork.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs">
                      <div className="flex justify-between py-1 border-b border-zinc-900">
                        <span className="text-zinc-500 uppercase text-[10px]">MEDIUM</span>
                        <span className="text-zinc-300 text-[11px] text-right">{activeArtwork.medium}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-900">
                        <span className="text-zinc-500 uppercase text-[10px]">YEAR</span>
                        <span className="text-white">{activeArtwork.year}</span>
                      </div>
                      {activeArtwork.dimensions && (
                        <div className="flex justify-between py-1 border-b border-zinc-900">
                          <span className="text-zinc-500 uppercase text-[10px]">DIMENSIONS</span>
                          <span className="text-zinc-400 text-[11px]">{activeArtwork.dimensions}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">TAGS</span>
                      <div className="flex flex-wrap gap-1">
                        {activeArtwork.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-2">
                    <button
                      onClick={() => handleDeleteArtwork(activeArtwork.id)}
                      className="w-full py-2 rounded-sm bg-red-950/60 hover:bg-red-900 text-red-200 font-bold text-xs uppercase tracking-wider border border-red-900/50 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Uploaded Image</span>
                    </button>
                    <button
                      onClick={() => setActiveArtwork(null)}
                      className="w-full py-2 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs uppercase tracking-wider border border-zinc-800"
                    >
                      Close View
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Uncropped Zoom Overlay */}
      <AnimatePresence>
        {fullScreenZoom && activeArtwork && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between font-mono text-xs text-zinc-300 bg-zinc-950/90 p-3 sm:p-4 rounded-sm border border-zinc-800 backdrop-blur-md z-10 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-sm bg-amber-400 text-black font-bold text-[10px] uppercase tracking-wider">
                  FULL UNCLIPPED ZOOM
                </span>
                <span className="font-bold text-white uppercase hidden sm:inline">
                  {activeArtwork.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-500 hidden md:inline uppercase tracking-widest">
                  Showing Full Aspect Ratio (100% Uncropped)
                </span>
                <button
                  onClick={() => setFullScreenZoom(false)}
                  className="px-3.5 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase flex items-center gap-1.5 border border-zinc-700 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4 text-amber-400" />
                  <span>Exit Zoom</span>
                </button>
              </div>
            </div>

            {/* Scrollable Center Image Canvas */}
            <div className="w-full h-full my-4 flex items-center justify-center overflow-auto p-2">
              <img
                src={activeArtwork.imagePath}
                alt={activeArtwork.title}
                className="max-h-[85vh] max-w-[95vw] w-auto h-auto object-contain rounded-sm border border-zinc-800/80 shadow-2xl"
              />
            </div>

            {/* Bottom Bar */}
            <div className="w-full text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-950/80 py-2 rounded-sm border border-zinc-900">
              Original Resolution: {activeArtwork.dimensions || 'Full Aspect Ratio'} • Press Exit or Close to Return
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl overflow-hidden font-mono"
            >
              <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Upload Custom Image / Artwork
                  </h3>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddArtwork} className="p-6 space-y-4">
                {uploadSuccess ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-sm bg-amber-400 text-black flex items-center justify-center mx-auto font-bold">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white uppercase">
                      Image Added to Gallery!
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans">
                      Your artwork is now published and saved in your gallery.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">
                        Image / Artwork Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MY BRAND CONCEPT POSTER"
                        value={newArt.title}
                        onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-950 border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">
                        Select Image File (or Drag &amp; Drop) *
                      </label>
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`p-5 rounded-sm bg-zinc-950 border border-dashed transition-colors text-center space-y-2 relative ${
                          isDraggingOver ? 'border-amber-400 bg-amber-500/5' : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {newArt.previewUrl ? (
                          <div className="space-y-2">
                            <img
                              src={newArt.previewUrl}
                              alt="Preview"
                              className="max-h-40 mx-auto rounded-sm border border-zinc-800 object-contain"
                            />
                            <p className="text-[10px] text-amber-400 font-bold">File loaded &amp; ready to add</p>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-zinc-500 mx-auto" />
                            <p className="text-xs text-zinc-300">Click to attach image file from your device</p>
                            <p className="text-[10px] text-zinc-500">Supports PNG, JPG, WEBP, SVG</p>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">
                          Medium / Category
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Digital Design"
                          value={newArt.medium}
                          onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                          className="w-full px-3 py-2 rounded-sm bg-zinc-950 border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          placeholder="Poster, Brand, 3D"
                          value={newArt.tagsString}
                          onChange={(e) => setNewArt({ ...newArt, tagsString: e.target.value })}
                          className="w-full px-3 py-2 rounded-sm bg-zinc-950 border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">
                        Description / Concept Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Optional description of this artwork..."
                        value={newArt.description}
                        onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-sm bg-zinc-950 border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setUploadModalOpen(false)}
                        className="px-4 py-2 rounded-sm bg-zinc-900 text-zinc-400 hover:text-white text-xs uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="px-5 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider disabled:opacity-50 flex items-center gap-2"
                      >
                        {isUploading ? (
                          <>
                            <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>SAVING TO /public/images/...</span>
                          </>
                        ) : (
                          <span>Add to Gallery</span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Git Filenames & Image Mapping Guide Modal */}
      <AnimatePresence>
        {gitGuideModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl overflow-hidden font-mono flex flex-col max-h-[88vh]"
            >
              {/* Header */}
              <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <FolderSync className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Exhibition Images Git Reference Guide (1 to 20)
                  </h3>
                </div>
                <button
                  onClick={() => setGitGuideModalOpen(false)}
                  className="p-1 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions Banner */}
              <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono space-y-1">
                <p>
                  📸 <strong>How to add or replace your 20 Bleach &amp; MangaArt images in Git:</strong>
                </p>
                <p className="text-zinc-400 text-[11px]">
                  1. Place your 20 image files into the folder <code className="text-amber-400 font-bold">/public/images/</code>.
                </p>
                <p className="text-zinc-400 text-[11px]">
                  2. Name them strictly <code className="text-amber-400 font-bold">image-1.jpg</code>, <code className="text-amber-400 font-bold">image-2.jpg</code> ... up to <code className="text-amber-400 font-bold">image-20.jpg</code>.
                </p>
                <p className="text-zinc-400 text-[11px]">
                  3. To edit image titles, tags, or years in code, edit <code className="text-amber-300">src/data/exhibitionData.ts</code>.
                </p>
              </div>

              {/* Scrollable Table */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest bg-zinc-950">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Exhibition Title</th>
                        <th className="py-2.5 px-3">Target Filename</th>
                        <th className="py-2.5 px-3">Git Directory Path</th>
                        <th className="py-2.5 px-3">Tags</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-sans">
                      {EXHIBITION_IMAGE_CONFIGS.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                            #{item.num}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-white">
                            {item.title}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-amber-300 font-bold">
                            {item.filename}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-zinc-400 text-[11px]">
                            {item.gitPath}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map(t => (
                                <span key={t} className="px-1.5 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center font-mono text-xs">
                <span className="text-[10px] text-zinc-500 uppercase">
                  All 20 exhibition slots active in gallery
                </span>
                <button
                  onClick={() => setGitGuideModalOpen(false)}
                  className="px-5 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close Guide
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
