import {
  agents,
  alerts,
  emergencyBroadcasts,
  gateEmergencyUpdates,
  responseAutomations,
  topbarStats,
  weatherRisks
} from "../data/dashboardData";

export type LiveVenueStatus = {
  stadiumStatus: string;
  matchName: string;
  liveScore: string;
  matchOver: string;
  chaseInfo: string;
  crowdCount: string;
  activeAlerts: number;
  venuePulse: number;
  updatedAt: string;
};

export type WeatherFeed = {
  ok: boolean;
  source: "api" | "mock" | "fallback";
  updatedAt: string;
  risks: typeof weatherRisks;
  actions: Array<{ label: string; detail: string; type: "route" | "security" | "fan" }>;
};

export type EmergencyFeed = {
  ok: boolean;
  source: "api" | "mock" | "fallback";
  updatedAt: string;
  alerts: typeof alerts;
  automations: typeof responseAutomations;
  broadcasts: typeof emergencyBroadcasts;
  gates: typeof gateEmergencyUpdates;
  teams: Array<{ team: string; location: string; status: string }>;
};

export type AgentFeed = {
  ok: boolean;
  source: "api" | "mock" | "fallback";
  updatedAt: string;
  summary: {
    signalsFused: string;
    agentDecisions: string;
    humanApprovals: string;
  };
  agents: typeof agents;
};

export function fallbackVenueStatus(): LiveVenueStatus {
  return {
    ...topbarStats,
    venuePulse: 94,
    updatedAt: new Date().toISOString()
  };
}

export function fallbackWeatherFeed(): WeatherFeed {
  return {
    ok: true,
    source: "fallback",
    updatedAt: new Date().toISOString(),
    risks: weatherRisks,
    actions: [
      { label: "Route update", detail: "Move upper deck fans through covered concourse", type: "route" },
      { label: "Security note", detail: "Keep open seating stairs clear during rain cell", type: "security" },
      { label: "Fan advisory", detail: "Push rain and entry timing notice to ticket holders", type: "fan" }
    ]
  };
}

export function fallbackEmergencyFeed(): EmergencyFeed {
  return {
    ok: true,
    source: "fallback",
    updatedAt: new Date().toISOString(),
    alerts,
    automations: responseAutomations,
    broadcasts: emergencyBroadcasts,
    gates: gateEmergencyUpdates,
    teams: [
      { team: "Medical Alpha", location: "Section 118 tunnel", status: "Routed" },
      { team: "Security Delta", location: "East Concourse split", status: "Routed" },
      { team: "Gate Control", location: "Gate D bypass", status: "Routed" }
    ]
  };
}

export function fallbackAgentFeed(): AgentFeed {
  return {
    ok: true,
    source: "fallback",
    updatedAt: new Date().toISOString(),
    summary: {
      signalsFused: "7 live feeds",
      agentDecisions: "18/min",
      humanApprovals: "4 pending"
    },
    agents
  };
}

async function fetchJson<T>(path: string, fallback: () => T): Promise<T> {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      return fallback();
    }

    return (await response.json()) as T;
  } catch {
    return fallback();
  }
}

export function fetchVenueStatus() {
  return fetchJson("/api/live/venue-status", fallbackVenueStatus);
}

export function fetchWeatherFeed() {
  return fetchJson("/api/weather/current", fallbackWeatherFeed);
}

export function fetchEmergencyFeed() {
  return fetchJson("/api/emergency/live", fallbackEmergencyFeed);
}

export function fetchAgentFeed() {
  return fetchJson("/api/agents/live", fallbackAgentFeed);
}
