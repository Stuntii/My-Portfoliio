import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Database, Palette } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csharp' | 'sql' | 'brand' | 'react'>('csharp');
  const [copied, setCopied] = useState(false);

  const snippets = {
    csharp: {
      title: "C# ASP.NET Core Web API Microservice",
      language: "csharp",
      code: `using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KZNTech.Portfolio.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class EnterpriseSystemController : ControllerBase
    {
        private readonly IDatabaseService _db;

        public EnterpriseSystemController(IDatabaseService db)
        {
            _db = db;
        }

        [HttpGet("telemetry")]
        public async Task<IActionResult> GetTelemetry([FromQuery] string region = "KZN")
        {
            var data = await _db.GetRegionalMetricsAsync(region);
            return Ok(new { Status = "Success", Region = region, Metrics = data });
        }
    }
}`
    },
    sql: {
      title: "Relational SQL Server / PostgreSQL Schema",
      language: "sql",
      code: `-- SQL Relational Database Table & Index Architecture
CREATE TABLE dbo.Projects (
    ProjectId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    IsAwardWinner BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE NONCLUSTERED INDEX IX_Projects_Category
ON dbo.Projects (Category)
INCLUDE (Title, IsAwardWinner);`
    },
    brand: {
      title: "Visual Brand Identity Design System Tokens",
      language: "json",
      code: `{
  "brandName": "Elegant Dark Visual System",
  "typography": {
    "display": "Syne, sans-serif",
    "serif": "Playfair Display, serif",
    "mono": "JetBrains Mono, monospace"
  },
  "palette": {
    "background": "#09090B",
    "surface": "#18181B",
    "border": "#27272A",
    "foreground": "#F4F4F5",
    "muted": "#71717A"
  }
}`
    },
    react: {
      title: "React 19 & Motion UI Component",
      language: "typescript",
      code: `import React from 'react';
import { motion } from 'motion/react';

export const MotionCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 rounded-sm bg-zinc-900 border border-zinc-800 text-white shadow-xl"
  >
    <h3 className="text-xl font-bold font-heading">{title}</h3>
    <p className="text-sm text-zinc-400 mt-1 font-sans">{subtitle}</p>
  </motion.div>
);`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 bg-[#09090b] text-zinc-100 transition-colors border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <Terminal className="w-3.5 h-3.5 text-zinc-300" />
            INTERACTIVE CODE &amp; BRAND INSPECTOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-heading">
            Code &amp; Brand <span className="text-zinc-500 italic font-serif">Token Playground</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto">
            Inspect clean production-ready C# .NET controllers, SQL relational schemas, React components, and Brand identity design tokens.
          </p>
        </div>

        {/* Playground Container */}
        <div className="max-w-4xl mx-auto rounded-sm bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
          
          {/* Header Bar with Tabs & Copy Button */}
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'csharp', label: 'C# ASP.NET Core', icon: Terminal },
                { id: 'sql', label: 'SQL Schema', icon: Database },
                { id: 'brand', label: 'Brand Tokens', icon: Palette },
                { id: 'react', label: 'React Component', icon: Code2 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-md'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-zinc-800 transition-all flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

          </div>

          {/* Code Window Body */}
          <div className="p-6 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed bg-black min-h-[260px] border-b border-zinc-800">
            <pre className="text-emerald-400">
              <code>{snippets[activeTab].code}</code>
            </pre>
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-zinc-950 text-[10px] font-mono text-zinc-500 flex items-center justify-between uppercase tracking-widest">
            <span>{snippets[activeTab].title}</span>
            <span>Clean Architecture Pattern</span>
          </div>

        </div>

      </div>
    </section>
  );
};

