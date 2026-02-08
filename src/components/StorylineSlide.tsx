import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { storylineConfig, accentColors } from "@/config/storyline";

const { title, subtitle, tiles, footerLabel, theme } = storylineConfig;
const accent = accentColors[theme.accentColor];

// Animation timing constants (in seconds)
const HEADER_START = 0;
const HEADER_DURATION = 1.5;
const TILES_START = 1.5;
const TILE_STAGGER = 0.25;
const TILES_COMPLETE = TILES_START + (tiles.length * TILE_STAGGER) + 0.5; // ~4.25s
const SPOTLIGHT_START = TILES_COMPLETE + 0.5;
const SPOTLIGHT_DURATION_PER_TILE = 0.85;
const SPOTLIGHT_COMPLETE = SPOTLIGHT_START + (tiles.length * SPOTLIGHT_DURATION_PER_TILE);
const HOLD_DURATION = theme.animationDuration - SPOTLIGHT_COMPLETE;
const TOTAL_DURATION = theme.animationDuration;

export default function StorylineSlide() {
  const [currentTime, setCurrentTime] = useState(0);
  const [spotlightIndex, setSpotlightIndex] = useState(-1);
  const [isLooping, setIsLooping] = useState(true);

  // Animation loop
  useEffect(() => {
    if (!isLooping) return;
    
    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = ((Date.now() - startTime) / 1000) % TOTAL_DURATION;
      setCurrentTime(elapsed);

      // Calculate spotlight index
      if (elapsed >= SPOTLIGHT_START && elapsed < SPOTLIGHT_COMPLETE) {
        const spotlightProgress = elapsed - SPOTLIGHT_START;
        const index = Math.floor(spotlightProgress / SPOTLIGHT_DURATION_PER_TILE);
        setSpotlightIndex(Math.min(index, tiles.length - 1));
      } else if (elapsed >= SPOTLIGHT_COMPLETE) {
        setSpotlightIndex(-1); // All tiles visible, no spotlight
      } else {
        setSpotlightIndex(-1);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isLooping]);

  const getTileDelay = (index: number) => TILES_START + (index * TILE_STAGGER);
  const isTileVisible = (index: number) => currentTime >= getTileDelay(index);
  const isHeaderVisible = currentTime >= HEADER_START;

  return (
    <div 
      className="relative w-full h-screen bg-slide overflow-hidden flex items-center justify-center"
      style={{
        '--accent-primary': accent.primary,
        '--accent-glow': accent.glow,
      } as React.CSSProperties}
    >
      {/* Paper grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-16 py-12">
        
        {/* Header Section */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHeaderVisible ? 1 : 0, 
            y: isHeaderVisible ? 0 : 20 
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-slide-title font-semibold text-slide-primary tracking-tight mb-3">
            {title}
          </h1>
          <motion.p 
            className="text-slide-subtitle text-slide-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHeaderVisible ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Tiles Grid - 3x3 */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {tiles.map((tile, index) => (
            <AgendaTile
              key={tile.number}
              tile={tile}
              isVisible={isTileVisible(index)}
              isSpotlit={spotlightIndex === index}
              delay={getTileDelay(index) - currentTime}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentTime >= TILES_COMPLETE ? 0.7 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slide-footer text-slide-muted italic">
            {footerLabel}
          </p>
        </motion.div>
      </div>

      {/* Loop indicator (subtle) */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <div className="w-24 h-1 bg-slide-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent rounded-full"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

interface AgendaTileProps {
  tile: { number: number; header: string; subline: string };
  isVisible: boolean;
  isSpotlit: boolean;
  delay: number;
}

function AgendaTile({ tile, isVisible, isSpotlit }: AgendaTileProps) {
  return (
    <motion.div
      className={`
        relative bg-slide-card rounded-xl border border-slide-border
        p-6 transition-all duration-300
        ${isSpotlit ? 'shadow-spotlight border-accent' : 'shadow-tile'}
      `}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.98,
        y: isSpotlit ? -2 : 0,
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Number badge */}
      <motion.div
        className={`
          inline-flex items-center justify-center w-8 h-8 rounded-lg mb-4
          text-sm font-semibold transition-colors duration-300
          ${isSpotlit 
            ? 'bg-accent text-white' 
            : 'bg-slide-badge text-slide-secondary'
          }
        `}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0.8, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      >
        {tile.number}
      </motion.div>

      {/* Header */}
      <h3 className={`
        text-slide-tile-header font-semibold text-slide-primary mb-1
        transition-colors duration-300
        ${isSpotlit ? 'text-accent' : ''}
      `}>
        {tile.header}
        {isSpotlit && (
          <motion.div 
            className="h-0.5 bg-accent mt-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </h3>

      {/* Subline */}
      <motion.p
        className="text-slide-tile-subline text-slide-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        ({tile.subline})
      </motion.p>
    </motion.div>
  );
}
