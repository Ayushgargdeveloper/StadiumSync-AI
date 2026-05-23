import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
const appName = import.meta.env.VITE_APP_NAME || "StadiumSync AI";

function App() {
  return (
    <main className="app-shell">
      <section className="workspace">
        <p className="eyebrow">Firebase-ready monorepo</p>
        <h1>{appName}</h1>
        <p className="intro">
          Frontend and backend are separated, environment-driven, and prepared
          for Firebase Hosting deployment.
        </p>
        <dl className="status-grid">
          <div>
            <dt>Frontend</dt>
            <dd>Vite + React</dd>
          </div>
          <div>
            <dt>Backend</dt>
            <dd>Firebase Functions</dd>
          </div>
          <div>
            <dt>API base</dt>
            <dd>{apiBaseUrl}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
