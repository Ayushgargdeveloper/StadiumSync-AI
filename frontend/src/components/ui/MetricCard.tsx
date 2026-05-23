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
    <GlassCard className="min-h-36 bg-gradient-to-br from-white/[0.075] to-white/[0.025]">
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
      <div className="mt-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-white/10">
          <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-cyan-300 via-emerald-200 to-amber-200" />
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-glow" />
      </div>
      <p className="mt-3 text-sm text-slate-300">{detail}</p>
    </GlassCard>
  );
}
