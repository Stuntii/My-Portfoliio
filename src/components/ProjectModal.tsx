import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { LazyImage } from './LazyImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl overflow-y-auto my-auto flex flex-col"
        >
          {/* Top Sticky Bar */}
          <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-800">
                  {project.category}
                </span>
                {project.awardTag && (
                  <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-widest">
                    {project.awardTag}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-light font-heading text-white mt-1">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Image Banner */}
            <div className="rounded-sm overflow-hidden border border-zinc-800 bg-black flex items-center justify-center max-h-[60vh]">
              <LazyImage
                src={project.localImagePath}
                fallbackSrc={project.fallbackImageUrl}
                alt={project.title}
                aspectRatio="aspect-auto"
                objectFit="object-contain"
                className="max-h-[60vh] w-auto max-w-full"
              />
            </div>

            {/* Case Study Story */}
            <div className="space-y-3">
              <h4 className="text-base font-bold font-heading text-white uppercase tracking-wider">
                Project Overview &amp; Architecture Strategy
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {project.longCaseStudy || project.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-sm bg-zinc-950 border border-zinc-800 font-mono">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col text-center">
                    <span className="text-lg font-bold text-white">{m.value}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet if Available */}
            {project.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {project.codeSnippet.title}
                  </span>
                </div>
                <div className="p-4 rounded-sm bg-black text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <pre>{project.codeSnippet.code}</pre>
                </div>
              </div>
            )}

            {/* Highlights List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Key Accomplishments &amp; Technical Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-sm bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-sans flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="font-mono">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Technologies Used</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-sm text-[10px] bg-zinc-950 text-zinc-300 border border-zinc-800 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex items-center justify-end text-[10px] font-mono">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-sm bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

