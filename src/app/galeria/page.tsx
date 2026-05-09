import fs from "node:fs";
import path from "node:path";
import { SiteHeader } from "@/components/site/SiteHeader";

export const dynamic = "force-dynamic";

const imageExt = /\.(jpg|jpeg|png|webp|avif)$/i;
const galleryRoot = "galeria";

function listImagesFromRoot(root: string) {
  const basePath = path.join(process.cwd(), "public", root);
  if (!fs.existsSync(basePath)) return [];

  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExt.test(entry.name))
    .sort((a, b) =>
      a.name.localeCompare(b.name, "pl", {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map((entry) => `/${root}/${entry.name}`);
}

export default function GalleryPage() {
  const galleryImages = listImagesFromRoot(galleryRoot);

  return (
    <main className="min-h-screen bg-[#080d12]">
      <SiteHeader />

      <section className="py-3 md:py-5">
        <div className="site-shell">
          <div className="columns-2 gap-2 sm:columns-3 md:gap-3 lg:columns-4 xl:columns-5">
            {galleryImages.map((src, index) => (
              <figure
                key={src}
                className="mb-2 break-inside-avoid overflow-hidden border border-white/8 bg-black/20 md:mb-3"
              >
                <img
                  src={src}
                  alt={`Galeria ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
