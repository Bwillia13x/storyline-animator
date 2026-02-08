import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseData } from "@/config/caseTemplate";
import { ExecSummary } from "@/slides/ExecSummary";
import { OutcomesKPITree } from "@/slides/OutcomesKPITree";
import { CurrentState } from "@/slides/CurrentState";
import { CapabilityGaps } from "@/slides/CapabilityGaps";
import { TOMArch } from "@/slides/TOMArch";
import { Roadmap } from "@/slides/Roadmap";
import { BusinessCase } from "@/slides/BusinessCase";
import { RisksMitigations } from "@/slides/RisksMitigations";
import { Next30Days } from "@/slides/Next30Days";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react";

const SLIDE_DURATION = 9; // seconds per slide
const TOTAL_SLIDES = 9;

const slides = [
  { Component: ExecSummary, title: "Exec Summary" },
  { Component: OutcomesKPITree, title: "Outcomes + KPI Tree" },
  { Component: CurrentState, title: "Current State" },
  { Component: CapabilityGaps, title: "Capability Gaps" },
  { Component: TOMArch, title: "TOM + Arch" },
  { Component: Roadmap, title: "Roadmap" },
  { Component: BusinessCase, title: "Business Case" },
  { Component: RisksMitigations, title: "Risks + Mitigations" },
  { Component: Next30Days, title: "Next 30 Days" },
];

export function Deck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const startProgress = slideProgress;
    let animationFrame: number;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = startProgress + (elapsed / SLIDE_DURATION);

      if (newProgress >= 1) {
        // Move to next slide
        if (isAutoMode) {
          if (currentSlide < TOTAL_SLIDES - 1) {
            setCurrentSlide(prev => prev + 1);
            setSlideProgress(0);
          } else {
            // Loop back to start
            setCurrentSlide(0);
            setSlideProgress(0);
          }
        } else {
          setSlideProgress(1);
          setIsPlaying(false);
        }
      } else {
        setSlideProgress(newProgress);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, currentSlide, slideProgress, isAutoMode]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setSlideProgress(0);
    setIsPlaying(true);
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const restart = useCallback(() => {
    setCurrentSlide(0);
    setSlideProgress(0);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "r") {
        restart();
      } else if (e.key === "p") {
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, restart, togglePlay]);

  return (
    <div className="relative w-full h-screen bg-slide overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Paper grain texture */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Client info header */}
      <motion.div
        className="absolute top-4 right-6 z-20 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-sm font-medium text-slide-primary">{caseData.clientName}</div>
        <div className="text-xs text-slide-muted">{caseData.date}</div>
      </motion.div>

      {/* Slides with enhanced transitions */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 0.98,
              filter: currentSlide === index ? "blur(0px)" : "blur(4px)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ pointerEvents: currentSlide === index ? 'auto' : 'none' }}
          >
            <slide.Component
              isActive={currentSlide === index}
              progress={currentSlide === index ? slideProgress : 0}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Slide indicators with glow effect */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg border border-slide-border/50">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-10 h-2.5 rounded-full transition-all duration-300 overflow-hidden ${
                index === currentSlide 
                  ? 'bg-accent/20' 
                  : index < currentSlide 
                    ? 'bg-accent/50' 
                    : 'bg-slide-border hover:bg-slide-muted/50'
              }`}
              title={slide.title}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Progress fill for current slide */}
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: slideProgress }}
                  style={{ transformOrigin: 'left' }}
                  transition={{ duration: 0.1 }}
                />
              )}
              
              {/* Glow effect for current */}
              {index === currentSlide && (
                <motion.div
                  className="absolute -inset-1 rounded-full bg-accent/30 blur-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Completed checkmark dot */}
              {index < currentSlide && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Playback controls with hover effects */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-slide-border/50">
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 text-slide-secondary" />
          </motion.button>
          
          <motion.button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-accent/10 transition-colors relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Pulsing ring when playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            {isPlaying ? (
              <Pause className="w-4 h-4 text-accent" />
            ) : (
              <Play className="w-4 h-4 text-slide-secondary" />
            )}
          </motion.button>

          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className="p-2 rounded-full hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-slide-secondary" />
          </motion.button>

          <div className="w-px h-5 bg-slide-border mx-1" />

          <motion.button
            onClick={restart}
            className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.1, rotate: -180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-4 h-4 text-slide-secondary" />
          </motion.button>
        </div>
      </motion.div>

      {/* Slide number */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="text-sm font-medium text-slide-muted">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </div>
      </div>

      {/* Keyboard hint */}
      <motion.div
        className="absolute bottom-6 left-6 z-20 text-xs text-slide-muted/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ← → to navigate • P to pause • R to restart
      </motion.div>
    </div>
  );
}
