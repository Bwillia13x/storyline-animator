import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isVisible: boolean;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 1.5, 
  isVisible, 
  className = "" 
}: Props) {
  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  });
  
  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isVisible) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [isVisible, value, spring]);

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}
