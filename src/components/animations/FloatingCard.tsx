import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isVisible: boolean;
  delay?: number;
  className?: string;
  hoverEffect?: boolean;
  floatIntensity?: number;
}

export function FloatingCard({ 
  children, 
  isVisible, 
  delay = 0,
  className = "",
  hoverEffect = true,
  floatIntensity = 5
}: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 30,
        scale: isVisible ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      whileHover={hoverEffect ? {
        y: -floatIntensity,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : undefined}
    >
      {/* Ambient shadow that moves on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "hsl(var(--slide-primary) / 0.08)",
          filter: "blur(20px)",
          transform: "translateY(10px) scale(0.95)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: delay + 0.2 }}
      />
      
      {children}
    </motion.div>
  );
}
