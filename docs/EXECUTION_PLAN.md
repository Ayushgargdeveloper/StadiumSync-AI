# Master Execution Plan

## Ground Rules

- Keep everything in one GitHub repository.
- Keep the repository public initially.
- Commit after every phase.
- Push after every committed phase.
- Use Firebase Hosting for simple account/project switching.
- Keep backend and frontend separated.
- Store deploy and runtime configuration in environment variables.
- Commit `.env.example` files only; never commit real `.env` files.

## Phase 0: Repo Baseline

Goal: create a clean deployable foundation.

Deliverables:

- Root monorepo scripts.
- `frontend/` Vite React app.
- `backend/` Firebase Functions API.
- Firebase Hosting configuration.
- `.env.example` files.
- Git ignore rules.

Exit criteria:

- Initial files are committed.
- GitHub remote is configured.
- Public repo is pushed.

## Phase 1: Product Definition

Goal: lock the StadiumSync AI MVP scope before building business logic.

Deliverables:

- User roles.
- Core workflows.
- Data model.
- Integration list.
- Firebase services required.
- Milestone-level acceptance criteria.

Exit criteria:

- MVP scope is documented.
- Data contracts are stable enough for implementation.

## Phase 2: Frontend Shell

Goal: build the navigable app shell.

Deliverables:

- Routing.
- Layout.
- Authentication screens.
- Dashboard frame.
- API client.
- Environment-driven Firebase client config.

Exit criteria:

- Frontend runs locally.
- App shell is responsive.
- No secrets are committed.

## Phase 3: Backend API

Goal: implement Firebase Functions and shared contracts.

Deliverables:

- Health endpoint.
- Auth-aware API middleware.
- Firestore access layer.
- Input validation.
- Structured errors.

Exit criteria:

- Backend emulator runs locally.
- Frontend can call API endpoints.

## Phase 4: Firebase Hosting Deployment

Goal: deploy the app through Firebase Hosting.

Deliverables:

- Build output served from Hosting.
- API rewrite to Functions.
- Project/account switching documented.
- Deploy scripts.

Exit criteria:

- Firebase deployment succeeds.
- Deployed app loads and API health check passes.

## Phase 5: CI/CD

Goal: automate validation and deployment.

Deliverables:

- GitHub Actions workflow.
- Build checks.
- Tests.
- Firebase deploy job gated by environment variables/secrets.

Exit criteria:

- Pull requests validate automatically.
- Main branch can deploy with configured secrets.
