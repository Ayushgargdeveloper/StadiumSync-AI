import { crowdAnalyticsSeries, zones } from "../data/dashboardData";

export type CrowdAnalyticsZone = {
  zone: string;
  density: number;
  risk: string;
  trend: string;
  currentFlow: string;
  peakEta: string;
  intervention: string;
  points: number[];
};

export type CrowdAnalyticsResponse = {
  ok: boolean;
  source: "api" | "mock" | "fallback";
  updatedAt: string;
  zones: CrowdAnalyticsZone[];
};

export function getFallbackCrowdAnalytics(): CrowdAnalyticsResponse {
  return {
    ok: true,
    source: "fallback",
    updatedAt: new Date().toISOString(),
    zones: zones.map((zone) => {
      const analytics = crowdAnalyticsSeries.find((series) => series.zone === zone.name);

      return {
        zone: zone.name,
        density: zone.density,
        risk: zone.risk,
        trend: zone.trend,
        currentFlow: analytics?.currentFlow ?? "Demo",
        peakEta: analytics?.peakEta ?? "Live",
        intervention: analytics?.intervention ?? "Monitor",
        points: analytics?.points ? Array.from(analytics.points) : [zone.density]
      };
    })
  };
}

export function normalizeCrowdAnalytics(data: unknown): CrowdAnalyticsResponse {
  const fallback = getFallbackCrowdAnalytics();

  if (!data || typeof data !== "object" || !("zones" in data) || !Array.isArray(data.zones)) {
    return fallback;
  }

  return {
    ok: "ok" in data && typeof data.ok === "boolean" ? data.ok : true,
    source: "source" in data && data.source === "api" ? "api" : "mock",
    updatedAt:
      "updatedAt" in data && typeof data.updatedAt === "string"
        ? data.updatedAt
        : fallback.updatedAt,
    zones: data.zones.map((item, index) => {
      const fallbackZone = fallback.zones[index] ?? fallback.zones[0];
      const zoneData = item && typeof item === "object" ? item : {};

      return {
        zone: "zone" in zoneData && typeof zoneData.zone === "string" ? zoneData.zone : fallbackZone.zone,
        density:
          "density" in zoneData && typeof zoneData.density === "number"
            ? zoneData.density
            : fallbackZone.density,
        risk: "risk" in zoneData && typeof zoneData.risk === "string" ? zoneData.risk : fallbackZone.risk,
        trend:
          "trend" in zoneData && typeof zoneData.trend === "string" ? zoneData.trend : fallbackZone.trend,
        currentFlow:
          "currentFlow" in zoneData && typeof zoneData.currentFlow === "string"
            ? zoneData.currentFlow
            : fallbackZone.currentFlow,
        peakEta:
          "peakEta" in zoneData && typeof zoneData.peakEta === "string"
            ? zoneData.peakEta
            : fallbackZone.peakEta,
        intervention:
          "intervention" in zoneData && typeof zoneData.intervention === "string"
            ? zoneData.intervention
            : fallbackZone.intervention,
        points:
          "points" in zoneData &&
          Array.isArray(zoneData.points) &&
          zoneData.points.every((point: unknown) => typeof point === "number")
            ? Array.from(zoneData.points)
            : fallbackZone.points
      };
    })
  };
}

export async function fetchCrowdAnalytics() {
  try {
    const response = await fetch("/api/matches/demo/crowd-analytics");

    if (!response.ok) {
      return getFallbackCrowdAnalytics();
    }

    return normalizeCrowdAnalytics(await response.json());
  } catch {
    return getFallbackCrowdAnalytics();
  }
}
