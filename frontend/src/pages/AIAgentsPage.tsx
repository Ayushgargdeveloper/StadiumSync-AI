import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { agents } from "../data/dashboardData";

export function AIAgentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="AI agents"
        title="Autonomous operational copilots"
        description="Specialized agents watch flow, risk, weather, and dispatch patterns using simulated live tasks."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent) => (
          <GlassCard key={agent.name}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-white">{agent.name}</h2>
              <span className="rounded-full bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-200">
                {agent.status}
              </span>
            </div>
            <p className="mt-8 text-sm leading-6 text-slate-300">{agent.task}</p>
            <div className="mt-5 h-1.5 rounded-full bg-white/10">
              <div className="h-1.5 w-4/5 rounded-full bg-cyan-300" />
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
