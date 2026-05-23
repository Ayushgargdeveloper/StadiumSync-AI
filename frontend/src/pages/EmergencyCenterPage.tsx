import { useState } from "react";
import { Ambulance, BellRing, CheckCircle2, Flame, Radio, Send, ShieldAlert } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { alerts, emergencyBroadcasts, gateEmergencyUpdates, responseAutomations } from "../data/dashboardData";

export function EmergencyCenterPage() {
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(alerts[0].title);

  return (
    <div>
      <PageHeader
        eyebrow="Emergency center"
        title="Automated response coordination"
        description="Convert live incidents into dispatch actions, volunteer instructions, and fan route updates before small problems become stadium-wide risks."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {responseAutomations.map((automation) => (
          <GlassCard key={automation.label}>
            <p className="text-sm text-slate-400">{automation.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{automation.value}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-200">{automation.status}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="bg-gradient-to-br from-rose-300/[0.08] to-cyan-300/[0.035]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Emergency Broadcast Console</h2>
              <p className="text-sm text-slate-400">Send SOS, gate updates, and agency messages</p>
            </div>
            <BellRing className="h-6 w-6 text-rose-200" />
          </div>
          <button
            type="button"
            onClick={() => setBroadcastSent(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200/30 bg-rose-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-rose-200"
          >
            {broadcastSent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {broadcastSent ? "Broadcast package sent" : "Send emergency broadcast package"}
          </button>
          <div className="mt-4 space-y-3">
            {emergencyBroadcasts.map((broadcast) => (
              <div key={broadcast.audience} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{broadcast.audience}</p>
                    <p className="text-xs text-cyan-200">{broadcast.channel}</p>
                  </div>
                  <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-xs font-semibold text-emerald-200">
                    {broadcastSent ? "Sent" : broadcast.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{broadcast.message}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Gate Emergency Updates</h2>
            <Flame className="h-6 w-6 text-amber-200" />
          </div>
          <div className="mt-4 space-y-3">
            {gateEmergencyUpdates.map((gate) => (
              <div key={gate.gate} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{gate.gate}</p>
                  <span className="text-sm text-cyan-200">{gate.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{gate.instruction}</p>
                <button
                  type="button"
                  className="mt-3 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
                >
                  Push gate update
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Response Teams</h2>
          <div className="mt-4 space-y-3">
            {[
              ["Medical Alpha", "Section 118 tunnel", Ambulance],
              ["Security Delta", "East Concourse split", ShieldAlert],
              ["Gate Control", "Gate D bypass", Radio]
            ].map(([team, location, Icon]) => (
              <div key={team as string} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-cyan-200" />
                  <div>
                    <p className="font-medium text-white">{team as string}</p>
                    <p className="text-sm text-slate-400">{location as string}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-xs font-semibold text-emerald-200">
                  Routed
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-rose-300/[0.07] to-white/[0.035]">
          <h2 className="text-lg font-semibold text-white">Incident Queue</h2>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <button
                key={alert.title}
                type="button"
                onClick={() => setSelectedIncident(alert.title)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  selectedIncident === alert.title
                    ? "border-rose-200/40 bg-rose-300/10"
                    : "border-white/10 bg-slate-950/35 hover:border-cyan-200/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{alert.area} - {alert.time}</p>
                  </div>
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-100">
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  AI action: notify nearest team, update affected fan routes, and monitor density after dispatch.
                </p>
              </button>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
