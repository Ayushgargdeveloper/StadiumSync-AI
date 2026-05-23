import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";
import { alerts, liveSignals, overviewCards, zones } from "../data/dashboardData";

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Dashboard overview"
        title="Stadium intelligence at match speed"
        description="Live occupancy, movement pressure, weather risk, and incident response signals are fused into one control surface."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassCard>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Crowd Heat Grid</h2>
              <p className="text-sm text-slate-400">Density and risk by stadium zone</p>
            </div>
            <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              AI confidence 94%
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {zones.map((zone) => (
              <motion.div
                key={zone.name}
                whileHover={{ scale: 1.01 }}
                className="rounded-lg border border-white/10 bg-slate-950/35 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{zone.name}</p>
                  <span className="text-sm text-slate-300">{zone.trend}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300"
                    style={{ width: `${zone.density}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-slate-400">{zone.density}% density</span>
                  <span className="text-cyan-200">{zone.risk}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{alert.title}</p>
                    <p className="text-sm text-slate-400">{alert.area}</p>
                  </div>
                  <span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-200">
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{alert.time}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {liveSignals.map((signal) => (
          <GlassCard key={signal.label} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">{signal.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{signal.value}</p>
            </div>
            <signal.icon className="h-7 w-7 text-cyan-200" />
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
