import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Calendar, ArrowRight, GitBranch, Zap, CheckCircle } from "lucide-react";
import { AnimatedLine } from "@/components/animations/AnimatedLine";
import { FloatingCard } from "@/components/animations/FloatingCard";

const { roadmap } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

const waveColors = [
  { border: "border-slate-400", bg: "bg-slate-50", accent: "slate" },
  { border: "border-teal-400", bg: "bg-teal-50/50", accent: "teal" },
  { border: "border-amber-400", bg: "bg-amber-50", accent: "amber" },
  { border: "border-green-400", bg: "bg-green-50", accent: "green" },
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
          <motion.div
            animate={showTimeline ? { rotate: 360 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Calendar className="w-4 h-4 text-slide-muted" />
          </motion.div>
          <span className="text-sm font-medium text-slide-muted">Implementation Waves</span>
        </motion.div>

        {/* Animated Timeline bar */}
        <div className="relative h-2 mb-6">
          <div className="absolute inset-0 bg-slide-border rounded-full" />
          <AnimatedLine 
            isVisible={showTimeline} 
            delay={0.2}
            className="absolute inset-0"
            thickness={8}
            glowing={true}
          />
          
          {/* Timeline dots */}
          {roadmap.waves.map((_, index) => {
            const dotProgress = 0.15 + (index * 0.12);
            const isActive = showTimeline && progress > dotProgress;
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-accent"
                style={{ left: `${(index + 0.5) * 25}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isActive ? 1 : 0, 
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-accent"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Wave Cards */}
        <div className="grid grid-cols-4 gap-4">
          {roadmap.waves.map((wave, index) => {
            const isVisible = showTimeline && progress > 0.15 + (index * 0.12);
            const colors = waveColors[index] || waveColors[0];
            
            return (
              <FloatingCard
                key={wave.name}
                isVisible={isVisible}
                delay={index * 0.05}
                className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-4 relative overflow-hidden`}
                floatIntensity={3}
              >
                {/* Decorative corner accent */}
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20"
                  style={{ background: `hsl(var(--slide-accent))` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <motion.span 
                    className="font-bold text-slide-primary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {wave.name}
                  </motion.span>
                  {wave.valueIncrement && (
                    <motion.span
                      className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={{ 
                        opacity: isVisible && progress > 0.25 + (index * 0.12) ? 1 : 0,
                        scale: isVisible && progress > 0.25 + (index * 0.12) ? 1 : 0.5,
                        rotate: 0
                      }}
                      transition={{ duration: 0.4, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      >
                        <Zap className="w-3 h-3" />
                      </motion.div>
                      {wave.valueIncrement}
                    </motion.span>
                  )}
                </div>
                <motion.div 
                  className="text-xs text-slide-muted mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 0.8 : 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {wave.time}
                </motion.div>
                <ul className="space-y-1.5">
                  {wave.items.map((item, idx) => {
                    const itemVisible = isVisible && progress > 0.2 + (index * 0.12) + (idx * 0.03);
                    return (
                      <motion.li
                        key={idx}
                        className="text-sm text-slide-secondary flex items-start gap-1.5"
                        initial={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                        animate={{ 
                          opacity: itemVisible ? 1 : 0,
                          x: itemVisible ? 0 : -10,
                          filter: itemVisible ? "blur(0px)" : "blur(2px)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: itemVisible ? 1 : 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <ArrowRight className="w-3 h-3 mt-1 text-accent flex-shrink-0" />
                        </motion.div>
                        {item}
                      </motion.li>
                    );
                  })}
                </ul>
              </FloatingCard>
            );
          })}
        </div>
        
        {/* Connecting arrows between waves */}
        <div className="relative h-4 mt-2">
          {[0, 1, 2].map((index) => {
            const arrowVisible = showTimeline && progress > 0.3 + (index * 0.12);
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${(index + 1) * 25 - 2}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: arrowVisible ? 1 : 0, scale: arrowVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={arrowVisible ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 text-accent" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dependencies */}
      <FloatingCard
        isVisible={showDependencies}
        className="bg-slide-card rounded-xl border border-slide-border p-4 shadow-tile"
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={showDependencies ? { rotate: [0, 360] } : {}}
            transition={{ duration: 1 }}
          >
            <GitBranch className="w-4 h-4 text-amber-600" />
          </motion.div>
          <span className="font-semibold text-slide-primary text-sm">Key Dependencies</span>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {roadmap.dependencies.map((dep, idx) => {
            const depVisible = showDependencies && progress > 0.7 + (idx * 0.04);
            return (
              <motion.div
                key={idx}
                className="flex items-center gap-2 text-sm text-slide-secondary"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: depVisible ? 1 : 0, x: depVisible ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-amber-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: depVisible ? 1 : 0 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                />
                {dep}
              </motion.div>
            );
          })}
        </div>
      </FloatingCard>
    </SlideContainer>
  );
}
