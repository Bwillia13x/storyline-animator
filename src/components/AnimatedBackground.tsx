import { motion } from "framer-motion";
import { MorphingShape } from "@/components/animations/MorphingShape";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";

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
        ? 'linear-gradient(90deg, transparent, hsl(var(--slide-accent) / 0.3), transparent)'
        : 'linear-gradient(180deg, transparent, hsl(var(--slide-accent) / 0.3), transparent)',
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.8, 0] }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FloatingDot = ({ 
  x, 
  y, 
  delay,
  size = 4 
}: { 
  x: string; 
  y: string; 
  delay: number;
  size?: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      backgroundColor: 'hsl(var(--slide-accent))',
      boxShadow: '0 0 10px hsl(var(--slide-accent) / 0.8)',
    }}
    animate={{
      y: [0, -200, -400],
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Glowing particles that drift across
const GlowingParticle = ({ delay, startX }: { delay: number; startX: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full pointer-events-none"
    style={{
      left: startX,
      top: '100%',
      background: 'hsl(var(--slide-accent))',
      boxShadow: '0 0 20px 5px hsl(var(--slide-accent) / 0.6)',
    }}
    animate={{
      y: [0, -1200],
      x: [0, Math.random() * 100 - 50],
      opacity: [0, 0.8, 0.6, 0],
      scale: [0.5, 1, 0.8, 0.3],
    }}
    transition={{
      duration: 15,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Morphing geometric shapes */}
      <ParallaxLayer mouseParallax intensity={10} speed={0.3} className="absolute inset-0">
        <MorphingShape 
          isActive={true}
          className="absolute top-20 left-[10%]"
          size={300}
          color="hsl(var(--slide-accent) / 0.08)"
        />
        <MorphingShape 
          isActive={true}
          className="absolute bottom-40 right-[15%]"
          size={250}
          color="hsl(var(--slide-accent) / 0.06)"
        />
      </ParallaxLayer>
      
      {/* Subtle gradient orbs with parallax */}
      <ParallaxLayer mouseParallax intensity={15} speed={0.5} className="absolute inset-0">
        <FloatingOrb
          delay={0}
          duration={20}
          size={600}
          x="0%"
          y="10%"
          color="hsl(var(--slide-accent) / 0.25)"
        />
        <FloatingOrb
          delay={3}
          duration={25}
          size={500}
          x="60%"
          y="50%"
          color="hsl(var(--slide-accent) / 0.2)"
        />
      </ParallaxLayer>
      
      <ParallaxLayer mouseParallax intensity={8} speed={0.2} className="absolute inset-0">
        <FloatingOrb
          delay={6}
          duration={22}
          size={450}
          x="40%"
          y="0%"
          color="hsl(215 75% 50% / 0.15)"
        />
        <FloatingOrb
          delay={9}
          duration={28}
          size={400}
          x="75%"
          y="20%"
          color="hsl(var(--slide-accent) / 0.22)"
        />
      </ParallaxLayer>
      
      {/* Animated grid lines */}
      <GridLine orientation="horizontal" position="20%" delay={0} />
      <GridLine orientation="horizontal" position="45%" delay={2} />
      <GridLine orientation="horizontal" position="70%" delay={4} />
      <GridLine orientation="vertical" position="15%" delay={1} />
      <GridLine orientation="vertical" position="45%" delay={3} />
      <GridLine orientation="vertical" position="75%" delay={5} />
      
      {/* Rising particles */}
      <FloatingDot x="10%" y="85%" delay={0} size={5} />
      <FloatingDot x="25%" y="90%" delay={1.5} size={4} />
      <FloatingDot x="40%" y="88%" delay={3} size={6} />
      <FloatingDot x="55%" y="92%" delay={4.5} size={4} />
      <FloatingDot x="70%" y="86%" delay={6} size={5} />
      <FloatingDot x="85%" y="90%" delay={7.5} size={4} />
      
      {/* Glowing traveling particles */}
      <GlowingParticle delay={0} startX="20%" />
      <GlowingParticle delay={5} startX="50%" />
      <GlowingParticle delay={10} startX="80%" />
      
      {/* Large corner accent gradients */}
      <motion.div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--slide-accent) / 0.25) 0%, hsl(var(--slide-accent) / 0.08) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--slide-accent) / 0.2) 0%, hsl(var(--slide-accent) / 0.05) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 1, 0.6],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sweeping light beam */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 20%, hsl(var(--slide-accent) / 0.15) 50%, transparent 80%)',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['300% 0%', '-300% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Secondary shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(-45deg, transparent 40%, hsl(var(--slide-accent) / 0.08) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['200% 200%', '-200% -200%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
