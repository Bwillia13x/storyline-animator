import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Target, Lightbulb, Shield, CheckCircle2 } from "lucide-react";

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
        <motion.div
          className="bg-slide-card rounded-xl border border-slide-border p-6 shadow-tile"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showRecommendation ? 1 : 0, x: showRecommendation ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-slide-primary">Recommendation</h3>
          </div>
          
          <ul className="space-y-4">
            {execSummary.recommendation.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: showRecommendation && progress > 0.1 + (index * 0.08) ? 1 : 0,
                  x: showRecommendation && progress > 0.1 + (index * 0.08) ? 0 : -10
                }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slide-secondary text-[15px] leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Logic */}
        <motion.div
          className="bg-slide-card rounded-xl border border-slide-border p-6 shadow-tile"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showLogic ? 1 : 0, x: showLogic ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slide-primary">Why This Works</h3>
          </div>
          
          <ul className="space-y-4">
            {execSummary.logic.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: showLogic && progress > 0.35 + (index * 0.08) ? 1 : 0,
                  x: showLogic && progress > 0.35 + (index * 0.08) ? 0 : 10
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-6 h-6 rounded-full bg-slide-badge flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-slide-secondary">{index + 1}</span>
                </div>
                <span className="text-slide-secondary text-[15px] leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom: Constraint Chips */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showChips ? 1 : 0, y: showChips ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <Shield className="w-4 h-4 text-slide-muted" />
        <span className="text-sm text-slide-muted mr-2">Constraints:</span>
        {execSummary.constraintsChips.map((chip, index) => (
          <motion.span
            key={index}
            className="px-3 py-1.5 bg-slide-badge rounded-full text-sm font-medium text-slide-secondary border border-slide-border"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: showChips && progress > 0.65 + (index * 0.05) ? 1 : 0,
              scale: showChips && progress > 0.65 + (index * 0.05) ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
          >
            {chip}
          </motion.span>
        ))}
      </motion.div>
    </SlideContainer>
  );
}
