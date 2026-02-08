import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = opposite direction
  className?: string;
  mouseParallax?: boolean;
  intensity?: number;
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = "",
  mouseParallax = false,
  intensity = 20
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (!mouseParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      
      x.set(deltaX * intensity * speed);
      y.set(deltaY * intensity * speed);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseParallax, intensity, speed, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: mouseParallax ? x : 0, y: mouseParallax ? y : 0 }}
    >
      {children}
    </motion.div>
  );
}
