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

  response.status(404).json({
    ok: false,
    error: "not_found"
  });
});
