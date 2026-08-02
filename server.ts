import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
const METADATA_FILE = path.join(PUBLIC_IMAGES_DIR, "uploaded_artworks.json");

// Ensure public/images directory exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

// Helper to load uploaded artworks from public/images/uploaded_artworks.json
function getUploadedArtworks() {
  try {
    if (fs.existsSync(METADATA_FILE)) {
      const data = fs.readFileSync(METADATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading uploaded_artworks.json:", err);
  }
  return [];
}

// Helper to save uploaded artworks
function saveUploadedArtworks(artworks: any[]) {
  try {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(artworks, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing uploaded_artworks.json:", err);
  }
}

async function startServer() {
  const app = express();

  // Increase payload limit to handle base64 image uploads up to 50MB
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Serve static public folder explicitly so /images/filename is always accessible
  app.use(express.static(path.join(process.cwd(), "public")));

  // API Route: Get all uploaded artworks stored in public/images
  app.get("/api/artworks", (req, res) => {
    const artworks = getUploadedArtworks();
    res.json({ success: true, artworks });
  });

  // API Route: Save image directly into public/images/ folder and record in uploaded_artworks.json
  app.post("/api/upload", (req, res) => {
    try {
      const { fileName, base64Data, title, medium, year, dimensions, description, tags } = req.body;

      if (!base64Data || !fileName) {
        return res.status(400).json({ success: false, message: "Missing image file or fileName." });
      }

      // Extract raw base64 data
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      
      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], "base64");
      } else {
        buffer = Buffer.from(base64Data, "base64");
      }

      // Sanitize file name
      const safeName = fileName.toLowerCase().replace(/[^a-z0-9._-]/g, "_");
      const uniqueFileName = `${Date.now()}_${safeName}`;
      const filePath = path.join(PUBLIC_IMAGES_DIR, uniqueFileName);

      // Write file directly to public/images/ folder
      fs.writeFileSync(filePath, buffer);

      // Also copy to dist/public/images or dist/images if dist exists (production environment)
      const distPublicDir = path.join(process.cwd(), "dist", "public", "images");
      if (fs.existsSync(distPublicDir)) {
        fs.writeFileSync(path.join(distPublicDir, uniqueFileName), buffer);
      }
      const distImagesDir = path.join(process.cwd(), "dist", "images");
      if (fs.existsSync(distImagesDir)) {
        fs.writeFileSync(path.join(distImagesDir, uniqueFileName), buffer);
      }

      const imageRelPath = `/images/${uniqueFileName}`;

      const tagsArray = Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["Uploaded Image"];

      const newArtwork = {
        id: `art-${Date.now()}`,
        title: (title || safeName).toUpperCase(),
        medium: medium || "Digital Image",
        year: year || new Date().getFullYear().toString(),
        dimensions: dimensions || "Original Aspect",
        imagePath: imageRelPath,
        fallbackImageUrl: imageRelPath,
        description: description || "Uploaded image stored directly in /public/images directory.",
        tags: tagsArray.length > 0 ? tagsArray : ["Uploaded"],
        featured: true,
        createdAt: new Date().toISOString()
      };

      const currentArtworks = getUploadedArtworks();
      const updatedList = [newArtwork, ...currentArtworks];
      saveUploadedArtworks(updatedList);

      console.log(`Saved new artwork to ${filePath}`);
      res.json({ success: true, artwork: newArtwork });
    } catch (err: any) {
      console.error("Upload error:", err);
      res.status(500).json({ success: false, message: err.message || "Failed to upload image." });
    }
  });

  // API Route: Delete an artwork and its file from public/images/
  app.delete("/api/artworks/:id", (req, res) => {
    try {
      const { id } = req.params;
      const artworks = getUploadedArtworks();
      const target = artworks.find((a: any) => a.id === id);

      if (target && target.imagePath) {
        const localFileName = path.basename(target.imagePath);
        const fullPath = path.join(PUBLIC_IMAGES_DIR, localFileName);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      const updatedList = artworks.filter((a: any) => a.id !== id);
      saveUploadedArtworks(updatedList);

      res.json({ success: true });
    } catch (err: any) {
      console.error("Delete error:", err);
      res.status(500).json({ success: false, message: err.message || "Failed to delete image." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
