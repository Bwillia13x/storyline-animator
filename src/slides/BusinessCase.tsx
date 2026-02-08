import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { FloatingCard } from "@/components/animations/FloatingCard";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { GlowingBorder } from "@/components/animations/GlowingBorder";

const { businessCase } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

export function BusinessCase({ isActive, progress }: Props) {
  const showBenefits = progress > 0.08;
  const showCosts = progress > 0.35;
  const showPayback = progress > 0.65;
  const showSensitivities = progress > 0.8;

  return (
    <SlideContainer
      slideNumber={7}
      title="Business Case"
      subtitle="ROI & Assumptions"
      isActive={isActive}
    >
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Benefits */}
        <FloatingCard
          isVisible={showBenefits}
          className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl border border-green-200 p-5 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34 197 94) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
            animate={showBenefits ? { 
              backgroundPosition: ['0px 0px', '20px 20px']
            } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <motion.div
              className="p-1.5 rounded-lg bg-green-100"
              animate={showBenefits ? { 
                boxShadow: ['0 0 0 0 rgb(34 197 94 / 0.4)', '0 0 0 10px rgb(34 197 94 / 0)', '0 0 0 0 rgb(34 197 94 / 0.4)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-5 h-5 text-green-600" />
            </motion.div>
            <h3 className="font-semibold text-green-800">Benefits</h3>
          </div>

          <div className="space-y-3 relative z-10">
            {/* Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showBenefits && progress > 0.12 ? 1 : 0, y: showBenefits && progress > 0.12 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Revenue
              </div>
              {businessCase.benefits.revenue.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-green-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: showBenefits && progress > 0.14 + (idx * 0.02) ? 1 : 0,
                    x: showBenefits && progress > 0.14 + (idx * 0.02) ? 0 : -10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: showBenefits && progress > 0.14 + (idx * 0.02) ? 1 : 0 }}
                    transition={{ duration: 0.2, type: "spring" }}
                  >
                    <ArrowRight className="w-3 h-3 text-green-500" />
                  </motion.div>
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Cost Savings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showBenefits && progress > 0.2 ? 1 : 0, y: showBenefits && progress > 0.2 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Cost Savings
              </div>
              {businessCase.benefits.cost.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-green-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: showBenefits && progress > 0.22 + (idx * 0.02) ? 1 : 0,
                    x: showBenefits && progress > 0.22 + (idx * 0.02) ? 0 : -10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-green-500" /> {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Risk Reduction */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showBenefits && progress > 0.28 ? 1 : 0, y: showBenefits && progress > 0.28 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk Reduction
              </div>
              {businessCase.benefits.risk.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-green-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: showBenefits && progress > 0.3 + (idx * 0.02) ? 1 : 0,
                    x: showBenefits && progress > 0.3 + (idx * 0.02) ? 0 : -10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-green-500" /> {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FloatingCard>

        {/* Costs */}
        <FloatingCard
          isVisible={showCosts}
          delay={0.1}
          className="bg-gradient-to-br from-red-50 to-rose-50/50 rounded-xl border border-red-200 p-5 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
            animate={showCosts ? { 
              backgroundPosition: ['0px 0px', '-20px -20px']
            } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex items-center gap-2 mb-4 relative z-10">
            <motion.div
              className="p-1.5 rounded-lg bg-red-100"
              animate={showCosts ? { 
                boxShadow: ['0 0 0 0 rgb(239 68 68 / 0.4)', '0 0 0 10px rgb(239 68 68 / 0)', '0 0 0 0 rgb(239 68 68 / 0.4)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingDown className="w-5 h-5 text-red-600" />
            </motion.div>
            <h3 className="font-semibold text-red-800">Costs</h3>
          </div>

          <div className="space-y-3 relative z-10">
            {/* One-time */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showCosts && progress > 0.4 ? 1 : 0, y: showCosts && progress > 0.4 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> One-time
              </div>
              {businessCase.costs.oneTime.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-red-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: showCosts && progress > 0.42 + (idx * 0.02) ? 1 : 0,
                    x: showCosts && progress > 0.42 + (idx * 0.02) ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-red-500" /> {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Run costs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showCosts && progress > 0.48 ? 1 : 0, y: showCosts && progress > 0.48 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Run
              </div>
              {businessCase.costs.run.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-red-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: showCosts && progress > 0.5 + (idx * 0.02) ? 1 : 0,
                    x: showCosts && progress > 0.5 + (idx * 0.02) ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-red-500" /> {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Change costs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showCosts && progress > 0.56 ? 1 : 0, y: showCosts && progress > 0.56 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Change
              </div>
              {businessCase.costs.change.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-sm text-red-800 flex items-center gap-1.5 mb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: showCosts && progress > 0.58 + (idx * 0.02) ? 1 : 0,
                    x: showCosts && progress > 0.58 + (idx * 0.02) ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-red-500" /> {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FloatingCard>
      </div>

      {/* Bottom: Payback + Sensitivities */}
      <div className="grid grid-cols-3 gap-4">
        {/* Payback Card */}
        <GlowingBorder isActive={showPayback && progress > 0.7 && progress < 0.8}>
          <motion.div
            className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/30 p-4 flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: showPayback ? 1 : 0, scale: showPayback ? 1 : 0.9 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {/* Sparkle animation */}
            <motion.div
              className="absolute top-2 right-2"
              animate={showPayback ? { 
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-accent/50" />
            </motion.div>
            
            <div className="text-xs text-accent font-medium mb-1">Payback Period</div>
            <motion.div 
              className="text-2xl font-bold text-accent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showPayback ? 1 : 0, y: showPayback ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {businessCase.payback}
            </motion.div>
          </motion.div>
        </GlowingBorder>

        {/* Sensitivities */}
        <FloatingCard
          isVisible={showSensitivities}
          className="col-span-2 bg-slide-card rounded-xl border border-slide-border p-4 shadow-tile"
        >
          <div className="text-xs font-medium text-slide-muted mb-2 flex items-center gap-1.5">
            <motion.div
              animate={showSensitivities ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
            </motion.div>
            Sensitivity Analysis
          </div>
          <div className="flex flex-wrap gap-2">
            {businessCase.sensitivities.map((item, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700 font-medium relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ 
                  opacity: showSensitivities && progress > 0.85 + (idx * 0.03) ? 1 : 0,
                  scale: showSensitivities && progress > 0.85 + (idx * 0.03) ? 1 : 0.8,
                  y: showSensitivities && progress > 0.85 + (idx * 0.03) ? 0 : 10
                }}
                transition={{ duration: 0.4, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: showSensitivities && progress > 0.9 + (idx * 0.03) ? "100%" : "-100%" }}
                  transition={{ duration: 0.6 }}
                />
                {item}
              </motion.span>
            ))}
          </div>
        </FloatingCard>
      </div>
    </SlideContainer>
  );
}
