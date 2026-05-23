# GCP API And Deployment Strategy

This project should deploy on Firebase first, while staying ready to use Google Cloud credits for real data and AI APIs.

## Deployment Choice

Recommended deployment for the hackathon:

```text
Firebase Hosting + Firebase Functions + Firestore + Firebase Auth
```

Why this is best:

- Fastest route to a public live URL.
- Firebase is backed by Google Cloud, so it fits the GCP agenda.
- Easy account/project switching.
- Hosting and API rewrites are already configured in `firebase.json`.
- Firestore gives real-time data behavior for crowd and incident updates.
- Firebase Functions can safely call Google Cloud APIs without exposing keys in the frontend.

## Google Cloud APIs To Use With Credits

Do not call these directly from the browser. Call them through Firebase Functions.

### High Priority APIs

1. Firebase Auth
   - Production phone OTP ticket-holder login.
   - Replaces demo local phone login.

2. Cloud Firestore
   - Tickets, matches, zones, incidents, logs, AI recommendations.

3. Firebase Functions
   - Secure backend for ticket lookup, routing, incidents, and AI recommendations.

4. Vertex AI / Gemini API
   - Agentic recommendations:
     - route diversion,
     - emergency response summary,
     - crowd surge explanation,
     - Q&A defense demo if needed.

5. Maps Platform Routes API, if credits and setup allow
   - Use for external stadium arrival route, parking-to-gate routing, and estimated walking time.
   - Internal seat routing can stay app-defined for demo.

### Optional APIs

1. Weather API provider or Google Weather-capable source if available.
   - Weather risk can remain dummy if API setup is too slow.

2. Pub/Sub
   - Future sensor event ingestion.

3. Cloud Run
   - Not needed now unless Firebase Functions becomes limiting.

## Backend Technology Decision

Use Firebase Functions with TypeScript.

Reasoning:

- Same language as frontend.
- Easy monorepo story.
- Serverless and scalable.
- Strong Google Cloud alignment.
- Good enough for real demo APIs.

Backend path:

```text
backend/src/index.ts
```

Recommended API routes:

```text
GET /api/health
POST /api/tickets/lookup
GET /api/matches/:matchId/zones
GET /api/matches/:matchId/weather-risk
POST /api/incidents
GET /api/agents/recommendations
POST /api/agents/route-advice
```

## Environment Variables

Frontend should only use public Firebase web config:

```text
VITE_FIREBASE_*
VITE_API_BASE_URL
```

Backend should use secrets/config:

```text
FIREBASE_PROJECT_ID
ALLOWED_ORIGINS
GOOGLE_CLOUD_PROJECT
GEMINI_API_KEY
GOOGLE_MAPS_API_KEY
VERTEX_AI_LOCATION
```

Never put backend API keys in frontend `.env`.

## Real Data Upgrade Path

Current demo:

```text
local dummy ticket data -> local auth context -> UI route guidance
```

Next production path:

```text
Firebase Auth phone OTP
-> Firebase ID token
-> Firebase Functions ticket lookup
-> Firestore tickets/matches/zones
-> optional Gemini/Vertex AI route recommendation
-> Fan Guide UI
```

## Demo-Safe Fallback

Every real API integration should have fallback behavior:

- If API works: show real/fetched data.
- If API fails during live demo: show demo data with a clear fallback label.

This protects live demo execution points.

## Per-Phase Execution Rule

After every phase:

1. Optimize UI and copy for the problem statement.
2. Run build:

   ```powershell
   npm run build --workspace frontend
   ```

3. Auto-open or refresh browser:

   ```text
   http://127.0.0.1:5173/
   ```

4. Smoke test the phase-specific route.
5. Update `docs/OFFLINE_HANDOFF.md` if direction changed.
6. Commit the phase.
7. Push if GitHub remote is configured.

## Firebase Deployment Steps

When Firebase project is ready:

```powershell
firebase login
firebase use <project-id>
npm run build --workspace frontend
firebase deploy
```

If Firebase CLI is missing:

```powershell
npm install -g firebase-tools
```

Expected output:

```text
Hosting URL: https://<project>.web.app
```

## Pitch Defense

If judges ask why Firebase:

> Firebase gives us secure phone authentication, real-time Firestore data, serverless Functions, and Hosting on Google Cloud. That lets StadiumSync AI scale from this prototype to real matchday ticketing, crowd telemetry, and emergency response APIs without changing the architecture.

If judges ask how real data works:

> Ticketing and stadium telemetry flow into Firestore through Firebase Functions. AI agents read crowd density, ticket gates, weather risk, and incidents, then recommend safer routes and response actions. The frontend already uses the same shapes with dummy data today.
