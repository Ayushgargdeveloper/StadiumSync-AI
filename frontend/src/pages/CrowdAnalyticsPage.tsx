import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { zones } from "../data/dashboardData";

export function CrowdAnalyticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Crowd analytics"
        title="Predictive crowd movement"
        description="Dummy analytics show density, flow pressure, and intervention priority across stadium zones."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {zones.map((zone, index) => (
          <GlassCard key={zone.name}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{zone.name}</h2>
              <span className="text-sm text-cyan-200">Priority {index + 1}</span>
            </div>
            <div className="mt-5 h-28 rounded-lg border border-cyan-300/20 bg-gradient-to-r from-cyan-300/10 via-blue-400/10 to-amber-300/20 p-4">
              <div className="h-full rounded-md border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,.15)_1px,transparent_1px),linear-gradient(rgba(148,163,184,.12)_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Density is {zone.density}% with a {zone.trend} short-term movement trend.
            </p>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
