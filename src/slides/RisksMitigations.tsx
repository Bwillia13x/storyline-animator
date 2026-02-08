import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { ShieldCheck, AlertCircle } from "lucide-react";

const { risks } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

const riskColors = {
  High: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  Med: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  Low: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
};

export function RisksMitigations({ isActive, progress }: Props) {
  return (
    <SlideContainer
      slideNumber={8}
      title="Risks + Mitigations"
      subtitle="Top 5"
      isActive={isActive}
    >
      <div className="bg-slide-card rounded-xl border border-slide-border shadow-tile overflow-hidden">
        {/* Table Header */}
        <motion.div
          className="grid grid-cols-12 gap-4 px-5 py-3 bg-slide-badge/50 border-b border-slide-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.05 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="col-span-4 text-xs font-semibold text-slide-secondary uppercase tracking-wide">Risk</div>
          <div className="col-span-1 text-xs font-semibold text-slide-secondary uppercase tracking-wide text-center">Likelihood</div>
          <div className="col-span-1 text-xs font-semibold text-slide-secondary uppercase tracking-wide text-center">Impact</div>
          <div className="col-span-6 text-xs font-semibold text-slide-secondary uppercase tracking-wide">Mitigation</div>
        </motion.div>

        {/* Table Rows */}
        {risks.top5.map((risk, index) => {
          const isVisible = progress > 0.1 + (index * 0.14);
          const likelihoodColor = riskColors[risk.likelihood];
          const impactColor = riskColors[risk.impact];

          return (
            <motion.div
              key={index}
              className={`grid grid-cols-12 gap-4 px-5 py-4 items-center ${index < risks.top5.length - 1 ? 'border-b border-slide-border' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Risk */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-amber-600">{index + 1}</span>
                </div>
                <span className="text-sm font-medium text-slide-primary">{risk.risk}</span>
              </div>

              {/* Likelihood */}
              <div className="col-span-1 flex justify-center">
                <motion.span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${likelihoodColor.bg} ${likelihoodColor.text}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isVisible && progress > 0.15 + (index * 0.14) ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {risk.likelihood}
                </motion.span>
              </div>

              {/* Impact */}
              <div className="col-span-1 flex justify-center">
                <motion.span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${impactColor.bg} ${impactColor.text}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isVisible && progress > 0.18 + (index * 0.14) ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {risk.impact}
                </motion.span>
              </div>

              {/* Mitigation */}
              <motion.div
                className="col-span-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible && progress > 0.2 + (index * 0.14) ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-slide-secondary">{risk.mitigation}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-4 flex items-center justify-center gap-2 text-sm text-slide-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.85 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <AlertCircle className="w-4 h-4" />
        <span>Risk register reviewed monthly at steering committee</span>
      </motion.div>
    </SlideContainer>
  );
}
