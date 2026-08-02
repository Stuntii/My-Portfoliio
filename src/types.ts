export type ThemeMode = 'dark' | 'light';

export type ProjectCategory = 'all' | 'code' | 'design' | 'digital-art' | 'database-infra' | 'award-winning';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  awardTag?: string;
  description: string;
  longCaseStudy?: string;
  localImagePath: string;
  fallbackImageUrl: string;
  techStack: string[];
  role: string;
  year: string;
  metrics?: { label: string; value: string }[];
  highlights: string[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  designPalette?: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  type: 'engineering' | 'design' | 'certification' | 'retail-sales' | 'award';
  description: string;
  keyAchivements: string[];
  tags: string[];
}

export interface LocalImageGuide {
  filename: string;
  usedFor: string;
  aspectRatio: string;
  localPath: string;
}

export interface BrandDesignItem {
  id: string;
  title: string;
  clientOrBrand: string;
  category: 'logo-mark' | 'brand-identity' | 'design-system' | 'packaging' | 'typography';
  year: string;
  description: string;
  imagePath: string;
  fallbackImageUrl?: string;
  palette: {
    hex: string;
    name: string;
  }[];
  typographyPairing: {
    headingFont: string;
    bodyFont: string;
  };
  deliverables: string[];
  gridSpecs?: string;
  clientQuote?: string;
  featured?: boolean;
}

export interface ArtworkPiece {
  id: string;
  title: string;
  medium: string;
  year: string;
  dimensions?: string;
  imagePath: string;
  fallbackImageUrl?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}
