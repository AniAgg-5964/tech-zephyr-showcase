import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Github } from "lucide-react";
import { useRipple } from "@/hooks/useRipple";
import { AnimatedBackground } from "@/components/AnimatedBackground";

/*
  CTA Section Component
  - Prominent call-to-action
  - Contact buttons with hover effects
  - Entrance animations
*/

export const CTASection = () => {
  const createRipple = useRipple();

  const handleContact = (type: string) => {
    // In a real app, this would open email client or redirect
    console.log(`Contact via ${type}`);
  };

  return (
    <section
      id="cta"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle relative overflow-hidden"
      aria-label="Call to action section"
    >
      <AnimatedBackground objectCount={10} />
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-3xl shadow-card overflow-hidden animate-fade-in-up">
          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Ready to{" "}
              <span className="text-primary font-bold">
                Collaborate?
              </span>
            </h2>

            <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Let's build something amazing together. Reach out to discuss your
              project ideas or explore collaboration opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => handleContact("email")}
                onMouseEnter={createRipple}
                size="lg"
                className="ripple-container bg-gradient-tech hover:shadow-lg hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-6 text-lg group w-full sm:w-auto"
                aria-label="Contact via email"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() => handleContact("github")}
                onMouseEnter={createRipple}
                variant="outline"
                size="lg"
                className="ripple-container border-2 hover:bg-secondary hover:scale-105 transition-all duration-300 font-semibold px-8 py-6 text-lg group w-full sm:w-auto"
                aria-label="View GitHub profile"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm">
                Open source • Built with modern tech • Always innovating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
