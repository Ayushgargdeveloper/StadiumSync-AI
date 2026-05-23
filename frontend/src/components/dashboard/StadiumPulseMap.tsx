import { motion } from "framer-motion";
import { Activity, MapPin } from "lucide-react";
import { zones } from "../../data/dashboardData";

const zonePoints = [
  { x: "50%", y: "18%", label: "North" },
  { x: "78%", y: "50%", label: "East" },
  { x: "50%", y: "82%", label: "South" },
  { x: "22%", y: "50%", label: "West" }
];

export function StadiumPulseMap() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-cyan-300/20 bg-slate-950/45 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_34%),linear-gradient(120deg,rgba(14,165,233,0.10),rgba(168,85,247,0.08),rgba(16,185,129,0.10))]" />
      <div className="scan-grid absolute inset-0 opacity-70" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Live venue twin
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">Crowd pressure topology</h2>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          Synced
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 aspect-square max-w-[360px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-200/25"
        />
        <div className="absolute inset-[9%] rounded-full border border-white/10 bg-white/[0.04]" />
        <div className="absolute inset-[22%] rounded-full border border-cyan-300/25 bg-cyan-300/5 shadow-glow" />
        <div className="absolute inset-[38%] rounded-full border border-emerald-200/30 bg-emerald-300/10" />
        <div className="absolute left-1/2 top-1/2 h-[68%] w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/50" />
        <div className="absolute left-1/2 top-1/2 h-8 w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/50" />

        {zonePoints.map((point, index) => (
          <motion.div
            key={point.label}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, delay: index * 0.35, repeat: Infinity }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: point.x, top: point.y }}
          >
            <div className="relative rounded-full bg-cyan-200 p-2 text-slate-950 shadow-glow">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/50" />
              <MapPin className="relative h-4 w-4" />
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-slate-200 backdrop-blur">
          <Activity className="h-3.5 w-3.5 text-cyan-200" />
          248 vision nodes
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-2 sm:grid-cols-2">
        {zones.map((zone) => (
          <div key={zone.name} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-white">{zone.name}</span>
              <span className="text-cyan-200">{zone.density}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
