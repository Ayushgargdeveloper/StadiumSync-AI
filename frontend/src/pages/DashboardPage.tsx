import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, RadioTower } from "lucide-react";
import { StadiumPulseMap } from "../components/dashboard/StadiumPulseMap";
import { TicketSeatGuide } from "../components/dashboard/TicketSeatGuide";
import { GlassCard } from "../components/ui/GlassCard";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";
import { alerts, liveSignals, overviewCards, zones } from "../data/dashboardData";

export function DashboardPage() {
  return (
    <div>
      <section className="mb-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel relative overflow-hidden rounded-lg p-6 control-ring">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />
          <PageHeader
            eyebrow="Dashboard overview"
            title="Stadium intelligence at match speed"
            description="Live occupancy, movement pressure, weather risk, and incident response signals are fused into one adaptive command surface."
          />
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Prediction horizon", "12 min"],
              ["Exit load", "Moderate"],
              ["Sensor health", "99.1%"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-base font-semibold text-white sm:text-lg">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-sm font-medium text-cyan-100">
              <BrainCircuit className="h-4 w-4" />
              AI model live
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-sm font-medium text-emerald-100">
              <RadioTower className="h-4 w-4" />
              Venue mesh online
            </div>
          </div>
        </div>

        <StadiumPulseMap />
      </section>

      <TicketSeatGuide />

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassCard className="bg-gradient-to-br from-white/[0.07] to-cyan-300/[0.035]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Crowd Heat Grid</h2>
              <p className="text-sm text-slate-400">Density and risk by stadium zone</p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              AI confidence 94%
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {zones.map((zone) => (
              <motion.div
                key={zone.name}
                whileHover={{ scale: 1.01 }}
                className="rounded-lg border border-white/10 bg-slate-950/45 p-4 shadow-lg shadow-black/20"
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

        <GlassCard className="bg-gradient-to-br from-white/[0.07] to-rose-300/[0.035]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
            <ArrowUpRight className="h-5 w-5 text-amber-200" />
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
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
