import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

type HeaderWriter = {
  set(name: string, value: string): void;
};

function applyCors(requestOrigin: string | undefined, response: HeaderWriter) {
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    response.set("Access-Control-Allow-Origin", requestOrigin);
  }

  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}

export const api = onRequest((request, response) => {
  applyCors(request.get("origin"), response);

  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  if (request.path === "/health" || request.path === "/api/health") {
    response.status(200).json({
      ok: true,
      service: "stadiumsync-ai-api",
      environment: process.env.APP_ENV || "development"
    });
    return;
  }

  if (request.path === "/live/venue-status" || request.path === "/api/live/venue-status") {
    response.status(200).json({
      stadiumStatus: "Operational",
      matchName: "Falcons vs Titans",
      liveScore: "Falcons 142/3",
      matchOver: "16.2 ov",
      chaseInfo: "Titans need 41 from 22",
      crowdCount: "68,420",
      activeAlerts: 4,
      venuePulse: 94,
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (request.path === "/tickets/lookup" || request.path === "/api/tickets/lookup") {
    response.status(200).json({
      ok: true,
      source: "mock",
      ticket: {
        holder: "Aarav Mehta",
        match: "Falcons vs Titans",
        seat: "Section 118, Row 8, Seat 14",
        gate: "Gate C",
        route: "Gate C -> East Concourse -> Aisle 12"
      }
    });
    return;
  }

  if (request.path === "/agents/recommendations" || request.path === "/api/agents/recommendations") {
    response.status(200).json({
      ok: true,
      source: "mock",
      recommendations: [
        "Divert Gate C overflow to Gate D bypass.",
        "Pre-stage Medical Alpha at Section 118 tunnel.",
        "Push covered route advisory to upper deck ticket holders."
      ]
    });
    return;
  }

  if (request.path === "/agents/live" || request.path === "/api/agents/live") {
    response.status(200).json({
      ok: true,
      source: "mock",
      updatedAt: new Date().toISOString(),
      summary: {
        signalsFused: "7 live feeds",
        agentDecisions: "18/min",
        humanApprovals: "4 pending"
      },
      agents: [
        {
          name: "Flow Sentinel",
          status: "Active",
          task: "Predicting exit pressure",
          inputs: "Ticket scans, camera density, gate throughput",
          action: "Divert Section 118 late arrivals to Gate D",
          confidence: "96%"
        },
        {
          name: "Evac Planner",
          status: "Ready",
          task: "Route simulation ready",
          inputs: "Open exits, blocked lanes, response team locations",
          action: "Keep East tunnel clear for medical lane",
          confidence: "91%"
        },
        {
          name: "Weather Watch",
          status: "Active",
          task: "Lightning envelope scan",
          inputs: "Rain radar, wind, open seating exposure",
          action: "Prefer covered concourse route for upper deck",
          confidence: "88%"
        }
      ]
    });
    return;
  }

  if (request.path === "/matches/demo/zones" || request.path === "/api/matches/demo/zones") {
    response.status(200).json({
      ok: true,
      source: "mock",
      zones: [
        { name: "East Concourse", density: 92, risk: "Severe" },
        { name: "North Gate", density: 74, risk: "Watch" },
        { name: "West Plaza", density: 64, risk: "Stable" }
      ]
    });
    return;
  }

  if (
    request.path === "/matches/demo/crowd-analytics" ||
    request.path === "/api/matches/demo/crowd-analytics"
  ) {
    response.status(200).json({
      ok: true,
      source: "mock",
      updatedAt: new Date().toISOString(),
      zones: [
        {
          zone: "North Gate",
          density: 74,
          risk: "Stable",
          trend: "+4%",
          currentFlow: "8.6k/hr",
          peakEta: "14 min",
          intervention: "Lane splitters",
          points: [48, 52, 58, 61, 66, 69, 74]
        },
        {
          zone: "East Concourse",
          density: 92,
          risk: "Elevated",
          trend: "+11%",
          currentFlow: "13.8k/hr",
          peakEta: "9 min",
          intervention: "Gate D bypass",
          points: [62, 68, 73, 79, 84, 89, 92]
        },
        {
          zone: "South Stands",
          density: 81,
          risk: "Stable",
          trend: "-2%",
          currentFlow: "10.1k/hr",
          peakEta: "18 min",
          intervention: "Hold merch queue",
          points: [86, 84, 83, 82, 82, 81, 81]
        },
        {
          zone: "West Plaza",
          density: 64,
          risk: "Low",
          trend: "+1%",
          currentFlow: "6.9k/hr",
          peakEta: "22 min",
          intervention: "Monitor only",
          points: [55, 57, 60, 61, 62, 63, 64]
        }
      ]
    });
    return;
  }

  if (request.path === "/weather/current" || request.path === "/api/weather/current") {
    response.status(200).json({
      ok: true,
      source: "mock",
      updatedAt: new Date().toISOString(),
      risks: [
        { label: "Lightning", value: "18 mi", status: "Watch" },
        { label: "Wind Gusts", value: "22 mph", status: "Normal" },
        { label: "Rain Probability", value: "43%", status: "Rising" },
        { label: "Heat Index", value: "84 F", status: "Normal" }
      ],
      actions: [
        { label: "Route update", detail: "Move upper deck fans through covered concourse", type: "route" },
        { label: "Security note", detail: "Keep open seating stairs clear during rain cell", type: "security" },
        { label: "Fan advisory", detail: "Push rain and entry timing notice to ticket holders", type: "fan" }
      ]
    });
    return;
  }

  if (request.path === "/emergency/live" || request.path === "/api/emergency/live") {
    response.status(200).json({
      ok: true,
      source: "mock",
      updatedAt: new Date().toISOString(),
      automations: [
        { label: "Security dispatch", value: "2 teams routed", status: "Active" },
        { label: "Fan route updates", value: "1,248 devices", status: "Queued" },
        { label: "Volunteer tasks", value: "6 instructions", status: "Sent" }
      ],
      broadcasts: [
        {
          audience: "All fans",
          channel: "Push + SMS fallback",
          message: "Emergency route update: avoid Gate C, follow staff to Gate D bypass.",
          status: "Ready"
        },
        {
          audience: "Police control",
          channel: "Command relay",
          message: "Crowd surge risk at East Concourse. Request perimeter support.",
          status: "Ready"
        },
        {
          audience: "Medical teams",
          channel: "Dispatch alert",
          message: "Medical Alpha to Section 118 tunnel, standby near lower bowl.",
          status: "Ready"
        }
      ],
      gates: [
        { gate: "Gate C", status: "Restricted", instruction: "Stop inflow and redirect late arrivals." },
        { gate: "Gate D", status: "Open bypass", instruction: "Use as emergency diversion route." },
        { gate: "Gate A", status: "Normal", instruction: "Continue standard scanning." }
      ],
      teams: [
        { team: "Medical Alpha", location: "Section 118 tunnel", status: "Routed" },
        { team: "Security Delta", location: "East Concourse split", status: "Routed" },
        { team: "Gate Control", location: "Gate D bypass", status: "Routed" }
      ],
      alerts: [
        {
          title: "Density spike detected",
          area: "East Concourse",
          severity: "High",
          time: "2 min ago"
        },
        {
          title: "Medical team dispatched",
          area: "Section 118",
          severity: "Medium",
          time: "7 min ago"
        },
        {
          title: "Rain cell approaching",
          area: "Open seating",
          severity: "Medium",
          time: "14 min ago"
        }
      ]
    });
    return;
  }

  response.status(404).json({
    ok: false,
    error: "not_found"
  });
});
