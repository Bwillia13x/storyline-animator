import { motion, Variants } from "framer-motion";

interface Props {
  text: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
  staggerChildren?: number;
  type?: "words" | "chars";
}

export function TextReveal({ 
  text, 
  isVisible, 
  delay = 0, 
  className = "",
  staggerChildren = 0.03,
  type = "words"
}: Props) {
  const items = type === "words" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ marginRight: type === "words" ? "0.25em" : 0 }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  );
}
