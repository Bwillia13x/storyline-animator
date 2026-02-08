import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { TrendingUp, Users, Wrench, ArrowRight, Target } from "lucide-react";
import { FloatingCard } from "@/components/animations/FloatingCard";
import { AnimatedLine } from "@/components/animations/AnimatedLine";
import { GlowingBorder } from "@/components/animations/GlowingBorder";

const { outcomes } = caseData;

const branchIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  onboarding: Users,
  sales: TrendingUp,
  service: Wrench,
  operations: Wrench,
  finance: TrendingUp,
};

const branchColors = [
  { bg: "bg-blue-50/50", border: "border-blue-200", accent: "blue" },
  { bg: "bg-emerald-50/50", border: "border-emerald-200", accent: "emerald" },
  { bg: "bg-purple-50/50", border: "border-purple-200", accent: "purple" },
];

interface Props {
  isActive: boolean;
  progress: number;
}

export function OutcomesKPITree({ isActive, progress }: Props) {
  const showObjective = progress > 0.08;
  const showBranches = progress > 0.25;

  return (
    <SlideContainer
      slideNumber={2}
      title="Outcomes + KPI Tree"
      subtitle="Baselines & Targets"
      isActive={isActive}
    >
      {/* Objective Ribbon with glow */}
      <GlowingBorder isActive={showObjective && progress > 0.1 && progress < 0.25}>
        <motion.div
          className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border border-accent/20 rounded-xl px-6 py-4 mb-8 flex items-center justify-center gap-3 relative overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: showObjective ? 1 : 0, y: showObjective ? 0 : -20, scale: showObjective ? 1 : 0.95 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* Animated background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            animate={showObjective ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Target className="w-5 h-5 text-accent" />
          </motion.div>
          <motion.span 
            className="text-slide-primary font-medium text-lg relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: showObjective ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            {outcomes.objective}
          </motion.span>
        </motion.div>
      </GlowingBorder>

      {/* Connecting lines from objective to branches */}
      <div className="flex justify-center mb-2">
        <motion.div
          className="w-0.5 h-6 bg-gradient-to-b from-accent/40 to-accent/10 rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: showBranches ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      {/* KPI Tree Branches */}
      <div className="grid grid-cols-3 gap-6">
        {outcomes.branches.map((branch, branchIndex) => {
          const Icon = branchIcons[branch.icon] || TrendingUp;
          const branchVisible = showBranches && progress > 0.25 + (branchIndex * 0.12);
          const colors = branchColors[branchIndex] || branchColors[0];
          
          return (
            <FloatingCard
              key={branch.name}
              isVisible={branchVisible}
              delay={branchIndex * 0.08}
              className={`${colors.bg} ${colors.border} border rounded-xl p-5 shadow-tile relative overflow-hidden`}
              floatIntensity={4}
            >
              {/* Decorative corner gradient */}
              <motion.div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-accent/10 to-transparent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: branchVisible ? 1 : 0, opacity: branchVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              
              {/* Branch Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slide-border/50">
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center relative"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: branchVisible ? 1 : 0, rotate: branchVisible ? 0 : -45 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-accent/30"
                    animate={branchVisible ? { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: branchIndex * 0.3 }}
                  />
                  <Icon className="w-5 h-5 text-accent relative z-10" />
                </motion.div>
                <motion.h3 
                  className="font-semibold text-slide-primary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: branchVisible ? 1 : 0, x: branchVisible ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {branch.name}
                </motion.h3>
              </div>

              {/* KPI Cards */}
              <div className="space-y-3">
                {branch.kpis.map((kpi, kpiIndex) => {
                  const kpiVisible = branchVisible && progress > 0.35 + (branchIndex * 0.12) + (kpiIndex * 0.06);
                  
                  return (
                    <motion.div
                      key={kpi.label}
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/50 relative overflow-hidden"
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ 
                        opacity: kpiVisible ? 1 : 0, 
                        x: kpiVisible ? 0 : -20,
                        scale: kpiVisible ? 1 : 0.95
                      }}
                      transition={{ duration: 0.4, type: "spring", damping: 20 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <motion.div 
                        className="text-sm font-medium text-slide-primary mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: kpiVisible ? 1 : 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {kpi.label}
                      </motion.div>
                      <div className="flex items-center gap-2 text-sm">
                        <motion.span 
                          className="text-slide-muted"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: kpiVisible ? 0.7 : 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          {kpi.base}
                        </motion.span>
                        <motion.div
                          initial={{ scale: 0, x: -5 }}
                          animate={{ scale: kpiVisible ? 1 : 0, x: kpiVisible ? 0 : -5 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4 text-accent" />
                        </motion.div>
                        <motion.span 
                          className="font-bold text-accent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: kpiVisible ? 1 : 0, scale: kpiVisible ? 1 : 0.8 }}
                          transition={{ delay: 0.25, type: "spring" }}
                        >
                          {kpi.target}
                        </motion.span>
                        <motion.span 
                          className="text-slide-muted text-xs ml-auto px-2 py-0.5 bg-slide-badge/50 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: kpiVisible ? 0.6 : 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {kpi.horizon}
                        </motion.span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FloatingCard>
          );
        })}
      </div>
    </SlideContainer>
  );
}
