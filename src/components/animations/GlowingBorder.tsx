import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

export function GlowingBorder({ 
  children, 
  isActive, 
  className = "",
  glowColor = "hsl(var(--slide-accent))",
  borderRadius = "1rem"
}: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={false}
      animate={isActive ? "active" : "inactive"}
    >
      {/* Animated glow border */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl pointer-events-none overflow-hidden"
        style={{ borderRadius }}
        variants={{
          inactive: { opacity: 0 },
          active: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-2 rounded-2xl pointer-events-none"
        style={{ 
          borderRadius,
          background: `radial-gradient(ellipse at center, ${glowColor.replace(')', ' / 0.2)')}, transparent 70%)`,
          filter: "blur(20px)",
        }}
        variants={{
          inactive: { opacity: 0, scale: 0.95 },
          active: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.6 }}
      />
      
      {children}
    </motion.div>
  );
}
