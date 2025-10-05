import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";

/*
  Hero Component
  - Background video with fallback poster image
  - Animated text and CTA on entrance
  - Accessible with ARIA labels
  - Hover animation on CTA button
*/

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);

    // Play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  const handleCTA = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* Video Background - using poster as fallback */}
      <div className="absolute inset-0 z-0 parallax" data-speed="0.3">
        <img
          src={heroPoster}
          alt="Tech workspace with holographic displays"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-white">Replicate &</span>
          <br />
          <span className="text-primary">
            Innovate
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Pushing the boundaries of technology through innovative hackathon
          projects and cutting-edge solutions
        </p>

        <Button
          onClick={handleCTA}
          size="lg"
          className={`bg-gradient-tech hover:shadow-lg hover:scale-105 glow-primary transition-all duration-300 text-white font-semibold px-8 py-6 text-lg group ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
          aria-label="Explore our projects"
        >
          Explore Projects
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
