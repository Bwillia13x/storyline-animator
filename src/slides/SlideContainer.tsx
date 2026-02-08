import { motion } from "framer-motion";
import { ReactNode } from "react";

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
            <span className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-semibold">
              {slideNumber}
            </span>
            <h1 className="text-2xl font-semibold text-slide-primary tracking-tight">
              {title}
            </h1>
          </motion.div>
          <motion.p
            className="text-slide-muted text-base ml-11"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </motion.div>
  );
}
