import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Calendar, ArrowRight, GitBranch, Zap } from "lucide-react";

const { roadmap } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

const waveColors = [
  "border-slate-300 bg-slate-50",
  "border-accent/40 bg-accent/5",
  "border-amber-300 bg-amber-50",
  "border-green-300 bg-green-50",
];

export function Roadmap({ isActive, progress }: Props) {
  const showTimeline = progress > 0.08;
  const showDependencies = progress > 0.65;

  return (
    <SlideContainer
      slideNumber={6}
      title="Roadmap"
      subtitle="Waves & Dependencies"
      isActive={isActive}
    >
      {/* Timeline */}
      <div className="mb-6">
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: showTimeline ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Calendar className="w-4 h-4 text-slide-muted" />
          <span className="text-sm font-medium text-slide-muted">Implementation Waves</span>
        </motion.div>

        {/* Timeline bar */}
        <motion.div
          className="h-1 bg-slide-border rounded-full mb-6 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showTimeline ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        >
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: showTimeline ? `${Math.min(progress * 120, 100)}%` : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Wave Cards */}
        <div className="grid grid-cols-4 gap-4">
          {roadmap.waves.map((wave, index) => {
            const isVisible = showTimeline && progress > 0.15 + (index * 0.12);
            
            return (
              <motion.div
                key={wave.name}
                className={`rounded-xl border-2 p-4 ${waveColors[index] || waveColors[0]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slide-primary">{wave.name}</span>
                  {wave.valueIncrement && (
                    <motion.span
                      className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: isVisible && progress > 0.25 + (index * 0.12) ? 1 : 0,
                        scale: isVisible && progress > 0.25 + (index * 0.12) ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap className="w-3 h-3" />
                      {wave.valueIncrement}
                    </motion.span>
                  )}
                </div>
                <div className="text-xs text-slide-muted mb-3">{wave.time}</div>
                <ul className="space-y-1.5">
                  {wave.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="text-sm text-slide-secondary flex items-start gap-1.5"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ 
                        opacity: isVisible && progress > 0.2 + (index * 0.12) + (idx * 0.03) ? 1 : 0,
                        x: isVisible && progress > 0.2 + (index * 0.12) + (idx * 0.03) ? 0 : -5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-3 h-3 mt-1 text-slide-muted flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dependencies */}
      <motion.div
        className="bg-slide-card rounded-xl border border-slide-border p-4 shadow-tile"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showDependencies ? 1 : 0, y: showDependencies ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-4 h-4 text-amber-600" />
          <span className="font-semibold text-slide-primary text-sm">Key Dependencies</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {roadmap.dependencies.map((dep, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 text-sm text-slide-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: showDependencies && progress > 0.7 + (idx * 0.04) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {dep}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
