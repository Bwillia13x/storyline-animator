import { motion } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Calendar, CheckSquare, ArrowRight, Rocket } from "lucide-react";

const { next30 } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

export function Next30Days({ isActive, progress }: Props) {
  const showWeeks = progress > 0.08;
  const showOutputs = progress > 0.6;

  return (
    <SlideContainer
      slideNumber={9}
      title="Next 30 Days"
      subtitle="Mobilization"
      isActive={isActive}
    >
      {/* Week Columns */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {next30.workplan.map((week, weekIndex) => {
          const weekVisible = showWeeks && progress > 0.12 + (weekIndex * 0.15);
          
          return (
            <motion.div
              key={week.week}
              className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: weekVisible ? 1 : 0, y: weekVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slide-border">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="font-semibold text-slide-primary">{week.week}</span>
              </div>
              
              <ul className="space-y-3">
                {week.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-slide-secondary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: weekVisible && progress > 0.2 + (weekIndex * 0.15) + (idx * 0.04) ? 1 : 0,
                      x: weekVisible && progress > 0.2 + (weekIndex * 0.15) + (idx * 0.04) ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 mt-1 text-slide-muted flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Outputs Checklist */}
      <motion.div
        className="bg-accent/5 rounded-xl border border-accent/20 p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showOutputs ? 1 : 0, y: showOutputs ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-accent" />
          <span className="font-semibold text-slide-primary">Deliverables by Day 30</span>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {next30.outputs.map((output, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 bg-white rounded-lg border border-accent/20 px-3 py-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: showOutputs && progress > 0.65 + (idx * 0.05) ? 1 : 0,
                scale: showOutputs && progress > 0.65 + (idx * 0.05) ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: showOutputs && progress > 0.7 + (idx * 0.05) ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
              >
                <CheckSquare className="w-4 h-4 text-accent flex-shrink-0" />
              </motion.div>
              <span className="text-sm text-slide-primary font-medium">{output}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
