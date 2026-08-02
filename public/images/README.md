# Portfolio Local Image Assets Directory

Welcome! This folder (`/public/images/`) contains the image assets used throughout your portfolio.
You can easily swap any image by replacing the file with your own photo/design while keeping the same filename, or by updating the path in `/src/data/portfolioData.ts`.

## Image File Mapping Guide:

| Filename | Used For | Recommended Aspect Ratio / Size |
|---|---|---|
| `avatar.jpg` | Main profile image in Hero & About sections | Square or 4:5 (e.g. 800x800 px) |
| `project-kzn.jpg` | KZN Tech Horizon 2026 Winner project feature | 16:9 Landscape (e.g. 1200x675 px) |
| `project-dotnet-app.jpg` | ASP.NET Core & React Enterprise project | 16:9 Landscape |
| `project-brand-identity.jpg` | Graphic Design & Brand Identity case study | 16:9 Landscape or 4:3 |
| `project-digital-art.jpg` | Digital Art & Illustration showcase | 16:9 or 4:3 Landscape |
| `project-cisco-net.jpg` | Cisco Networking & Infrastructure project | 16:9 Landscape |
| `project-tfg-retail.jpg` | TFG Sales Analytics & Associate portal | 16:9 Landscape |
| `project-database-manager.jpg` | Database Management & SQL System | 16:9 Landscape |
| `cert-cisco.jpg` | Cisco Certification Badge / Document | 4:3 or 16:9 |
| `award-kzn-2026.jpg` | KZN Tech Horizon 2026 Trophy & Certificate | 16:9 Landscape |

## How to replace an image locally:
1. Drop your custom image file into this `/public/images/` folder.
2. Rename it to match the target filename (e.g. `avatar.jpg` or `project-kzn.jpg`).
3. That's it! The portfolio website will automatically display your new image with lazy loading and responsive scaling.
