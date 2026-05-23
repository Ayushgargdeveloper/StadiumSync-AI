import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { weatherRisks } from "../data/dashboardData";

export function WeatherRiskPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Weather risk"
        title="Atmospheric threat monitoring"
        description="Dummy conditions map weather exposure to crowd safety and evacuation planning signals."
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
      <GlassCard className="mt-5">
        <h2 className="text-lg font-semibold text-white">Risk Corridor</h2>
        <div className="mt-5 h-56 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,.18),rgba(250,204,21,.16),rgba(244,63,94,.14))]" />
      </GlassCard>
    </div>
  );
}
