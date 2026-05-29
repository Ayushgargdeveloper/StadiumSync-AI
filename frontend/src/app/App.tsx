import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/LoginPage";

const AIAgentsPage = lazy(() =>
  import("../pages/AIAgentsPage").then((module) => ({ default: module.AIAgentsPage }))
);
const CrowdAnalyticsPage = lazy(() =>
  import("../pages/CrowdAnalyticsPage").then((module) => ({ default: module.CrowdAnalyticsPage }))
);
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage").then((module) => ({ default: module.DashboardPage }))
);
const EmergencyCenterPage = lazy(() =>
  import("../pages/EmergencyCenterPage").then((module) => ({ default: module.EmergencyCenterPage }))
);
const FanGuidePage = lazy(() =>
  import("../pages/FanGuidePage").then((module) => ({ default: module.FanGuidePage }))
);
const HelpPage = lazy(() =>
  import("../pages/HelpPage").then((module) => ({ default: module.HelpPage }))
);
const LogsPage = lazy(() =>
  import("../pages/LogsPage").then((module) => ({ default: module.LogsPage }))
);
const WeatherRiskPage = lazy(() =>
  import("../pages/WeatherRiskPage").then((module) => ({ default: module.WeatherRiskPage }))
);

function RouteFallback() {
  return (
    <div className="grid min-h-[48vh] place-items-center">
      <div className="rounded-lg border border-cyan-300/20 bg-slate-950/55 px-5 py-4 text-sm font-semibold text-cyan-100 shadow-glow">
        Syncing venue intelligence...
      </div>
    </div>
  );
}

export function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<FanGuidePage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="operations" element={<DashboardPage />} />
            <Route path="crowd-analytics" element={<CrowdAnalyticsPage />} />
            <Route path="emergency-center" element={<EmergencyCenterPage />} />
            <Route path="ai-agents" element={<AIAgentsPage />} />
            <Route path="weather-risk" element={<WeatherRiskPage />} />
            <Route path="logs" element={<LogsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
