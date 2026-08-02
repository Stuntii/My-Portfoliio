import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FolderSync, Image as ImageIcon } from 'lucide-react';
import { LOCAL_IMAGE_MAPPING_GUIDE } from '../data/portfolioData';

interface ImageGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGuideDrawer: React.FC<ImageGuideDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-3xl max-h-[85vh] bg-[#09090b] text-zinc-100 border border-zinc-800 rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-zinc-900 text-white border border-zinc-800">
                  <FolderSync className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">
                    Local Image Assets Directory Guide
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Directory: <code className="text-zinc-200">/public/images/</code>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Banner */}
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
              💡 <strong>How to replace images locally:</strong> Drop your image into <code className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-sm text-white">/public/images/</code> and match the target filename below (e.g. <code className="text-zinc-200">avatar.jpg</code>).
            </div>

            {/* Table of Assets */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                      <th className="py-2 px-3">Filename</th>
                      <th className="py-2 px-3">Used For</th>
                      <th className="py-2 px-3">Recommended Dimensions</th>
                      <th className="py-2 px-3 text-right">Local Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 font-sans">
                    {LOCAL_IMAGE_MAPPING_GUIDE.map((item) => (
                      <tr key={item.filename} className="hover:bg-zinc-900/50">
                        <td className="py-3 px-3 font-mono font-bold text-white flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                          {item.filename}
                        </td>
                        <td className="py-3 px-3 text-zinc-300">
                          {item.usedFor}
                        </td>
                        <td className="py-3 px-3 text-zinc-500 font-mono text-[10px]">
                          {item.aspectRatio}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-zinc-500 text-[10px]">
                          {item.localPath}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end font-mono">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black font-bold text-[10px] uppercase tracking-wider transition-colors"
              >
                Got It
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

