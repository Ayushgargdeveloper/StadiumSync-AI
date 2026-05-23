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

  response.status(404).json({
    ok: false,
    error: "not_found"
  });
});
