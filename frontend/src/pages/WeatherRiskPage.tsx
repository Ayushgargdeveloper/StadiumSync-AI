import { useEffect, useState } from "react";
import { CloudRain, Route, ShieldAlert } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { fallbackWeatherFeed, fetchWeatherFeed } from "../utils/liveData";

export function WeatherRiskPage() {
  const [weatherFeed, setWeatherFeed] = useState(() => fallbackWeatherFeed());

  useEffect(() => {
    let isMounted = true;

    fetchWeatherFeed().then((data) => {
      if (isMounted) {
        setWeatherFeed(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Weather risk"
        title="Weather-aware crowd routing"
        description="Weather Watch converts rain, wind, lightning, and heat exposure into safe fan guidance and organizer response actions."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          Data source: {weatherFeed.source}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Updated {new Date(weatherFeed.updatedAt).toLocaleTimeString()}
        </span>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {weatherFeed.risks.map((risk) => (
          <GlassCard key={risk.label}>
            <p className="text-sm text-slate-400">{risk.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{risk.value}</p>
            <p className="mt-4 text-sm text-cyan-200">{risk.status}</p>
          </GlassCard>
        ))}
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Risk Corridor</h2>
            <CloudRain className="h-6 w-6 text-cyan-200" />
          </div>
          <div className="mt-5 h-56 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,.18),rgba(250,204,21,.16),rgba(244,63,94,.14))]" />
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-cyan-300/[0.07] to-emerald-300/[0.035]">
          <h2 className="text-lg font-semibold text-white">AI Weather Actions</h2>
          <div className="mt-4 space-y-3">
            {weatherFeed.actions.map((action) => {
              const Icon = action.type === "route" ? Route : action.type === "security" ? ShieldAlert : CloudRain;

              return (
              <div key={action.label} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon className="h-4 w-4 text-cyan-200" />
                  {action.label}
                </div>
                <p className="mt-2 text-sm text-slate-300">{action.detail}</p>
              </div>
              );
            })}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
