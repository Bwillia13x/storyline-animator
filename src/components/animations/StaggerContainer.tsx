import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isVisible: boolean;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur";
}

const getVariants = (direction: Props["direction"]): Variants => {
  const baseHidden = { opacity: 0 };
  const baseVisible = { 
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
    }
  };

  switch (direction) {
    case "up":
      return {
        hidden: { ...baseHidden, y: 30 },
        visible: { ...baseVisible, y: 0 },
      };
    case "down":
      return {
        hidden: { ...baseHidden, y: -30 },
        visible: { ...baseVisible, y: 0 },
      };
    case "left":
      return {
        hidden: { ...baseHidden, x: 30 },
        visible: { ...baseVisible, x: 0 },
      };
    case "right":
      return {
        hidden: { ...baseHidden, x: -30 },
        visible: { ...baseVisible, x: 0 },
      };
    case "scale":
      return {
        hidden: { ...baseHidden, scale: 0.8 },
        visible: { ...baseVisible, scale: 1 },
      };
    case "blur":
      return {
        hidden: { ...baseHidden, filter: "blur(10px)", scale: 0.95 },
        visible: { ...baseVisible, filter: "blur(0px)", scale: 1 },
      };
    default:
      return {
        hidden: baseHidden,
        visible: baseVisible,
      };
  }
};

export function StaggerContainer({ 
  children, 
  isVisible, 
  delay = 0,
  staggerChildren = 0.1,
  className = "",
  direction = "up"
}: Props) {
  const childVariants = getVariants(direction);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
