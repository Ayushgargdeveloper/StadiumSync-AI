import type { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "../../utils/cn";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "emerald" | "amber" | "rose";
  icon: LucideIcon;
};

const toneStyles = {
  cyan: "from-cyan-300/25 text-cyan-200",
  emerald: "from-emerald-300/25 text-emerald-200",
  amber: "from-amber-300/25 text-amber-200",
  rose: "from-rose-300/25 text-rose-200"
};

export function MetricCard({
  label,
  value,
  detail,
  tone = "cyan",
  icon: Icon
}: MetricCardProps) {
  return (
    <GlassCard className="min-h-36">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div
          className={cn(
            "rounded-lg bg-gradient-to-br to-white/5 p-3 shadow-glow",
            toneStyles[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-300">{detail}</p>
    </GlassCard>
  );
}
