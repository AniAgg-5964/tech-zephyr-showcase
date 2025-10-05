import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";

/*
  Gallery Component
  - Responsive grid with varied border-radius
  - Filterable by category
  - Lightbox modal for full-size viewing
  - Lazy-loaded images with skeleton loader
  - Keyboard accessible (ESC to close lightbox)
*/

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  radius: string; // Varied border-radius for asymmetrical look
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: gallery1,
    alt: "Modern tech workspace with laptop and code",
    category: "Workspace",
    radius: "rounded-3xl",
  },
  {
    id: 2,
    src: gallery2,
    alt: "Hands typing on mechanical keyboard with RGB lighting",
    category: "Hardware",
    radius: "rounded-lg",
  },
  {
    id: 3,
    src: gallery3,
    alt: "Circuit board macro with electronic components",
    category: "Hardware",
    radius: "rounded-2xl",
  },
  {
    id: 4,
    src: gallery4,
    alt: "Team collaboration in modern tech space",
    category: "Team",
    radius: "rounded-xl",
  },
  {
    id: 5,
    src: gallery5,
    alt: "Abstract 3D tech architecture",
    category: "Design",
    radius: "rounded-3xl",
  },
  {
    id: 6,
    src: gallery6,
    alt: "Robotic device on minimal desk",
    category: "Hardware",
    radius: "rounded-2xl",
  },
];

const categories = ["All", "Workspace", "Hardware", "Team", "Design"];

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Close lightbox with ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxImage) {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [lightboxImage]);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle"
      aria-label="Project gallery"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Project{" "}
            <span className="bg-gradient-tech bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our innovative solutions and cutting-edge technology projects
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in"
          role="tablist"
          aria-label="Gallery filters"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`transition-smooth ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden ${item.radius} bg-card shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setLightboxImage(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.alt} in fullscreen`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setLightboxImage(item);
                }
              }}
            >
              {/* Skeleton Loader */}
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 skeleton" />
              )}

              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(item.id)}
                className={`w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-110 ${
                  loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-semibold">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>

            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};
