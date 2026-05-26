# GCP Firebase Deployment

Use this checklist to upload StadiumSync AI to Google Cloud through Firebase.

## Architecture

```text
Firebase Hosting
  -> serves frontend/dist
  -> rewrites /api/** to Firebase Functions

Firebase Functions
  -> backend/src/index.ts
  -> mock API today, ready for Firestore, Auth, Gemini, and Maps APIs
```

## One-Time GCP/Firebase Setup

1. Open the Google Cloud Console and create/select a project.
2. Open Firebase Console and add Firebase to the same Google Cloud project.
3. Enable Firebase Hosting.
4. Enable Firebase Functions.
5. If using real login later, enable Firebase Authentication with Phone provider.
6. If using real data later, enable Cloud Firestore.
7. If using AI and route APIs later, enable Vertex AI/Gemini and Google Maps Platform APIs.

## Local Project Setup

From the repo root:

```powershell
Copy-Item .env.example .env
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
Copy-Item .firebaserc.example .firebaserc
```

Edit `.firebaserc`:

```json
{
  "projects": {
    "default": "your-real-firebase-project-id"
  }
}
```

Edit `frontend/.env` with the Firebase web app config from Firebase Console.

Edit `backend/.env`:

```text
APP_ENV=production
FIREBASE_PROJECT_ID=your-real-firebase-project-id
ALLOWED_ORIGINS=https://your-real-firebase-project-id.web.app
GOOGLE_CLOUD_PROJECT=your-real-google-cloud-project-id
```

Keep real API keys and secrets out of Git.

## Verify Before Upload

```powershell
npm install
npm run build
```

Expected result:

```text
frontend builds into frontend/dist
backend builds into backend/lib
```

## Deploy

```powershell
firebase login
firebase use your-real-firebase-project-id
npm run firebase:deploy
```

`firebase.json` runs predeploy builds automatically, so the deployed frontend and backend should match the latest code.

## Safer Preview Deploy

Use this if you want a temporary judge/demo URL first:

```powershell
npm run firebase:preview
```

## After Deploy

Check these URLs:

```text
https://your-real-firebase-project-id.web.app/
https://your-real-firebase-project-id.web.app/login
https://your-real-firebase-project-id.web.app/api/health
```

Expected `/api/health` response:

```json
{
  "ok": true,
  "service": "stadiumsync-ai-api",
  "environment": "production"
}
```

## Demo Login Numbers

```text
9876543210
9123456780
9988776655
```

## GCP Upgrade Path

- Firebase Auth Phone OTP replaces demo phone login.
- Firestore stores tickets, matches, crowd zones, incidents, logs, and agent recommendations.
- Firebase Functions validates user identity and reads ticket data.
- Vertex AI/Gemini generates route, incident, and crowd response recommendations.
- Google Maps Routes API supports parking-to-gate guidance.

