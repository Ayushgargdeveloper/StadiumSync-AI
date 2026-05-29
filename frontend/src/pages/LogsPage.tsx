import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { systemLogs } from "../data/dashboardData";
import { getHelpRequests, type StoredHelpRequest } from "../utils/helpRequests";

export function LogsPage() {
  const [helpRequests, setHelpRequests] = useState<StoredHelpRequest[]>(() => getHelpRequests());

  useEffect(() => {
    function refreshHelpRequests() {
      setHelpRequests(getHelpRequests());
    }

    window.addEventListener("storage", refreshHelpRequests);
    window.addEventListener("stadiumsync:help-request", refreshHelpRequests);

    return () => {
      window.removeEventListener("storage", refreshHelpRequests);
      window.removeEventListener("stadiumsync:help-request", refreshHelpRequests);
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Logs"
        title="System event stream"
        description="A compact operational log for AI decisions, sensor health, and command-center actions."
      />

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">System Logs</h2>
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

        <GlassCard className="bg-gradient-to-br from-cyan-300/[0.08] via-white/[0.045] to-emerald-300/[0.04]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Fan Help Requests</h2>
              <p className="text-sm text-slate-400">Requests submitted from the Help page</p>
            </div>
            <MessageSquareText className="h-6 w-6 text-cyan-200" />
          </div>

          {helpRequests.length > 0 ? (
            <div className="space-y-3">
              {helpRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-white/10 bg-black/25 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{request.category}</p>
                      <p className="mt-1 text-sm text-slate-400">{request.holder} - {request.seat}</p>
                    </div>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">
                      {request.urgency}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{request.message}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    {new Date(request.createdAt).toLocaleString()} - #{request.id.slice(0, 8)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-sm leading-6 text-slate-300">
              No fan help requests yet. Submit one from the Help page and it will appear here.
            </div>
          )}
        </GlassCard>
      </section>
    </div>
  );
}
