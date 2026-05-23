import { CloudRain, Route, ShieldAlert } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { weatherRisks } from "../data/dashboardData";

export function WeatherRiskPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Weather risk"
        title="Weather-aware crowd routing"
        description="Weather Watch converts rain, wind, lightning, and heat exposure into safe fan guidance and organizer response actions."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {weatherRisks.map((risk) => (
          <GlassCard key={risk.label}>
            <p className="text-sm text-slate-400">{risk.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{risk.value}</p>
            <p className="mt-4 text-sm text-cyan-200">{risk.status}</p>
          </GlassCard>
        ))}
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Risk Corridor</h2>
            <CloudRain className="h-6 w-6 text-cyan-200" />
          </div>
          <div className="mt-5 h-56 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,.18),rgba(250,204,21,.16),rgba(244,63,94,.14))]" />
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-cyan-300/[0.07] to-emerald-300/[0.035]">
          <h2 className="text-lg font-semibold text-white">AI Weather Actions</h2>
          <div className="mt-4 space-y-3">
            {[
              ["Route update", "Move upper deck fans through covered concourse", Route],
              ["Security note", "Keep open seating stairs clear during rain cell", ShieldAlert],
              ["Fan advisory", "Push rain and entry timing notice to ticket holders", CloudRain]
            ].map(([label, detail, Icon]) => (
              <div key={label as string} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon className="h-4 w-4 text-cyan-200" />
                  {label as string}
                </div>
                <p className="mt-2 text-sm text-slate-300">{detail as string}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
