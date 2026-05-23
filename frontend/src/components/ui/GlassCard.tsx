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
      className={cn("glass-panel rounded-lg p-5 control-ring", className)}
    >
      {children}
    </motion.section>
  );
}
