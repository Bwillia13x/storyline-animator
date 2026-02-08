import { motion } from "framer-motion";

interface Props {
  isActive: boolean;
  className?: string;
  color?: string;
  size?: number;
}

const shapes = [
  "M50,0 L100,50 L50,100 L0,50 Z", // Diamond
  "M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z", // Hexagon
  "M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0", // Circle
  "M0,0 L100,0 L100,100 L0,100 Z", // Square
];

export function MorphingShape({ 
  isActive, 
  className = "",
  color = "hsl(var(--slide-accent) / 0.1)",
  size = 200
}: Props) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        width="100%" 
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          fill={color}
          filter="url(#glow)"
          initial={{ d: shapes[0], rotate: 0 }}
          animate={{
            d: isActive ? shapes : shapes[0],
            rotate: isActive ? [0, 90, 180, 270, 360] : 0,
          }}
          transition={{
            d: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </svg>
    </motion.div>
  );
}
