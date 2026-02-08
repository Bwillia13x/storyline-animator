import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, ArrowRight } from "lucide-react";

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
        <motion.div
          className="bg-green-50/50 rounded-xl border border-green-200 p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showBenefits ? 1 : 0, x: showBenefits ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Benefits</h3>
          </div>

          <div className="space-y-3">
            {/* Revenue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showBenefits && progress > 0.12 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Revenue
              </div>
              {businessCase.benefits.revenue.map((item, idx) => (
                <div key={idx} className="text-sm text-green-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>

            {/* Cost Savings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showBenefits && progress > 0.2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Cost Savings
              </div>
              {businessCase.benefits.cost.map((item, idx) => (
                <div key={idx} className="text-sm text-green-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>

            {/* Risk Reduction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showBenefits && progress > 0.28 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-green-600 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk Reduction
              </div>
              {businessCase.benefits.risk.map((item, idx) => (
                <div key={idx} className="text-sm text-green-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Costs */}
        <motion.div
          className="bg-red-50/50 rounded-xl border border-red-200 p-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showCosts ? 1 : 0, x: showCosts ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Costs</h3>
          </div>

          <div className="space-y-3">
            {/* One-time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showCosts && progress > 0.4 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> One-time
              </div>
              {businessCase.costs.oneTime.map((item, idx) => (
                <div key={idx} className="text-sm text-red-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>

            {/* Run costs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showCosts && progress > 0.48 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Run
              </div>
              {businessCase.costs.run.map((item, idx) => (
                <div key={idx} className="text-sm text-red-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>

            {/* Change costs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showCosts && progress > 0.56 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Change
              </div>
              {businessCase.costs.change.map((item, idx) => (
                <div key={idx} className="text-sm text-red-800 flex items-center gap-1.5 mb-1">
                  <ArrowRight className="w-3 h-3" /> {item}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Payback + Sensitivities */}
      <div className="grid grid-cols-3 gap-4">
        {/* Payback Card */}
        <motion.div
          className="bg-accent/10 rounded-xl border border-accent/30 p-4 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showPayback ? 1 : 0, y: showPayback ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-accent font-medium mb-1">Payback Period</div>
          <div className="text-2xl font-bold text-accent">{businessCase.payback}</div>
        </motion.div>

        {/* Sensitivities */}
        <motion.div
          className="col-span-2 bg-slide-card rounded-xl border border-slide-border p-4 shadow-tile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSensitivities ? 1 : 0, y: showSensitivities ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-medium text-slide-muted mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Sensitivity Analysis
          </div>
          <div className="flex flex-wrap gap-2">
            {businessCase.sensitivities.map((item, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700 font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: showSensitivities && progress > 0.85 + (idx * 0.03) ? 1 : 0,
                  scale: showSensitivities && progress > 0.85 + (idx * 0.03) ? 1 : 0.9
                }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideContainer>
  );
}
