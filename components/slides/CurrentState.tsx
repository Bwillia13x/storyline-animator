import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { AlertTriangle } from "lucide-react";

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
            <motion.div
              key={cause.id}
              className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile flex items-start gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Number badge */}
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-red-600">{cause.id}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slide-primary mb-1">{cause.label}</h3>
                    <p className="text-sm text-slide-muted">{cause.evidence}</p>
                  </div>
                  
                  {/* KPI Drag Tag */}
                  {cause.kpiDrag && (
                    <motion.div
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-100 rounded-full flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: isVisible && progress > 0.15 + (index * 0.12) ? 1 : 0,
                        scale: isVisible && progress > 0.15 + (index * 0.12) ? 1 : 0.9
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs font-medium text-red-600">{cause.kpiDrag}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideContainer>
  );
}
