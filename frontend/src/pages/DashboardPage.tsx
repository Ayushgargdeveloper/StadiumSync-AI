import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Route, ShieldAlert, RadioTower } from "lucide-react";
import { StadiumPulseMap } from "../components/dashboard/StadiumPulseMap";
import { GlassCard } from "../components/ui/GlassCard";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";
import {
  alerts,
  bottleneckPredictions,
  commandRecommendations,
  liveSignals,
  overviewCards,
  responseAutomations,
  zones
} from "../data/dashboardData";

export function DashboardPage() {
  const primaryRecommendation = commandRecommendations[0];
  const primaryBottleneck = bottleneckPredictions[0];

  return (
    <div>
      <section className="mb-5 grid gap-5 xl:grid-cols-[1fr_0.78fr]">
        <div className="glass-panel relative overflow-hidden rounded-lg p-6 control-ring">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />
          <PageHeader
            eyebrow="Operations command center"
            title="Predict bottlenecks before they become emergencies"
            description="A unified live view for organizers to manage crowd surges, security vulnerabilities, weather shifts, and response teams during the match."
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

        <GlassCard className="bg-gradient-to-br from-rose-300/[0.08] via-white/[0.045] to-cyan-300/[0.04]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                Immediate AI action
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">{primaryRecommendation.title}</h2>
            </div>
            <span className="rounded-full border border-rose-300/25 bg-rose-300/10 px-3 py-1 text-xs font-semibold text-rose-100">
              {primaryRecommendation.priority}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{primaryRecommendation.action}</p>
          <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{primaryBottleneck.zone}</span>
              <span className="text-sm text-cyan-200">ETA {primaryBottleneck.eta}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{primaryBottleneck.cause}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {responseAutomations.map((automation) => (
              <div key={automation.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-2">
                <p className="truncate text-[0.7rem] text-slate-400">{automation.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{automation.status}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="bg-gradient-to-br from-amber-300/[0.08] via-white/[0.045] to-rose-300/[0.04]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">AI Command Recommendations</h2>
              <p className="text-sm text-slate-400">Actionable interventions from live ticketing, density, and weather signals</p>
            </div>
            <BrainCircuit className="h-6 w-6 text-cyan-200" />
          </div>
          <div className="space-y-3">
            {commandRecommendations.map((recommendation) => (
              <div key={recommendation.title} className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{recommendation.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{recommendation.impact}</p>
                  </div>
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
                    {recommendation.priority}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{recommendation.action}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-cyan-300/[0.07] to-blue-400/[0.035]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Predicted Bottlenecks</h2>
              <p className="text-sm text-slate-400">Pre/post-match congestion forecast with diversion plan</p>
            </div>
            <Route className="h-6 w-6 text-emerald-200" />
          </div>
          <div className="space-y-3">
            {bottleneckPredictions.map((prediction) => (
              <div key={prediction.zone} className="rounded-lg border border-white/10 bg-black/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{prediction.zone}</p>
                  <span className="text-sm text-cyan-200">ETA {prediction.eta}</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Cause</p>
                    <p className="mt-1 text-sm text-slate-300">{prediction.cause}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Diversion</p>
                    <p className="mt-1 text-sm text-slate-300">{prediction.diversion}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div
                    className={`h-1.5 rounded-full ${
                      prediction.risk === "Severe"
                        ? "w-[92%] bg-rose-300"
                        : prediction.risk === "Watch"
                          ? "w-[64%] bg-amber-300"
                          : "w-[38%] bg-emerald-300"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5">
        <StadiumPulseMap />
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
        {responseAutomations.map((automation) => (
          <GlassCard key={automation.label} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">{automation.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{automation.value}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">{automation.status}</p>
            </div>
            <ShieldAlert className="h-7 w-7 text-emerald-200" />
          </GlassCard>
        ))}
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
