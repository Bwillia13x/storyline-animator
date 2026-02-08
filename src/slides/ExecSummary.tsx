import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Target, Lightbulb, Shield, CheckCircle2 } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { FloatingCard } from "@/components/animations/FloatingCard";
import { GlowingBorder } from "@/components/animations/GlowingBorder";

const { execSummary } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

export function ExecSummary({ isActive, progress }: Props) {
  const showRecommendation = progress > 0.1;
  const showLogic = progress > 0.35;
  const showChips = progress > 0.6;

  return (
    <SlideContainer
      slideNumber={1}
      title="Executive Summary"
      subtitle="Recommendation & Logic"
      isActive={isActive}
    >
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left: Recommendation */}
        <GlowingBorder isActive={showRecommendation && progress > 0.2 && progress < 0.35}>
          <FloatingCard
            isVisible={showRecommendation}
            className="bg-slide-card rounded-xl border border-slide-border p-6 shadow-tile relative z-10"
            hoverEffect={false}
          >
            <motion.div 
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: showRecommendation ? 1 : 0, y: showRecommendation ? 0 : -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"
                animate={showRecommendation ? { 
                  boxShadow: ["0 0 0 0 hsla(var(--slide-accent), 0)", "0 0 20px 5px hsla(var(--slide-accent), 0.3)", "0 0 0 0 hsla(var(--slide-accent), 0)"]
                } : {}}
                transition={{ duration: 2, repeat: showRecommendation && progress < 0.35 ? Infinity : 0 }}
              >
                <Target className="w-5 h-5 text-accent" />
              </motion.div>
              <h3 className="text-lg font-semibold text-slide-primary">Recommendation</h3>
            </motion.div>
            
            <ul className="space-y-4">
              {execSummary.recommendation.map((item, index) => {
                const itemVisible = showRecommendation && progress > 0.12 + (index * 0.08);
                return (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: itemVisible ? 1 : 0,
                      x: itemVisible ? 0 : -20
                    }}
                    transition={{ duration: 0.5, type: "spring", damping: 20 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: itemVisible ? 1 : 0, rotate: itemVisible ? 0 : -180 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-slide-secondary text-[15px] leading-relaxed">{item}</span>
                  </motion.li>
                );
              })}
            </ul>
          </FloatingCard>
        </GlowingBorder>

        {/* Right: Logic */}
        <GlowingBorder 
          isActive={showLogic && progress > 0.45 && progress < 0.6}
          glowColor="hsl(45 93% 47%)"
        >
          <FloatingCard
            isVisible={showLogic}
            delay={0.1}
            className="bg-slide-card rounded-xl border border-slide-border p-6 shadow-tile relative z-10"
            hoverEffect={false}
          >
            <motion.div 
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: showLogic ? 1 : 0, y: showLogic ? 0 : -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"
                animate={showLogic && progress < 0.6 ? { 
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-slide-primary">Why This Works</h3>
            </motion.div>
            
            <ul className="space-y-4">
              {execSummary.logic.map((item, index) => {
                const itemVisible = showLogic && progress > 0.37 + (index * 0.08);
                return (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                    animate={{ 
                      opacity: itemVisible ? 1 : 0,
                      x: itemVisible ? 0 : 20,
                      filter: itemVisible ? "blur(0px)" : "blur(4px)"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-slide-badge flex items-center justify-center flex-shrink-0 mt-0.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: itemVisible ? 1 : 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <span className="text-xs font-semibold text-slide-secondary">{index + 1}</span>
                    </motion.div>
                    <span className="text-slide-secondary text-[15px] leading-relaxed">{item}</span>
                  </motion.li>
                );
              })}
            </ul>
          </FloatingCard>
        </GlowingBorder>
      </div>

      {/* Bottom: Constraint Chips */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showChips ? 1 : 0, y: showChips ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={showChips ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-4 h-4 text-slide-muted" />
        </motion.div>
        <span className="text-sm text-slide-muted mr-2">Constraints:</span>
        {execSummary.constraintsChips.map((chip, index) => (
          <motion.span
            key={index}
            className="px-3 py-1.5 bg-slide-badge rounded-full text-sm font-medium text-slide-secondary border border-slide-border relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ 
              opacity: showChips && progress > 0.65 + (index * 0.05) ? 1 : 0,
              scale: showChips && progress > 0.65 + (index * 0.05) ? 1 : 0.8,
              y: showChips && progress > 0.65 + (index * 0.05) ? 0 : 10
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: showChips && progress > 0.7 + (index * 0.05) ? "100%" : "-100%" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            />
            {chip}
          </motion.span>
        ))}
      </motion.div>
    </SlideContainer>
  );
}
