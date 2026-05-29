import { useEffect, useState } from "react";
import { Activity, Clock, Route } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import {
  fetchCrowdAnalytics,
  getFallbackCrowdAnalytics,
  type CrowdAnalyticsResponse
} from "../utils/crowdAnalytics";

export function CrowdAnalyticsPage() {
  const [analytics, setAnalytics] = useState<CrowdAnalyticsResponse>(() => getFallbackCrowdAnalytics());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCrowdAnalytics().then((data) => {
      if (isMounted) {
        setAnalytics(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Crowd analytics"
        title="Predictive crowd movement"
        description="Dummy analytics show density, flow pressure, and intervention priority across stadium zones."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          {isLoading ? "Loading live feed" : `Data source: ${analytics.source}`}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Updated {new Date(analytics.updatedAt).toLocaleTimeString()}
        </span>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        {analytics.zones.map((zone, index) => {
          const points = zone.points;
          const path = points
            .map((point, pointIndex) => {
              const x = points.length > 1 ? (pointIndex / (points.length - 1)) * 100 : 0;
              const y = 100 - point;
              return `${pointIndex === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ");

          return (
          <GlassCard key={zone.zone}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{zone.zone}</h2>
              <span className="text-sm text-cyan-200">Priority {index + 1}</span>
            </div>

            <div className="mt-5 rounded-lg border border-cyan-300/20 bg-gradient-to-r from-cyan-300/10 via-blue-400/10 to-amber-300/20 p-4">
              <div className="relative h-44 rounded-md border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,.15)_1px,transparent_1px),linear-gradient(rgba(148,163,184,.12)_1px,transparent_1px)] bg-[size:28px_28px] p-4">
                <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d={path}
                    fill="none"
                    stroke="rgb(103 232 249)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.8"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={`${path} L 100 100 L 0 100 Z`}
                    fill="rgba(34, 211, 238, 0.14)"
                    stroke="none"
                  />
                </svg>
                <div className="relative z-10 flex h-full items-end gap-2">
                  {points.map((point, pointIndex) => (
                    <div key={`${zone.zone}-${pointIndex}`} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-28 w-full items-end">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-cyan-300/35 via-emerald-200/55 to-amber-200 shadow-glow"
                          style={{ height: `${point}%` }}
                          aria-label={`${point}% density`}
                        />
                      </div>
                      <span className="text-[0.65rem] font-semibold text-slate-400">
                        T-{(points.length - pointIndex - 1) * 5}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  {zone.density}% now
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>30m ago</span>
                <span>Live density forecast</span>
                <span>Now</span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Flow", value: zone.currentFlow, icon: Activity },
                { label: "Peak ETA", value: zone.peakEta, icon: Clock },
                { label: "Action", value: zone.intervention, icon: Route }
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <item.icon className="h-3.5 w-3.5 text-cyan-200" />
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Density is {zone.density}% with a {zone.trend} short-term movement trend.
            </p>
          </GlassCard>
          );
        })}
      </section>
    </div>
  );
}
