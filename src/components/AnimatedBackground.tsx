import { useEffect, useRef, useState } from "react";

interface FloatingObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: "chip" | "sensor" | "circuit" | "node" | "wave" | "hexagon";
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  objectCount?: number;
  enableHoverAnimation?: boolean;
}

export const AnimatedBackground = ({
  objectCount = 15,
  enableHoverAnimation = true
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectsRef = useRef<FloatingObject[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initObjects = () => {
      const objects: FloatingObject[] = [];
      const types: FloatingObject["type"][] = ["chip", "sensor", "circuit", "node", "wave", "hexagon"];

      for (let i = 0; i < objectCount; i++) {
        objects.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 30 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
      objectsRef.current = objects;
    };

    initObjects();
    setIsVisible(true);

    const drawChip = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const halfSize = size / 2;
      ctx.beginPath();
      ctx.rect(x - halfSize, y - halfSize, size, size);
      ctx.stroke();

      const pinCount = 4;
      const pinLength = size * 0.2;
      for (let i = 0; i < pinCount; i++) {
        const offset = (size / (pinCount + 1)) * (i + 1) - halfSize;
        ctx.beginPath();
        ctx.moveTo(x - halfSize - pinLength, y + offset);
        ctx.lineTo(x - halfSize, y + offset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + halfSize, y + offset);
        ctx.lineTo(x + halfSize + pinLength, y + offset);
        ctx.stroke();
      }
    };

    const drawSensor = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const radius = size / 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        const startX = x + Math.cos(angle) * radius * 0.5;
        const startY = y + Math.sin(angle) * radius * 0.5;
        const endX = x + Math.cos(angle) * radius;
        const endY = y + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    const drawCircuit = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const halfSize = size / 2;

      ctx.beginPath();
      ctx.moveTo(x - halfSize, y);
      ctx.lineTo(x - halfSize * 0.3, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, halfSize * 0.3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + halfSize * 0.3, y);
      ctx.lineTo(x + halfSize, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y - halfSize * 0.3);
      ctx.lineTo(x, y - halfSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y + halfSize * 0.3);
      ctx.lineTo(x, y + halfSize);
      ctx.stroke();
    };

    const drawNode = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const radius = size / 4;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
        const endX = x + Math.cos(angle) * size * 0.5;
        const endY = y + Math.sin(angle) * size * 0.5;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, endY, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawWave = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const amplitude = size / 4;
      const wavelength = size / 2;

      ctx.beginPath();
      for (let i = 0; i <= size; i += 2) {
        const xPos = x - size / 2 + i;
        const yPos = y + Math.sin((i / wavelength) * Math.PI * 2) * amplitude;
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.stroke();
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const radius = size / 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const xPos = x + Math.cos(angle) * radius;
        const yPos = y + Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawObject = (ctx: CanvasRenderingContext2D, obj: FloatingObject) => {
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.rotation);
      ctx.globalAlpha = obj.opacity;

      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${obj.opacity})` : `rgba(6, 182, 212, ${obj.opacity})`;
      ctx.fillStyle = isDark ? `rgba(6, 182, 212, ${obj.opacity})` : `rgba(6, 182, 212, ${obj.opacity})`;
      ctx.lineWidth = 2;

      switch (obj.type) {
        case "chip":
          drawChip(ctx, 0, 0, obj.size);
          break;
        case "sensor":
          drawSensor(ctx, 0, 0, obj.size);
          break;
        case "circuit":
          drawCircuit(ctx, 0, 0, obj.size);
          break;
        case "node":
          drawNode(ctx, 0, 0, obj.size);
          break;
        case "wave":
          drawWave(ctx, 0, 0, obj.size);
          break;
        case "hexagon":
          drawHexagon(ctx, 0, 0, obj.size);
          break;
      }

      ctx.restore();
    };

    const updateObjects = () => {
      objectsRef.current.forEach((obj) => {
        if (enableHoverAnimation && isHoveringRef.current) {
          const dx = obj.x - mouseRef.current.x;
          const dy = obj.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 150;

          if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius;
            const angle = Math.atan2(dy, dx);
            obj.vx += Math.cos(angle) * force * 0.5;
            obj.vy += Math.sin(angle) * force * 0.5;
          }
        }

        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.rotationSpeed;

        obj.vx *= 0.99;
        obj.vy *= 0.99;

        if (obj.x < -obj.size) obj.x = canvas.width + obj.size;
        if (obj.x > canvas.width + obj.size) obj.x = -obj.size;
        if (obj.y < -obj.size) obj.y = canvas.height + obj.size;
        if (obj.y > canvas.height + obj.size) obj.y = -obj.size;
      });
    };

    const updateRipples = () => {
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 2;
        ripple.opacity -= 0.02;
        return ripple.opacity > 0;
      });
    };

    const drawRipples = (ctx: CanvasRenderingContext2D) => {
      ripplesRef.current.forEach((ripple) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        const isDark = document.documentElement.classList.contains('dark');
        ctx.strokeStyle = isDark
          ? `rgba(6, 182, 212, ${ripple.opacity * 0.3})`
          : `rgba(6, 182, 212, ${ripple.opacity * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateObjects();
      updateRipples();

      objectsRef.current.forEach((obj) => drawObject(ctx, obj));
      drawRipples(ctx);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (isHoveringRef.current && ripplesRef.current.length < 3) {
        ripplesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          maxRadius: 100,
          opacity: 1,
        });
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [objectCount, enableHoverAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 0 }}
    />
  );
};
