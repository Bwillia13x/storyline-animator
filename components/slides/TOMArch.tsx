import { motion } from "framer-motion";
import { caseData } from "@/lib/config/caseTemplate";
import { SlideContainer } from "./SlideContainer";
import { Users, Shield, Database, Settings, CheckCircle2, ShoppingBag, Code } from "lucide-react";

const { tomArch } = caseData;

interface Props {
  isActive: boolean;
  progress: number;
}

export function TOMArch({ isActive, progress }: Props) {
  const showTOM = progress > 0.08;
  const showPrinciples = progress > 0.4;
  const showBuildBuy = progress > 0.7;

  return (
    <SlideContainer
      slideNumber={5}
      title="TOM + Architecture"
      subtitle="Build/Buy Stance"
      isActive={isActive}
    >
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left: TOM */}
        <motion.div
          className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showTOM ? 1 : 0, x: showTOM ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-slide-primary">Target Operating Model</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Business Owners */}
            <motion.div
              className="bg-slide-badge/50 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: showTOM && progress > 0.15 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-slide-muted mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Business Owners
              </div>
              {tomArch.tom.businessOwners.map((owner, idx) => (
                <div key={idx} className="text-sm text-slide-primary">{owner}</div>
              ))}
            </motion.div>

            {/* Product Owners */}
            <motion.div
              className="bg-slide-badge/50 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: showTOM && progress > 0.2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-slide-muted mb-1.5 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" />
                Product Owners
              </div>
              {tomArch.tom.productOwners.map((owner, idx) => (
                <div key={idx} className="text-sm text-slide-primary">{owner}</div>
              ))}
            </motion.div>

            {/* Data Owner */}
            <motion.div
              className="bg-slide-badge/50 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: showTOM && progress > 0.25 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-slide-muted mb-1.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Data Owner
              </div>
              <div className="text-sm text-slide-primary">{tomArch.tom.dataOwner}</div>
            </motion.div>

            {/* Security Owner */}
            <motion.div
              className="bg-slide-badge/50 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: showTOM && progress > 0.3 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-slide-muted mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Security Owner
              </div>
              <div className="text-sm text-slide-primary">{tomArch.tom.securityOwner}</div>
            </motion.div>
          </div>

          {/* Cadence */}
          <motion.div
            className="pt-3 border-t border-slide-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: showTOM && progress > 0.35 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xs text-slide-muted mb-2">Governance Cadence</div>
            <div className="flex flex-wrap gap-2">
              {tomArch.tom.cadence.map((item, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Principles */}
        <motion.div
          className="bg-slide-card rounded-xl border border-slide-border p-5 shadow-tile"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showPrinciples ? 1 : 0, x: showPrinciples ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-slide-primary">Architecture Principles</h3>
          </div>

          <ul className="space-y-3">
            {tomArch.principles.map((principle, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: showPrinciples && progress > 0.45 + (idx * 0.06) ? 1 : 0,
                  x: showPrinciples && progress > 0.45 + (idx * 0.06) ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slide-secondary">{principle}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom: Build/Buy Stance */}
      <motion.div
        className="bg-gradient-to-r from-accent/5 to-amber-50/50 rounded-xl border border-accent/20 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showBuildBuy ? 1 : 0, y: showBuildBuy ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag className="w-4 h-4 text-accent" />
          <span className="font-semibold text-slide-primary text-sm">Build/Buy Stance</span>
        </div>
        <div className="flex gap-4">
          {tomArch.buildBuy.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 text-sm text-slide-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: showBuildBuy && progress > 0.75 + (idx * 0.05) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Code className="w-3.5 h-3.5 text-accent" />
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideContainer>
  );
}
