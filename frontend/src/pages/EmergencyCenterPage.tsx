import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { alerts } from "../data/dashboardData";

export function EmergencyCenterPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Emergency center"
        title="Incident response coordination"
        description="Dispatch dummy teams, monitor active events, and keep response status visible for operators."
      />
      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Response Teams</h2>
          <div className="mt-4 space-y-3">
            {["Medical Alpha", "Security Delta", "Fire Watch", "Gate Control"].map((team) => (
              <div key={team} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <span className="font-medium text-white">{team}</span>
                <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-xs font-semibold text-emerald-200">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Incident Queue</h2>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-lg border border-white/10 bg-slate-950/35 p-4">
                <p className="font-semibold text-white">{alert.title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {alert.area} · {alert.time}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
