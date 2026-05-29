import { useEffect, useState } from "react";
import { BrainCircuit, GitBranch, RadioTower } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { fallbackAgentFeed, fetchAgentFeed } from "../utils/liveData";

export function AIAgentsPage() {
  const [agentFeed, setAgentFeed] = useState(() => fallbackAgentFeed());

  useEffect(() => {
    let isMounted = true;

    fetchAgentFeed().then((data) => {
      if (isMounted) {
        setAgentFeed(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="AI agents"
        title="Agentic matchday control system"
        description="Specialized agents collaborate across ticketing, crowd density, weather, and incident signals to recommend safer routes and faster response actions."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          Data source: {agentFeed.source}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Updated {new Date(agentFeed.updatedAt).toLocaleTimeString()}
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Signals fused", agentFeed.summary.signalsFused, RadioTower],
          ["Agent decisions", agentFeed.summary.agentDecisions, BrainCircuit],
          ["Human approvals", agentFeed.summary.humanApprovals, GitBranch]
        ].map(([label, value, Icon]) => (
          <GlassCard key={label as string} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">{label as string}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{value as string}</p>
            </div>
            <Icon className="h-7 w-7 text-cyan-200" />
          </GlassCard>
        ))}
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agentFeed.agents.map((agent) => (
          <GlassCard key={agent.name} className="bg-gradient-to-br from-white/[0.07] to-cyan-300/[0.03]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-white">{agent.name}</h2>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-200">
                {agent.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{agent.task}</p>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Inputs</p>
              <p className="mt-1 text-sm text-slate-300">{agent.inputs}</p>
            </div>
            <div className="mt-3 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-emerald-200">Recommended action</p>
              <p className="mt-1 text-sm font-medium text-white">{agent.action}</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Confidence</span>
              <span className="font-semibold text-cyan-200">{agent.confidence}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-1.5 w-11/12 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
