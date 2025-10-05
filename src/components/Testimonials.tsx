import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "IoT Innovations",
    content: "The Zephyr RTOS implementation exceeded our expectations. The team delivered a robust, scalable solution that perfectly handles our edge computing requirements.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Lead Engineer",
    company: "SmartSense Technologies",
    content: "Outstanding work on our sensor network project. The real-time performance and low power consumption were exactly what we needed for our industrial IoT deployment.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Manager",
    company: "EdgeTech Solutions",
    content: "Impressive technical expertise and attention to detail. The project was delivered on time with excellent documentation and support throughout the development process.",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "System Architect",
    company: "ConnectedDevices Inc",
    content: "Their deep understanding of embedded systems and RTOS architecture helped us solve complex challenges in our device connectivity platform.",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "VP Engineering",
    company: "NextGen Devices",
    content: "A game-changer for our product line. The optimized firmware and innovative approach to power management significantly improved our device battery life.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
  {
    id: 6,
    name: "James Park",
    role: "Technical Director",
    company: "Automotive IoT Systems",
    content: "Exceptional reliability and performance in automotive-grade applications. Their expertise in safety-critical systems was invaluable to our project success.",
    avatar: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8"
      aria-label="Customer testimonials"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="text-primary">
              Clients Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by leading companies to deliver innovative IoT and embedded solutions
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          <div className="hidden lg:flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="h-12 w-12 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="h-12 w-12 rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <div
      className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up border border-border/50 hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
        <Quote className="h-12 w-12" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={`${testimonial.name} profile`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-tech opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
            <p className="text-xs text-muted-foreground/80">
              {testimonial.company}
            </p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-primary"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {testimonial.content}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-tech opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
    </div>
  );
};
