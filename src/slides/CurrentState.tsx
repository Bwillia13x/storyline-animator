import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { AlertTriangle, Shield, CheckCircle } from "lucide-react";
import { FloatingCard } from "@/components/animations/FloatingCard";

const { currentState } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

export function CurrentState({ isActive, progress }: Props) {
  return (
    <SlideContainer
      slideNumber={3}
      title="Current State"
      subtitle="Root Causes Only"
      isActive={isActive}
    >
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        {currentState.rootCauses.map((cause, index) => {
          const isVisible = progress > 0.1 + (index * 0.12);
          
          return (
            <FloatingCard
              key={cause.id}
              isVisible={isVisible}
              delay={index * 0.05}
              className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile"
              floatIntensity={3}
            >
              <div className="flex items-start gap-4">
                {/* Animated number badge */}
                <motion.div 
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: isVisible ? 1 : 0, rotate: isVisible ? 0 : -90 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-200"
                    animate={isVisible ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <span className="text-lg font-bold text-red-600 relative z-10">{cause.id}</span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <motion.h3 
                        className="font-semibold text-slide-primary mb-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {cause.label}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-slide-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 0.8 : 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        {cause.evidence}
                      </motion.p>
                    </div>
                    
                    {/* KPI Drag Tag with animation */}
                    {cause.kpiDrag && (
                      <motion.div
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full flex-shrink-0 relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ 
                          opacity: isVisible && progress > 0.15 + (index * 0.12) ? 1 : 0,
                          scale: isVisible && progress > 0.15 + (index * 0.12) ? 1 : 0.8,
                          x: isVisible && progress > 0.15 + (index * 0.12) ? 0 : 20
                        }}
                        transition={{ duration: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: isVisible && progress > 0.2 + (index * 0.12) ? "100%" : "-100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        </motion.div>
                        <span className="text-xs font-medium text-red-600">{cause.kpiDrag}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connecting line to next item */}
              {index < currentState.rootCauses.length - 1 && (
                <motion.div
                  className="absolute left-[1.875rem] bottom-0 w-0.5 h-4 bg-gradient-to-b from-red-200 to-transparent -mb-4 z-10"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  style={{ transformOrigin: 'top' }}
                />
              )}
            </FloatingCard>
          );
        })}
      </div>
    </SlideContainer>
  );
}
