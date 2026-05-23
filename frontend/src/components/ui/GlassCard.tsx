import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type GlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "glass-panel control-ring relative overflow-hidden rounded-lg p-5",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-200/60 before:to-transparent",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
