import { ProjectItem, SkillCategory, ExperienceItem, LocalImageGuide } from '../types';
import { EXHIBITION_DEFAULT_ARTWORKS } from './exhibitionData';

export const PERSONAL_INFO = {
  name: "Ndumiso Shoba",
  alias: "Frontend Designer & Full-Stack All-Rounder",
  yearsExperience: "6+ in design",
  headline: "Frontend Designer & UI Specialist × Freelancer for Hire (Full-Stack All-Rounder)",
  tagline: "Lead Graphic Designer for BrokeBoy_RichMind. Crafting high-fidelity UI/UX, 2D anime animation keyframes, bespoke brand systems & interactive React interfaces — backed by full-stack C# / ASP.NET Core and database logic.",
  bio: "I am mainly a Frontend Designer & UI/UX Specialist available for freelance hire. As a complete all-rounder, I also build robust backend logic, C# ASP.NET Core APIs, relational databases (SQL Server & PostgreSQL), and Cisco networking infrastructure.",
  email: "stuntii209@gmail.com",
  location: "KwaZulu-Natal / Remote • Freelance Available",
  award: "KZN Tech Horizon 2026 — 2nd Winner 🏆",
  stats: [
    { label: "Freelance Status", value: "Available for Hire" },
    { label: "Primary Focus", value: "Frontend & UI Design" },
    { label: "All-Rounder Tech", value: "React + C# ASP.NET & SQL" },
    { label: "Award Won", value: "KZN Tech 2026 (2nd)" }
  ]
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "kzn-tech-horizon-2026",
    title: "KZN Tech Horizon Innovation Suite",
    subtitle: "2nd Place Winner — High-Performance Cloud System & UI/UX",
    category: "award-winning",
    awardTag: "🥈 2nd Place Winner (KZN Tech Horizon 2026)",
    description: "Award-winning enterprise web application built with C#, ASP.NET Core Web API backend, PostgreSQL database, and a React frontend featuring a custom motion-driven design system.",
    longCaseStudy: "Developed for the prestigious KZN Tech Horizon 2026 competition, this platform solved complex real-time operational data tracking for regional distribution networks. The judges commended the seamless interplay between robust C# architecture, database query performance, and the custom brand visual identity.",
    localImagePath: "/images/project-kzn.jpg",
    fallbackImageUrl: "/images/project-kzn.svg",
    techStack: ["C#", "ASP.NET Core", "React 19", "PostgreSQL", "Tailwind CSS", "Motion"],
    role: "Lead Full-Stack Architect & Visual Designer",
    year: "2026",
    metrics: [
      { label: "Response Latency", value: "< 45ms" },
      { label: "Concurrency Tested", value: "10,000 req/s" },
      { label: "Design System Tokens", value: "120+ Components" }
    ],
    highlights: [
      "Secured 2nd place among 150+ regional tech innovators.",
      "Engineered high-throughput ASP.NET Core REST API microservices.",
      "Crafted an exclusive brand identity system and responsive dark/light UI.",
      "Optimized SQL query performance by 65% with custom indexing."
    ],
    codeSnippet: {
      language: "csharp",
      title: "KZN Data Engine Controller (ASP.NET Core)",
      code: `[ApiController]
[Route("api/v1/kzn-horizon/[controller]")]
public class DistributionEngineController : ControllerBase
{
    private readonly IDatabaseManager _dbManager;
    private readonly ILogger<DistributionEngineController> _logger;

    public DistributionEngineController(IDatabaseManager dbManager, ILogger<DistributionEngineController> logger)
    {
        _dbManager = dbManager;
        _logger = logger;
    }

    [HttpGet("realtime-metrics")]
    [ProducesResponseType(typeof(MetricsResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRealtimeMetrics([FromQuery] string region = "KZN-MAIN")
    {
        _logger.LogInformation("Processing telemetry request for region: {Region}", region);
        var metrics = opacity == null ? await _dbManager.GetRegionalTelemetryAsync(region) : null;
        return Ok(new { Status = "Active", Region = region, Telemetry = metrics, Timestamp = DateTime.UtcNow });
    }
}`
    },
    designPalette: {
      primary: "#4F46E5",
      secondary: "#A855F7",
      accent: "#EAB308",
      neutral: "#0F172A"
    }
  },
  {
    id: "aspnet-enterprise-solution",
    title: "Apex C# ASP.NET Core ERP & DB System",
    subtitle: "Full-Stack Enterprise Architecture & Database Management",
    category: "code",
    description: "Multi-tenant enterprise resource management system written in C# and ASP.NET Core with automated database migration, complex relational schema management, and React admin dashboard.",
    longCaseStudy: "Designed for heavy database read/write workloads. Built utilizing Repository and CQRS patterns in C#, integrating Entity Framework Core and raw SQL stored procedures where extreme query optimization was needed.",
    localImagePath: "/images/project-dotnet-app.jpg",
    fallbackImageUrl: "/images/project-dotnet-app.svg",
    techStack: ["C#", "ASP.NET Core", "SQL Server", "React", "TypeScript", "REST APIs"],
    role: "Database Manager & Backend Developer",
    year: "2025",
    metrics: [
      { label: "SQL Execution", value: "1.2ms Avg" },
      { label: "Uptime", value: "99.99%" }
    ],
    highlights: [
      "Designed 45+ relational SQL database tables with FK constraints and audit triggers.",
      "Built clean React front-end components consuming C# ASP.NET Core endpoints.",
      "Implemented JWT authentication and RBAC security policies."
    ],
    codeSnippet: {
      language: "sql",
      title: "Optimized Relational SQL View & Index",
      code: `-- Relational Database Schema Optimization for Enterprise ERP
CREATE TABLE dbo.UserTransactions (
    TransactionId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId INT NOT NULL FOREIGN KEY REFERENCES dbo.Users(UserId),
    Amount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(20) NOT NULL CHECK (Status IN ('Pending', 'Completed', 'Failed')),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE NONCLUSTERED INDEX IX_Transactions_User_Status
ON dbo.UserTransactions (UserId, Status)
INCLUDE (Amount, CreatedAt);`
    }
  },
  {
    id: "brand-identity-guidelines",
    title: "Aetheria Visual Brand Identity & Design System",
    subtitle: "Complete Corporate Visual Identity & Brand Design",
    category: "design",
    description: "End-to-end brand identity creation including bespoke logo marks, mathematical typography grids, color swatch systems, business stationery, and brand guidelines manual.",
    longCaseStudy: "Created as a comprehensive brand system for a high-growth modern tech company. Focused on precision, balance, and scalable design tokens usable across digital art, web interfaces, and print media.",
    localImagePath: "/images/project-brand-identity.jpg",
    fallbackImageUrl: "/images/project-brand-identity.svg",
    techStack: ["Brand Identity", "Graphic Design", "Logo Design", "Typography", "Vector Art"],
    role: "Lead Graphic & Brand Designer",
    year: "2024",
    highlights: [
      "Crafted full 48-page Brand Guidelines manual.",
      "Created vector logo variations for light/dark modes and physical merchandise.",
      "Defined mathematical typographic scale with WCAG AA accessibility compliance."
    ],
    designPalette: {
      primary: "#18181B",
      secondary: "#6366F1",
      accent: "#EC4899",
      neutral: "#FAFAFA"
    }
  },
  {
    id: "digital-art-gallery-series",
    title: "Chronos Digital Art & Conceptual Illustration",
    subtitle: "High-Resolution Digital Artwork & Vector Creations",
    category: "digital-art",
    description: "A showcase of custom digital artworks, vector illustrations, and abstract concept art crafted for visual media, digital campaigns, and artistic prints.",
    longCaseStudy: "Exhibiting mastery over shape composition, lighting, color theory, and digital painting techniques. Demonstrating the creative artistic side that informs intuitive UI/UX design.",
    localImagePath: "/images/project-digital-art.jpg",
    fallbackImageUrl: "/images/project-digital-art.svg",
    techStack: ["Digital Art", "Vector Illustration", "Color Theory", "Concept Art", "Digital Painting"],
    role: "Digital Artist & Concept Illustrator",
    year: "2025",
    highlights: [
      "Created high-resolution artwork rendered for 4K digital displays and fine art prints.",
      "Utilized custom vector gradients and lighting compositions.",
      "Featured in South African visual art showcases."
    ]
  },
  {
    id: "cisco-network-infrastructure",
    title: "Cisco Core Network & Infrastructure Topology",
    subtitle: "Enterprise Cisco Routing, Switching & Security",
    category: "database-infra",
    description: "Network architecture design utilizing Cisco certified principles: VLAN isolation, OSPF routing, Access Control Lists (ACLs), and high-availability switch stacks.",
    longCaseStudy: "Leveraging Cisco certification knowledge to design resilient data network backbones that support cloud software applications, databases, and secure cross-branch communication.",
    localImagePath: "/images/project-cisco-net.jpg",
    fallbackImageUrl: "/images/project-cisco-net.svg",
    techStack: ["Cisco Certified", "Routing & Switching", "Network Security", "VLANs / OSPF", "IP Services"],
    role: "Network Infrastructure Engineer",
    year: "2024",
    highlights: [
      "Designed multi-VLAN enterprise subnet hierarchy with 99.9% uptime.",
      "Implemented stateful Cisco firewall rules and NAT security policies.",
      "Seamlessly linked backend ASP.NET server clusters over secure Cisco network tunnels."
    ]
  },
  {
    id: "tfg-retail-analytics-portal",
    title: "TFG Retail Analytics & Sales Associate System",
    subtitle: "Customer Engagement Platform & Sales Operations",
    category: "code",
    description: "Sales management portal informed by front-line TFG Sales Associate experience, unifying inventory lookup, customer preference history, and retail performance metrics.",
    longCaseStudy: "Drawing directly from 6+ years in the work industry including direct retail experience with TFG (The Foschini Group), this app bridges customer empathy with technical retail POS & inventory management.",
    localImagePath: "/images/project-tfg-retail.jpg",
    fallbackImageUrl: "/images/project-tfg-retail.svg",
    techStack: ["React", "C#", "SQL Server", "Sales Analytics", "Customer UX"],
    role: "Developer & Former TFG Sales Associate",
    year: "2023",
    highlights: [
      "Combined real-world retail sales acumen with custom application development.",
      "Streamlined inventory check time for associates on shop floor by 40%.",
      "Designed mobile-friendly touch interfaces optimized for quick customer service."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Full-Stack Development (C# / .NET / React)",
    iconName: "Code2",
    description: "Robust, scalable software engineering across backend systems and modern frontend frameworks.",
    skills: [
      { name: "C# & .NET / ASP.NET Core", level: 95, experience: "2+ Years", highlight: true },
      { name: "React & TypeScript", level: 92, experience: "2 Years", highlight: true },
      { name: "HTML5 / CSS3 / JavaScript (ES6+)", level: 98, experience: "2+ Years", highlight: true },
      { name: "RESTful Web APIs & Microservices", level: 90, experience: "2 Years" },
      { name: "Tailwind CSS & Motion/Animations", level: 95, experience: "2+ Years" }
    ]
  },
  {
    title: "Graphic Design & Brand Design",
    iconName: "Palette",
    description: "Visual identity systems, typography, vector artwork, and creative design direction.",
    skills: [
      { name: "Brand Identity Systems", level: 95, experience: "6+ Years", highlight: true },
      { name: "Graphic Design & Print Media", level: 92, experience: "6+ Years", highlight: true },
      { name: "Digital Art & Illustration", level: 88, experience: "5 Years" },
      { name: "UI/UX & Wireframing", level: 90, experience: "2+ Years" },
      { name: "Design System Guidelines", level: 94, experience: "6+ Years" }
    ]
  },
  {
    title: "Database Engineering & Management",
    iconName: "Database",
    description: "Relational database schema architecture, SQL optimization, data security, and indexing.",
    skills: [
      { name: "SQL (Microsoft SQL Server / PostgreSQL)", level: 94, experience: "2+ Years", highlight: true },
      { name: "Database Design & ERD Modeling", level: 92, experience: "2+ Years" },
      { name: "Query Performance Tuning & Indexing", level: 88, experience: "2+ Years" },
      { name: "ORM (Entity Framework Core)", level: 90, experience: "2+ Years" }
    ]
  },
  {
    title: "Networking, Cisco & Industry Certs",
    iconName: "Network",
    description: "Network architecture, security protocols, Cisco certifications, and customer sales experience.",
    skills: [
      { name: "Cisco Networking Certificates", level: 90, experience: "Verified", highlight: true },
      { name: "TFG Sales & Retail Acumen", level: 95, experience: "Work Industry" },
      { name: "Application Architecture", level: 92, experience: "2++ Years" },
      { name: "Git Version Control & Deployment", level: 90, experience: "3+ Years" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "kzn-award-2026",
    period: "2026",
    role: "2nd Place Winners (2man-Herd) — Innovator",
    company: "KZN Tech Horizon 2026 Summit",
    location: "KwaZulu-Natal, South Africa",
    type: "award",
    description: "Awarded 2nd Winners at the prestigious regional tech summit for designing and engineering a full-stack high-performance cloud solution with custom brand identity.",
    keyAchivements: [
      "Demonstrated excellence in C# ASP.NET backend performance and React frontend design.",
      "Praised by industry judges for cohesive brand aesthetics and database optimization."
    ],
    tags: ["Award Winner", "C# ASP.NET Core", "React", "Brand Design"]
  },
  {
    id: "senior-dev-designer-6yrs",
    period: "2020 — Present (6+ Years)",
    role: "Full-Stack Software Developer & Brand Designer",
    company: "Enterprise Software & Design Studio",
    location: "South Africa",
    type: "engineering",
    description: "Leading the development of enterprise C# / ASP.NET applications, custom databases, and brand design projects for corporate clients.",
    keyAchivements: [
      "Architected C# Web APIs and relational databases handling critical business transactions.",
      "Designed visual identity packages, digital artwork, and UI component libraries.",
      "Maintained 99.9% uptime across managed SQL databases and web applications."
    ],
    tags: ["C#", "ASP.NET Core", "React", "SQL", "Brand Design", "6+ Years Exp"]
  },
  {
    id: "cisco-cert-networking",
    period: "Certified Credential",
    role: "Cisco Certified Network Associate",
    company: "Cisco Systems",
    type: "certification",
    description: "Hold official Cisco certificates covering enterprise routing, switching, subnetting, network security, and infrastructure management.",
    keyAchivements: [
      "Mastered network protocols, VLAN segmentation, and IP infrastructure.",
      "Applied Cisco networking principles to securely connect server databases and cloud APIs."
    ],
    tags: ["Cisco Certified", "Networking", "Security", "Infrastructure"]
  },
  {
    id: "tfg-sales-associate",
    period: "Industry Work Experience",
    role: "TFG Sales Associate & Customer Relations",
    company: "The Foschini Group (TFG)",
    type: "retail-sales",
    description: "Gained foundational industry experience in sales, customer communication, brand loyalty, and retail operations with TFG.",
    keyAchivements: [
      "Built exceptional client empathy and customer communication skills.",
      "Applied direct sales experience to inform user-centric retail software designs."
    ],
    tags: ["TFG", "Sales Associate", "Customer Experience", "Industry Exp"]
  }
];

export const LOCAL_IMAGE_MAPPING_GUIDE: LocalImageGuide[] = [
  {
    filename: "avatar.jpg",
    usedFor: "Hero Section Profile & Personal Avatar (Ndumiso Shoba)",
    aspectRatio: "1:1 Square (800x800 px or 1000x1000 px)",
    localPath: "/public/images/avatar.jpg"
  },
  {
    filename: "project-brand-identity.jpg",
    usedFor: "BrokeBoy_RichMind Lead Graphic Designer Brand Announcement Banner",
    aspectRatio: "16:9 Landscape (1920x1080 px or 1200x675 px)",
    localPath: "/public/images/project-brand-identity.jpg"
  },
  {
    filename: "project-kzn.jpg",
    usedFor: "KZN Tech Horizon 2026 Winner Feature Banner",
    aspectRatio: "16:9 Landscape (1200x675 px)",
    localPath: "/public/images/project-kzn.jpg"
  },
  {
    filename: "project-dotnet-app.jpg",
    usedFor: "ASP.NET Core & C# Enterprise Solution Project",
    aspectRatio: "16:9 Landscape",
    localPath: "/public/images/project-dotnet-app.jpg"
  },
  {
    filename: "project-digital-art.jpg",
    usedFor: "Digital Art & Concept Illustration Showcase",
    aspectRatio: "16:9 Landscape",
    localPath: "/public/images/project-digital-art.jpg"
  },
  {
    filename: "project-cisco-net.jpg",
    usedFor: "Cisco Network Architecture Case Study",
    aspectRatio: "16:9 Landscape",
    localPath: "/public/images/project-cisco-net.jpg"
  },
  {
    filename: "project-tfg-retail.jpg",
    usedFor: "TFG Sales Analytics & Associate System",
    aspectRatio: "16:9 Landscape",
    localPath: "/public/images/project-tfg-retail.jpg"
  },
  {
    filename: "project-database-manager.jpg",
    usedFor: "Relational Database Schema & SQL System",
    aspectRatio: "16:9 Landscape",
    localPath: "/public/images/project-database-manager.jpg"
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    filename: `image-${i + 1}.jpg`,
    usedFor: `Bleach & MangaArt #${i + 1} Exhibition Image`,
    aspectRatio: "16:9 or 3:4 High-Res Image",
    localPath: `/public/images/image-${i + 1}.jpg`
  }))
];

export const ARTWORK_EXHIBITION_PIECES = EXHIBITION_DEFAULT_ARTWORKS;

