import { useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import { AnimatedBackground } from "@/components/AnimatedBackground";

/*
  VideoSection Component
  - Embedded video player with controls
  - Poster image for loading state
  - Lazy-loaded for performance
*/

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="video"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-label="Video showcase section"
    >
      <AnimatedBackground objectCount={10} />
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            See It In{" "}
            <span className="text-primary">
              Action
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch our project demo and discover the technology behind the innovation
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300 bg-card scroll-reveal">
          {/* Skeleton loader */}
          {!isLoaded && (
            <div className="absolute inset-0 skeleton flex items-center justify-center">
              <div className="text-muted-foreground">Loading video...</div>
            </div>
          )}

          {/* Video Element - using poster as placeholder */}
          <div className="relative aspect-video w-full">
            <img
              src={heroPoster}
              alt="Video demonstration of TechZephyr project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/90 backdrop-blur-sm rounded-full p-6 group cursor-pointer hover:scale-110 transition-transform">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Play video"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Video Caption */}
          <div className="p-6 bg-card transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Project Demonstration</h3>
            <p className="text-muted-foreground">
              A comprehensive walkthrough of our hackathon project, showcasing key
              features and innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
