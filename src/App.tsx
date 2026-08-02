import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StickyCaseStudy } from './components/StickyCaseStudy';
import { BrandDesignsShowcase } from './components/BrandDesignsShowcase';
import { ArtExhibition } from './components/ArtExhibition';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ImageGuideDrawer } from './components/ImageGuideDrawer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ProjectItem } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [imageGuideOpen, setImageGuideOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        
        {/* Navigation Bar */}
        <Navbar onOpenImageGuide={() => setImageGuideOpen(true)} />

        <main>
          {/* Parallax Scroll Hero */}
          <Hero
            onOpenResumeModal={() => setResumeModalOpen(true)}
            onOpenImageGuide={() => setImageGuideOpen(true)}
          />

          {/* Sticky Case Study Spotlight: KZN Tech Horizon 2026 2nd Winner */}
          <StickyCaseStudy onSelectProject={(p) => setSelectedProject(p)} />

          {/* Visual Brand Identity & Logo Systems Showcase */}
          <BrandDesignsShowcase />

          {/* Herb Lubalin & Avant Garde Art Exhibition */}
          <ArtExhibition />

          {/* Categorized Skills Matrix */}
          <SkillsMatrix />

          {/* 6+ Years Experience & Cisco/TFG Timeline */}
          <ExperienceTimeline />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenImageGuide={() => setImageGuideOpen(true)} />

        {/* Modals & Drawers */}
        <ImageGuideDrawer
          isOpen={imageGuideOpen}
          onClose={() => setImageGuideOpen(false)}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
