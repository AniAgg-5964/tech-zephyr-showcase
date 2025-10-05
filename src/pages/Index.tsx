import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { CTASection } from "@/components/CTASection";

/*
  TechZephyr Landing Page
  
  A modern, minimal tech showcase landing page featuring:
  - Video hero section with animated CTA
  - Sticky responsive navigation with dark mode
  - Filterable image gallery with lightbox
  - Embedded video showcase
  - Call-to-action section
  - Scroll progress indicator
  - Full accessibility (ARIA, semantic HTML, keyboard navigation)
  - Performance optimizations (lazy loading, skeleton loaders)
  - Mobile-first responsive design
*/

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Gallery />
        <VideoSection />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TechZephyr. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
