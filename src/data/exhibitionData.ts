import { ArtworkPiece } from '../types';

export interface ExhibitionImageConfig {
  id: string;
  num: number;
  filename: string;
  gitPath: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  description: string;
  tags: string[];
}

// 20 Pre-configured Exhibition Artworks (Bleach & MangaArt #1 to #20)
export const EXHIBITION_IMAGE_CONFIGS: ExhibitionImageConfig[] = [
  {
    num: 1,
    id: "bleach-manga-art-1",
    filename: "image-1.jpg",
    gitPath: "/public/images/image-1.jpg",
    title: "Bleach & MangaArt #1",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #1: High-contrast MangaArt keyframe and Bleach line-art composition.",
    tags: ["Bleach", "MangaArt", "Illustration"]
  },
  {
    num: 2,
    id: "bleach-manga-art-2",
    filename: "image-2.jpg",
    gitPath: "/public/images/image-2.jpg",
    title: "Bleach & MangaArt #2",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #2: Dynamic action pose and high-energy MangaArt ink line-work.",
    tags: ["Bleach", "MangaArt", "Keyframe"]
  },
  {
    num: 3,
    id: "bleach-manga-art-3",
    filename: "image-3.jpg",
    gitPath: "/public/images/image-3.jpg",
    title: "Bleach & MangaArt #3",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #3: Character study with intricate shading and atmospheric depth.",
    tags: ["Bleach", "MangaArt", "CharacterDesign"]
  },
  {
    num: 4,
    id: "bleach-manga-art-4",
    filename: "image-4.jpg",
    gitPath: "/public/images/image-4.jpg",
    title: "Bleach & MangaArt #4",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #4: Stylized spiritual energy visual effects and bold brush strokes.",
    tags: ["Bleach", "MangaArt", "Effects"]
  },
  {
    num: 5,
    id: "bleach-manga-art-5",
    filename: "image-5.jpg",
    gitPath: "/public/images/image-5.jpg",
    title: "Bleach & MangaArt #5",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #5: Cinematic dark aesthetic background paired with vivid focal contrast.",
    tags: ["Bleach", "MangaArt", "Cinematic"]
  },
  {
    num: 6,
    id: "bleach-manga-art-6",
    filename: "image-6.jpg",
    gitPath: "/public/images/image-6.jpg",
    title: "Bleach & MangaArt #6",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #6: Minimalist monochrome MangaArt with high-impact silhouette typography.",
    tags: ["Bleach", "MangaArt", "Monochrome"]
  },
  {
    num: 7,
    id: "bleach-manga-art-7",
    filename: "image-7.jpg",
    gitPath: "/public/images/image-7.jpg",
    title: "Bleach & MangaArt #7",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #7: Detailed sword-smithing and spirit weapon artwork.",
    tags: ["Bleach", "MangaArt", "WeaponArt"]
  },
  {
    num: 8,
    id: "bleach-manga-art-8",
    filename: "image-8.jpg",
    gitPath: "/public/images/image-8.jpg",
    title: "Bleach & MangaArt #8",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #8: Avant-garde layout combining Japanese typography and anime keyframes.",
    tags: ["Bleach", "MangaArt", "Typography"]
  },
  {
    num: 9,
    id: "bleach-manga-art-9",
    filename: "image-9.jpg",
    gitPath: "/public/images/image-9.jpg",
    title: "Bleach & MangaArt #9",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #9: Mask release transformation illustration with glowing highlights.",
    tags: ["Bleach", "MangaArt", "MaskSeries"]
  },
  {
    num: 10,
    id: "bleach-manga-art-10",
    filename: "image-10.jpg",
    gitPath: "/public/images/image-10.jpg",
    title: "Bleach & MangaArt #10",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #10: Milestone mid-gallery spotlight character poster.",
    tags: ["Bleach", "MangaArt", "Spotlight"]
  },
  {
    num: 11,
    id: "bleach-manga-art-11",
    filename: "image-11.jpg",
    gitPath: "/public/images/image-11.jpg",
    title: "Bleach & MangaArt #11",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #11: Soul Society architectural environment and atmospheric concept art.",
    tags: ["Bleach", "MangaArt", "Environment"]
  },
  {
    num: 12,
    id: "bleach-manga-art-12",
    filename: "image-12.jpg",
    gitPath: "/public/images/image-12.jpg",
    title: "Bleach & MangaArt #12",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #12: High-speed shunpo movement trails and speed-line vectors.",
    tags: ["Bleach", "MangaArt", "Action"]
  },
  {
    num: 13,
    id: "bleach-manga-art-13",
    filename: "image-13.jpg",
    gitPath: "/public/images/image-13.jpg",
    title: "Bleach & MangaArt #13",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #13: Dual-wielding character pose with metallic reflections.",
    tags: ["Bleach", "MangaArt", "DualWield"]
  },
  {
    num: 14,
    id: "bleach-manga-art-14",
    filename: "image-14.jpg",
    gitPath: "/public/images/image-14.jpg",
    title: "Bleach & MangaArt #14",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #14: Bankai aura release concept with intense particle effects.",
    tags: ["Bleach", "MangaArt", "Bankai"]
  },
  {
    num: 15,
    id: "bleach-manga-art-15",
    filename: "image-15.jpg",
    gitPath: "/public/images/image-15.jpg",
    title: "Bleach & MangaArt #15",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #15: Arrancar division aesthetic artwork with stark white geometry.",
    tags: ["Bleach", "MangaArt", "Arrancar"]
  },
  {
    num: 16,
    id: "bleach-manga-art-16",
    filename: "image-16.jpg",
    gitPath: "/public/images/image-16.jpg",
    title: "Bleach & MangaArt #16",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #16: Quincy cross symbolism and clean blue reishi energy vectors.",
    tags: ["Bleach", "MangaArt", "Quincy"]
  },
  {
    num: 17,
    id: "bleach-manga-art-17",
    filename: "image-17.jpg",
    gitPath: "/public/images/image-17.jpg",
    title: "Bleach & MangaArt #17",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #17: Captain haori cloak design and emblem typography.",
    tags: ["Bleach", "MangaArt", "Emblem"]
  },
  {
    num: 18,
    id: "bleach-manga-art-18",
    filename: "image-18.jpg",
    gitPath: "/public/images/image-18.jpg",
    title: "Bleach & MangaArt #18",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #18: Emotional portrait study with dramatic rim lighting.",
    tags: ["Bleach", "MangaArt", "Portrait"]
  },
  {
    num: 19,
    id: "bleach-manga-art-19",
    filename: "image-19.jpg",
    gitPath: "/public/images/image-19.jpg",
    title: "Bleach & MangaArt #19",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #19: Climax battle confrontation splash art with high contrast.",
    tags: ["Bleach", "MangaArt", "Climax"]
  },
  {
    num: 20,
    id: "bleach-manga-art-20",
    filename: "image-20.jpg",
    gitPath: "/public/images/image-20.jpg",
    title: "Bleach & MangaArt #20",
    medium: "Digital Anime Keyframe & Manga Artwork",
    year: "2026",
    dimensions: "3840 x 2160 px",
    description: "Exhibition Piece #20: Final gallery masterpiece combining all visual motifs of the series.",
    tags: ["Bleach", "MangaArt", "Finale"]
  }
];

// Convert configs to standard ArtworkPiece array for Exhibition component
export const EXHIBITION_DEFAULT_ARTWORKS: ArtworkPiece[] = EXHIBITION_IMAGE_CONFIGS.map((config) => ({
  id: config.id,
  title: config.title,
  medium: config.medium,
  year: config.year,
  dimensions: config.dimensions,
  imagePath: `/images/${config.filename}`,
  fallbackImageUrl: `/images/image-${config.num}.svg`,
  description: config.description,
  tags: config.tags,
  featured: config.num <= 6
}));
