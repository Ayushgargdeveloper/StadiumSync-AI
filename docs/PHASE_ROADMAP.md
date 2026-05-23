# StadiumSync AI Phase Roadmap

This roadmap is optimized for the hackathon judging agenda: functional fulfillment, scalability/security, code quality, deployment readiness, innovation, live demo execution, pitching, and technical defense.

## Winning Product Direction

StadiumSync AI should be presented as a two-sided real-time stadium command platform:

1. Fan Safety Experience:
   - Ticket-holder login.
   - Ticket lookup.
   - Gate, section, row, seat, amenities, and route-to-seat guidance.
   - Dynamic instructions to reduce bottlenecks before they form.

2. Organizer Command Experience:
   - Live operations dashboard.
   - Crowd density and bottleneck prediction.
   - Weather and threat monitoring.
   - Emergency response automation.
   - AI agents for routing, dispatch, and risk analysis.

The strongest story is not only "find my seat." The winning story is:

> StadiumSync AI unifies ticketing, crowd routing, security response, and weather-aware operations into one AI command system for safer cricket matchdays.

## Recommended Technology Stack

### Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Firebase Web SDK

Already implemented.

### Backend

Recommended: Firebase Functions with TypeScript.

Why:

- Fastest path to deploy.
- Works naturally with Firebase Hosting.
- Easy account switching through Firebase project config.
- Good for serverless APIs.
- Easy future integration with Firestore, Auth, Cloud Messaging, and Google Cloud APIs.
- Strong enough for hackathon technical defense.
- Server-side place to safely use Google Cloud credits and API keys.

Backend responsibilities:

- Ticket lookup API.
- Role-aware user profile endpoint.
- Crowd zone data endpoint.
- Incident creation and dispatch endpoint.
- AI-agent recommendations endpoint.
- Weather risk endpoint.

### Database

Recommended: Cloud Firestore.

Collections:

```text
users
tickets
matches
stadiumZones
crowdSignals
incidents
agentRecommendations
weatherRisks
systemLogs
```

### Authentication

Recommended production flow:

- Firebase Auth phone OTP for fans.
- Custom claims or Firestore role document for organizer/admin access.
- Demo currently uses local phone-number login with dummy ticket data.

### Deployment

Recommended: Firebase Hosting + Firebase Functions.

Why:

- Firebase Hosting is part of Google Cloud.
- Easiest live demo deployment.
- Fast rollback and account switching.
- Serverless backend deploy from the same repo.

GCP Portal talking points:

- Firebase project is backed by Google Cloud.
- Functions run on Google Cloud serverless infrastructure.
- Firestore is the real-time operational database.
- Future AI integration can use Vertex AI / Gemini APIs.
- Google Maps Routes API can be added through Functions for real parking-to-gate navigation.

### Real Google Cloud Data Strategy

Use Google Cloud APIs through the backend, not the frontend:

- Firebase Auth phone OTP for real ticket-holder login.
- Firestore for real tickets, match data, incidents, zones, and logs.
- Firebase Functions for secure ticket lookup and role-aware APIs.
- Vertex AI / Gemini for AI agent recommendations and response summaries.
- Google Maps Routes API for parking-to-gate or external arrival routing if credits allow.

Keep dummy fallback data for live demo stability.

## Phase 0: Completed Foundation

Status: Done.

Delivered:

- Monorepo structure.
- Frontend/backend separation.
- Firebase config.
- React/Vite frontend.
- Tailwind, router, motion, icons.
- Offline handoff docs.

Exit criteria:

- Repo builds locally.
- Project survives account switching.

## Phase 1: Completed Fan-Gated UX

Status: Done.

Delivered:

- Login page.
- Demo phone-number ticket authentication.
- Protected app routes.
- Fan Guide as first page after login.
- Ticket details.
- Stadium structure preview.
- Get-to-seat route mode.

Exit criteria:

- `/` redirects to `/login` if signed out.
- Demo phone login works.
- Fan Guide opens first after login.

## Phase 2: Polish Core Demo Flow

Goal: make the live demo feel complete and judge-ready.

Status: Completed.

Tasks:

- Make login page visually sharper and problem-aligned.
- Make Fan Guide immediately explain gate, seat, route, and congestion reduction.
- Add small safety/advisory panel: best arrival time, avoid congested gate, weather note.
- Add clear "This reduces bottlenecks" messaging without making it look like a marketing page.
- Ensure mobile and desktop layouts do not overlap.

Delivered:

- Fan Guide hero now explains congestion reduction.
- Active ticket panel highlights verified access and entry window.
- Safety advisory cards show best arrival, queue avoidance, and weather note.
- Ticket navigator copy now explains density-aware routing.

Demo proof:

- Login with `9876543210`.
- Show ticket.
- Click "Get to my seat."
- Explain that routing can change based on live crowd density.

## Phase 3: Strengthen Operations Command Center

Goal: show organizers/security that the platform solves the operations side.

Tasks:

- Rename/label operations dashboard around problem statement:
  - bottlenecks,
  - security vulnerabilities,
  - weather shifts,
  - emergency response.
- Add "Command Recommendation" cards.
- Add predicted bottleneck zones.
- Add route diversion suggestions.
- Add emergency dispatch status.

Demo proof:

- Open `/operations`.
- Show live venue twin and crowd pressure topology.
- Show density spike and suggested intervention.

## Phase 4: Agentic AI Story

Goal: win innovation and agentic depth points.

AI agents to show:

- Flow Sentinel: predicts bottlenecks and recommends gate diversions.
- Evac Planner: simulates emergency exits and crowd-safe routes.
- Weather Watch: monitors weather shifts and triggers alerts.
- Dispatch Copilot: assigns medical/security teams.
- Ticket Router: adjusts fan route instructions based on section and density.

Tasks:

- Improve AI Agents page with agent cards, confidence, input signals, and actions.
- Add "agent recommendation log."
- Show how agents collaborate.

Demo proof:

- Open `/ai-agents`.
- Explain agent workflow in 30 seconds.

## Phase 5: Backend API Scaffold

Goal: move from frontend dummy data toward production architecture.

Technology:

- Firebase Functions TypeScript.
- Firestore-ready data contracts.

Endpoints:

```text
GET /api/health
POST /api/tickets/lookup
GET /api/matches/:matchId/zones
GET /api/matches/:matchId/weather-risk
POST /api/incidents
GET /api/agents/recommendations
```

Tasks:

- Add typed API contracts.
- Add mock backend responses.
- Frontend API client can fall back to dummy data if backend unavailable.

Demo proof:

- Health endpoint works.
- Ticket lookup endpoint returns ticket-shaped data.

## Phase 6: Firebase/GCP Deployment

Goal: get deployment points and stable live demo URL.

Tasks:

- Create Firebase project.
- Configure `.firebaserc`.
- Add Firebase Hosting target.
- Build frontend.
- Deploy Hosting.
- Deploy Functions if backend phase is complete.

Commands:

```powershell
npm run build --workspace frontend
firebase login
firebase use <project-id>
firebase deploy
```

If Firebase CLI is missing:

```powershell
npm install -g firebase-tools
```

Deployment proof:

- Public Firebase Hosting URL opens.
- Login flow works.
- Fan Guide works.

## Phase 7: Pitch And Technical Defense

Goal: prepare for Q&A.

Must explain:

- Why Firebase Auth phone OTP protects ticket-holder access.
- How Firestore stores tickets, zones, incidents, and logs.
- How Functions protect APIs and perform ticket lookup.
- How AI agents use signals from ticketing, crowd density, weather, and incidents.
- How it scales for cricket crowds.
- How emergency routing can update fan instructions.

Live demo script:

1. Open app.
2. Login with demo number.
3. Show Fan Guide.
4. Click "Get to my seat."
5. Open Operations.
6. Show bottleneck/risk dashboard.
7. Open AI Agents.
8. Explain agent recommendations.
9. Open Emergency Center.
10. Close with Firebase/GCP architecture.

## Priority Order From Now

1. Phase 2: polish fan demo flow.
2. Phase 3: align operations dashboard to problem statement.
3. Phase 4: strengthen AI agents story.
4. Phase 5: add backend API scaffold if time allows.
5. Phase 6: deploy to Firebase/GCP.
6. Phase 7: rehearse pitch.

## Required After Every Phase

1. Optimize UI and wording around the problem statement.
2. Run `npm run build --workspace frontend`.
3. Refresh/open `http://127.0.0.1:5173/` in the in-app browser.
4. Smoke test the changed route.
5. Update handoff docs if direction changed.
6. Commit the phase.
7. Push if GitHub remote exists.

## What Not To Do Before Demo

- Do not overbuild real sensor integrations.
- Do not spend too long on authentication backend before the story is clear.
- Do not add unrelated pages.
- Do not hide the Fan Guide behind operations screens.
- Do not leave uncommitted changes before switching accounts.
