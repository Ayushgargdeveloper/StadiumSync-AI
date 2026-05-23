import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AIAgentsPage } from "../pages/AIAgentsPage";
import { CrowdAnalyticsPage } from "../pages/CrowdAnalyticsPage";
import { DashboardPage } from "../pages/DashboardPage";
import { EmergencyCenterPage } from "../pages/EmergencyCenterPage";
import { LogsPage } from "../pages/LogsPage";
import { WeatherRiskPage } from "../pages/WeatherRiskPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="crowd-analytics" element={<CrowdAnalyticsPage />} />
        <Route path="emergency-center" element={<EmergencyCenterPage />} />
        <Route path="ai-agents" element={<AIAgentsPage />} />
        <Route path="weather-risk" element={<WeatherRiskPage />} />
        <Route path="logs" element={<LogsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
