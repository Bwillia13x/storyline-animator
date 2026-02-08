import { motion } from "framer-motion";
import { ReactNode } from "react";
import { TextReveal } from "@/components/animations/TextReveal";

interface Props {
  slideNumber: number;
  title: string;
  subtitle: string;
  isActive: boolean;
  children: ReactNode;
}

export function SlideContainer({ slideNumber, title, subtitle, isActive, children }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Animated slide number badge */}
            <motion.span 
              className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-bold relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isActive ? 1 : 0, rotate: isActive ? 0 : -180 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              {/* Shimmer effect on number */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isActive ? "100%" : "-100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <span className="relative z-10">{slideNumber}</span>
            </motion.span>
            
            {/* Animated title */}
            <motion.h1 
              className="text-2xl font-semibold text-slide-primary tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {title}
            </motion.h1>
          </motion.div>
          
          {/* Animated subtitle with underline */}
          <motion.div
            className="ml-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <motion.p className="text-slide-muted text-base">
              {subtitle}
            </motion.p>
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-accent/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isActive ? "100%" : 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Content with subtle entrance */}
      <motion.div 
        className="flex-1 min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
