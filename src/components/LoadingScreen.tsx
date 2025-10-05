import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">TechZephyr</h1>
          <p className="text-muted-foreground">Loading your experience...</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="text-center">
            <span className="text-6xl font-bold tabular-nums">
              {Math.floor(progress)}
            </span>
            <span className="text-2xl text-muted-foreground">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
