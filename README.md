# StadiumSync AI

StadiumSync AI is organized as one GitHub repository with a separated frontend, backend, and Firebase Hosting deployment path.

## Repository Structure

```text
frontend/   Vite + React client
backend/    Firebase Functions API
docs/       Execution phases and operational notes
```

## Local Setup

1. Install dependencies:

   ```powershell
   npm install
   npm install --workspace frontend
   npm install --workspace backend
   ```

2. Copy environment templates:

   ```powershell
   Copy-Item .env.example .env
   Copy-Item frontend/.env.example frontend/.env
   Copy-Item backend/.env.example backend/.env
   ```

3. Fill in Firebase and app configuration values.

4. Run locally:

   ```powershell
   npm run dev
   ```

## Firebase Hosting

This repo is configured for Firebase Hosting with a frontend build served from `frontend/dist` and API requests routed to Firebase Functions.

Use a Firebase project alias or CI/CD environment variables for account switching. Keep real project IDs, API keys, secrets, and service credentials out of source control.

## Phase Workflow

Each phase should be committed independently and pushed to the public GitHub repo after validation.

See [docs/EXECUTION_PLAN.md](docs/EXECUTION_PLAN.md).
