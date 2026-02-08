import { motion } from "framer-motion";

const FloatingOrb = ({ 
  delay, 
  duration, 
  size, 
  x, 
  y, 
  color 
}: { 
  delay: number; 
  duration: number; 
  size: number; 
  x: string; 
  y: string; 
  color: string;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
      filter: 'blur(60px)',
    }}
    animate={{
      x: [0, 50, -30, 20, 0],
      y: [0, -60, 30, -40, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GridLine = ({ 
  orientation, 
  position, 
  delay 
}: { 
  orientation: 'horizontal' | 'vertical'; 
  position: string; 
  delay: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${
      orientation === 'horizontal' 
        ? 'left-0 right-0 h-px' 
        : 'top-0 bottom-0 w-px'
    }`}
    style={{
      [orientation === 'horizontal' ? 'top' : 'left']: position,
      background: orientation === 'horizontal'
        ? 'linear-gradient(90deg, transparent, hsl(var(--slide-accent) / 0.25), transparent)'
        : 'linear-gradient(180deg, transparent, hsl(var(--slide-accent) / 0.25), transparent)',
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.7, 0] }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FloatingDot = ({ 
  x, 
  y, 
  delay 
}: { 
  x: string; 
  y: string; 
  delay: number;
}) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      backgroundColor: 'hsl(var(--slide-accent) / 0.7)',
    }}
    animate={{
      y: [0, -150, -300],
      opacity: [0, 0.9, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 12,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs */}
      <FloatingOrb
        delay={0}
        duration={20}
        size={500}
        x="5%"
        y="15%"
        color="hsl(var(--slide-accent) / 0.2)"
      />
      <FloatingOrb
        delay={3}
        duration={25}
        size={450}
        x="65%"
        y="55%"
        color="hsl(var(--slide-accent) / 0.15)"
      />
      <FloatingOrb
        delay={6}
        duration={22}
        size={400}
        x="45%"
        y="5%"
        color="hsl(215 75% 40% / 0.12)"
      />
      <FloatingOrb
        delay={9}
        duration={28}
        size={350}
        x="80%"
        y="25%"
        color="hsl(var(--slide-accent) / 0.18)"
      />
      
      {/* Subtle grid lines that pulse */}
      <GridLine orientation="horizontal" position="25%" delay={0} />
      <GridLine orientation="horizontal" position="50%" delay={2} />
      <GridLine orientation="horizontal" position="75%" delay={4} />
      <GridLine orientation="vertical" position="20%" delay={1} />
      <GridLine orientation="vertical" position="50%" delay={3} />
      <GridLine orientation="vertical" position="80%" delay={5} />
      
      {/* Floating accent dots */}
      <FloatingDot x="15%" y="80%" delay={0} />
      <FloatingDot x="30%" y="90%" delay={2} />
      <FloatingDot x="45%" y="85%" delay={4} />
      <FloatingDot x="60%" y="95%" delay={6} />
      <FloatingDot x="75%" y="88%" delay={8} />
      <FloatingDot x="90%" y="92%" delay={10} />
      
      {/* Corner accent gradients */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--slide-accent) / 0.2) 0%, hsl(var(--slide-accent) / 0.05) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--slide-accent) / 0.15) 0%, hsl(var(--slide-accent) / 0.04) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, hsl(var(--slide-accent) / 0.1) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
