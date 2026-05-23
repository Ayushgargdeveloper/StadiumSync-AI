import {
  Activity,
  AlertTriangle,
  Bot,
  CloudLightning,
  Gauge,
  LayoutDashboard,
  ListChecks,
  RadioTower,
  ShieldAlert,
  Siren,
  UsersRound
} from "lucide-react";

export const topbarStats = {
  stadiumStatus: "Operational",
  matchName: "Falcons vs Titans",
  crowdCount: "68,420",
  activeAlerts: 4
};

export const navigationItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Crowd Analytics", path: "/crowd-analytics", icon: UsersRound },
  { label: "Emergency Center", path: "/emergency-center", icon: Siren },
  { label: "AI Agents", path: "/ai-agents", icon: Bot },
  { label: "Weather Risk", path: "/weather-risk", icon: CloudLightning },
  { label: "Logs", path: "/logs", icon: ListChecks }
];

// Dummy telemetry keeps the UI production-shaped while real feeds are wired in.
export const overviewCards = [
  {
    label: "Occupancy",
    value: "86%",
    detail: "Upper bowl trending hot",
    tone: "cyan",
    icon: Gauge
  },
  {
    label: "Flow Rate",
    value: "14.2k/hr",
    detail: "Gate C needs support",
    tone: "emerald",
    icon: Activity
  },
  {
    label: "Risk Index",
    value: "Moderate",
    detail: "Weather + crowd density",
    tone: "amber",
    icon: AlertTriangle
  },
  {
    label: "Response Teams",
    value: "18",
    detail: "12 mobile, 6 fixed",
    tone: "rose",
    icon: ShieldAlert
  }
] as const;

export const zones = [
  { name: "North Gate", density: 74, risk: "Stable", trend: "+4%" },
  { name: "East Concourse", density: 92, risk: "Elevated", trend: "+11%" },
  { name: "South Stands", density: 81, risk: "Stable", trend: "-2%" },
  { name: "West Plaza", density: 64, risk: "Low", trend: "+1%" }
];

export const alerts = [
  {
    title: "Density spike detected",
    area: "East Concourse",
    severity: "High",
    time: "2 min ago"
  },
  {
    title: "Medical team dispatched",
    area: "Section 118",
    severity: "Medium",
    time: "7 min ago"
  },
  {
    title: "Rain cell approaching",
    area: "Open seating",
    severity: "Medium",
    time: "14 min ago"
  }
];

export const agents = [
  { name: "Flow Sentinel", status: "Active", task: "Predicting exit pressure" },
  { name: "Evac Planner", status: "Standby", task: "Route simulation ready" },
  { name: "Weather Watch", status: "Active", task: "Lightning envelope scan" },
  { name: "Dispatch Copilot", status: "Active", task: "Team allocation" }
];

export const weatherRisks = [
  { label: "Lightning", value: "18 mi", status: "Watch" },
  { label: "Wind Gusts", value: "22 mph", status: "Normal" },
  { label: "Rain Probability", value: "43%", status: "Rising" },
  { label: "Heat Index", value: "84 F", status: "Normal" }
];

export const systemLogs = [
  "AI route model refreshed for Gate C.",
  "Camera cluster E-12 latency recovered.",
  "Crowd sentiment pulse completed.",
  "Dispatch channel synced with emergency desk.",
  "Weather API checkpoint acknowledged."
];

export const liveSignals = [
  { label: "Vision nodes", value: "248", icon: RadioTower },
  { label: "Open incidents", value: "7", icon: ShieldAlert },
  { label: "AI confidence", value: "94%", icon: Bot }
];
