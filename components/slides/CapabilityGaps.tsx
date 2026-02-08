import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Layers, Clock, ArrowRight, CalendarClock } from "lucide-react";

const { capabilities } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

const priorityConfig = {
  now: { label: "Now", color: "bg-green-50 border-green-200 text-green-700", icon: "🎯" },
  next: { label: "Next", color: "bg-amber-50 border-amber-200 text-amber-700", icon: "📋" },
  later: { label: "Later", color: "bg-slate-50 border-slate-200 text-slate-600", icon: "📅" },
};

export function CapabilityGaps({ isActive, progress }: Props) {
  const showTiles = progress > 0.1;
  const showPriority = progress > 0.45;

  return (
    <SlideContainer
      slideNumber={4}
      title="Capability Gaps"
      subtitle="Prioritized"
      isActive={isActive}
    >
      <div className="grid grid-cols-5 gap-6 h-full">
        {/* Left: Capability Tiles */}
        <div className="col-span-3 space-y-3">
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: showTiles ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Layers className="w-4 h-4 text-slide-muted" />
            <span className="text-sm font-medium text-slide-muted">Required Capabilities</span>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {capabilities.tiles.map((tile, index) => {
              const isVisible = showTiles && progress > 0.12 + (index * 0.06);
              
              return (
                <motion.div
                  key={tile.name}
                  className="bg-slide-card rounded-xl border border-slide-border p-4 shadow-tile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 15 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="font-medium text-slide-primary text-sm mb-1">{tile.name}</h4>
                  {tile.description && (
                    <p className="text-xs text-slide-muted">{tile.description}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Priority Bands */}
        <div className="col-span-2">
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: showPriority ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Clock className="w-4 h-4 text-slide-muted" />
            <span className="text-sm font-medium text-slide-muted">Priority Matrix</span>
          </motion.div>

          <div className="space-y-3">
            {(Object.keys(priorityConfig) as Array<keyof typeof priorityConfig>).map((band, bandIndex) => {
              const config = priorityConfig[band];
              const items = capabilities.priority[band];
              const bandVisible = showPriority && progress > 0.5 + (bandIndex * 0.1);

              return (
                <motion.div
                  key={band}
                  className={`rounded-xl border p-4 ${config.color}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: bandVisible ? 1 : 0, x: bandVisible ? 0 : 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{config.icon}</span>
                    <span className="font-semibold text-sm">{config.label}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="text-xs flex items-center gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: bandVisible && progress > 0.55 + (bandIndex * 0.1) + (idx * 0.03) ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-3 h-3" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
