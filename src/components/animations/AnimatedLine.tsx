import { motion } from "framer-motion";

interface Props {
  isVisible: boolean;
  delay?: number;
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  thickness?: number;
  glowing?: boolean;
}

export function AnimatedLine({ 
  isVisible, 
  delay = 0, 
  direction = "horizontal",
  className = "",
  color = "hsl(var(--slide-accent))",
  thickness = 2,
  glowing = true
}: Props) {
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width: isHorizontal ? "100%" : `${thickness}px`,
        height: isHorizontal ? `${thickness}px` : "100%",
      }}
    >
      {/* Glow effect */}
      {glowing && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: color,
            filter: "blur(8px)",
          }}
          initial={{ 
            scaleX: isHorizontal ? 0 : 1, 
            scaleY: isHorizontal ? 1 : 0,
            opacity: 0 
          }}
          animate={{ 
            scaleX: isVisible ? 1 : 0, 
            scaleY: isVisible ? 1 : 0,
            opacity: isVisible ? 0.6 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      )}
      
      {/* Main line */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: color,
          transformOrigin: isHorizontal ? "left center" : "center top",
        }}
        initial={{ 
          scaleX: isHorizontal ? 0 : 1, 
          scaleY: isHorizontal ? 1 : 0 
        }}
        animate={{ 
          scaleX: isVisible ? 1 : 0, 
          scaleY: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.6, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />
      
      {/* Traveling dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: thickness * 3,
          height: thickness * 3,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
          top: isHorizontal ? "50%" : 0,
          left: isHorizontal ? 0 : "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ 
          [isHorizontal ? "left" : "top"]: "0%",
          opacity: 0 
        }}
        animate={{ 
          [isHorizontal ? "left" : "top"]: isVisible ? "100%" : "0%",
          opacity: isVisible ? [0, 1, 1, 0] : 0
        }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}
