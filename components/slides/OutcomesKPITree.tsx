import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { TrendingUp, Users, Wrench, ArrowRight } from "lucide-react";

const { outcomes } = caseData;

const branchIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  onboarding: Users,
  sales: TrendingUp,
  service: Wrench,
  operations: Wrench,
  finance: TrendingUp,
};

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
      {/* Objective Ribbon */}
      <motion.div
        className="bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 mb-8 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showObjective ? 1 : 0, y: showObjective ? 0 : -10 }}
        transition={{ duration: 0.5 }}
      >
        <TrendingUp className="w-5 h-5 text-accent" />
        <span className="text-slide-primary font-medium text-lg">{outcomes.objective}</span>
      </motion.div>

      {/* KPI Tree Branches */}
      <div className="grid grid-cols-3 gap-6">
        {outcomes.branches.map((branch, branchIndex) => {
          const Icon = branchIcons[branch.icon] || TrendingUp;
          const branchVisible = showBranches && progress > 0.25 + (branchIndex * 0.12);
          
          return (
            <motion.div
              key={branch.name}
              className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: branchVisible ? 1 : 0, y: branchVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Branch Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slide-border">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-accent" />
                </div>
                <h3 className="font-semibold text-slide-primary">{branch.name}</h3>
              </div>

              {/* KPI Cards */}
              <div className="space-y-3">
                {branch.kpis.map((kpi, kpiIndex) => {
                  const kpiVisible = branchVisible && progress > 0.35 + (branchIndex * 0.12) + (kpiIndex * 0.06);
                  
                  return (
                    <motion.div
                      key={kpi.label}
                      className="bg-slide-badge/50 rounded-lg p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: kpiVisible ? 1 : 0, x: kpiVisible ? 0 : -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-sm font-medium text-slide-primary mb-2">{kpi.label}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slide-muted">{kpi.base}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                        <span className="font-semibold text-accent">{kpi.target}</span>
                        <span className="text-slide-muted text-xs ml-auto">{kpi.horizon}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideContainer>
  );
}
