import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Copy, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Project Collaboration', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Project Collaboration', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#09090b] text-zinc-100 transition-colors border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
              <Mail className="w-3.5 h-3.5 text-zinc-300" />
              DIRECT CONTACT &amp; INQUIRIES
            </div>

            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-heading">
              Let's Build &amp; <br />
              <span className="text-zinc-500 italic font-serif">Design Something Great</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Whether you need enterprise C# ASP.NET software engineering, relational database management, Cisco network configuration, or a brand visual identity package — let's connect.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-sm bg-zinc-900 border border-zinc-800 shadow-sm flex items-center justify-between cursor-pointer hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-sm bg-zinc-950 text-white border border-zinc-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Direct Email</div>
                    <div className="text-xs font-bold text-white font-mono">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button className="px-3 py-1.5 rounded-sm bg-zinc-950 text-[10px] font-mono uppercase tracking-wider text-zinc-300 border border-zinc-800 group-hover:bg-white group-hover:text-black transition-colors flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-sm bg-zinc-900 border border-zinc-800 shadow-sm flex items-center gap-3">
                <div className="p-3 rounded-sm bg-zinc-950 text-white border border-zinc-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Location</div>
                  <div className="text-xs font-bold text-white font-mono">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                <div className="p-3 rounded-sm bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-mono font-bold uppercase tracking-widest">KZN Tech Horizon 2026 Winner</div>
                  <div className="text-xs text-zinc-400 font-sans">
                    2nd Place Award Winner — Enterprise System &amp; Brand Design
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8 rounded-sm bg-zinc-900 border border-zinc-800 shadow-2xl">
            
            {status === 'success' ? (
              <div className="p-8 text-center space-y-4 my-8 font-mono">
                <div className="w-12 h-12 rounded-sm bg-white text-black flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading uppercase tracking-wider">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out. I'll review your project details and get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white font-heading uppercase tracking-wider">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm bg-[#09090b] border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm bg-[#09090b] border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#09090b] border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors"
                  >
                    <option>C# / ASP.NET Core &amp; Full-Stack Project</option>
                    <option>Brand Identity &amp; Graphic Design</option>
                    <option>Database Architecture &amp; Optimization</option>
                    <option>Cisco Network Setup &amp; Infrastructure</option>
                    <option>Full-Time Career Opportunities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Project Details &amp; Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your vision, timeline, and deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm bg-[#09090b] border border-zinc-800 text-white text-xs font-sans focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 rounded-sm bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Inquiry Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

