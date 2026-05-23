import { Activity, Bell, ShieldCheck, Trophy, UsersRound } from "lucide-react";
import { topbarStats } from "../../data/dashboardData";

const statusItems = [
  {
    label: "Status",
    value: topbarStats.stadiumStatus,
    icon: ShieldCheck,
    className: "text-emerald-200"
  },
  {
    label: "Match",
    value: topbarStats.matchName,
    icon: Trophy,
    className: "text-cyan-200"
  },
  {
    label: "Crowd",
    value: topbarStats.crowdCount,
    icon: UsersRound,
    className: "text-blue-200"
  },
  {
    label: "Alerts",
    value: String(topbarStats.activeAlerts),
    icon: Bell,
    className: "text-amber-200"
  }
];

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-cockpit/65 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="pt-56 sm:pt-44 lg:pt-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <Activity className="h-4 w-4" />
            Live command center
          </div>
          <p className="mt-1 text-sm text-slate-400">
            AI-assisted stadium safety, flow, and incident coordination
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:min-w-[560px]">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 shadow-lg shadow-black/20"
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <item.icon className={`h-3.5 w-3.5 ${item.className}`} />
                {item.label}
              </div>
              <p className="mt-1 text-sm font-semibold leading-tight text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
