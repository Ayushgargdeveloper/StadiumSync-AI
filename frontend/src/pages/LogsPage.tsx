import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { systemLogs } from "../data/dashboardData";

export function LogsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Logs"
        title="System event stream"
        description="A compact operational log for AI decisions, sensor health, and command-center actions."
      />
      <GlassCard>
        <div className="space-y-3">
          {systemLogs.map((log, index) => (
            <div key={log} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
              <div>
                <p className="font-medium text-white">T+{String(index * 4 + 2).padStart(2, "0")}m</p>
                <p className="text-sm text-slate-300">{log}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
