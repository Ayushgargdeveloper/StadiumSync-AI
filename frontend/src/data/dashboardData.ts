import {
  Activity,
  AlertTriangle,
  Bot,
  CloudLightning,
  Gauge,
  HandHeart,
  LayoutDashboard,
  ListChecks,
  RadioTower,
  Route,
  ShieldAlert,
  Siren,
  UsersRound
} from "lucide-react";

export const topbarStats = {
  stadiumStatus: "Operational",
  matchName: "Falcons vs Titans",
  liveScore: "Falcons 142/3",
  matchOver: "16.2 ov",
  chaseInfo: "Titans need 41 from 22",
  crowdCount: "68,420",
  activeAlerts: 4
};

export const navigationItems = [
  { label: "Fan Guide", path: "/", icon: Route },
  { label: "Help", path: "/help", icon: HandHeart },
  { label: "Operations", path: "/operations", icon: LayoutDashboard },
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
  {
    name: "Flow Sentinel",
    status: "Active",
    task: "Predicting exit pressure",
    inputs: "Ticket scans, camera density, gate throughput",
    action: "Divert Section 118 late arrivals to Gate D",
    confidence: "96%"
  },
  {
    name: "Evac Planner",
    status: "Ready",
    task: "Route simulation ready",
    inputs: "Open exits, blocked lanes, response team locations",
    action: "Keep East tunnel clear for medical lane",
    confidence: "91%"
  },
  {
    name: "Weather Watch",
    status: "Active",
    task: "Lightning envelope scan",
    inputs: "Rain radar, wind, open seating exposure",
    action: "Prefer covered concourse route for upper deck",
    confidence: "88%"
  },
  {
    name: "Dispatch Copilot",
    status: "Active",
    task: "Team allocation",
    inputs: "Incidents, severity, nearest team, crowd pressure",
    action: "Move Medical Alpha to Section 118",
    confidence: "94%"
  },
  {
    name: "Ticket Router",
    status: "Active",
    task: "Fan route personalization",
    inputs: "Seat section, gate load, walking time, weather risk",
    action: "Update fan route guidance before congestion forms",
    confidence: "93%"
  }
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

export const commandRecommendations = [
  {
    title: "Divert Gate C overflow",
    priority: "High",
    impact: "Reduces East Concourse pressure by 18%",
    action: "Push Section 118 late arrivals toward Gate D auxiliary lane."
  },
  {
    title: "Pre-stage medical team",
    priority: "Medium",
    impact: "Cuts response time near Section 118",
    action: "Move Medical Alpha to East lower-bowl tunnel."
  },
  {
    title: "Weather-aware concourse routing",
    priority: "Medium",
    impact: "Keeps fans on covered path",
    action: "Update Fan Guide route copy for open seating and upper deck."
  }
] as const;

export const bottleneckPredictions = [
  {
    zone: "East Concourse",
    risk: "Severe",
    eta: "9 min",
    cause: "Gate C scan rate below arrival rate",
    diversion: "Open Gate D bypass and pause plaza inflow"
  },
  {
    zone: "North Gate",
    risk: "Watch",
    eta: "14 min",
    cause: "Merch queue spilling toward entry lane",
    diversion: "Shift volunteers to lane splitters"
  },
  {
    zone: "West Plaza",
    risk: "Stable",
    eta: "22 min",
    cause: "Post-over movement toward food court",
    diversion: "No diversion needed"
  }
] as const;

export const responseAutomations = [
  { label: "Security dispatch", value: "2 teams routed", status: "Active" },
  { label: "Fan route updates", value: "1,248 devices", status: "Queued" },
  { label: "Volunteer tasks", value: "6 instructions", status: "Sent" }
] as const;

export const emergencyBroadcasts = [
  {
    audience: "All fans",
    channel: "Push + SMS fallback",
    message: "Emergency route update: avoid Gate C, follow staff to Gate D bypass.",
    status: "Ready"
  },
  {
    audience: "Police control",
    channel: "Command relay",
    message: "Crowd surge risk at East Concourse. Request perimeter support.",
    status: "Ready"
  },
  {
    audience: "Fire response",
    channel: "Emergency desk",
    message: "Keep Gate D service lane open for emergency access.",
    status: "Ready"
  },
  {
    audience: "Medical teams",
    channel: "Dispatch alert",
    message: "Medical Alpha to Section 118 tunnel, standby near lower bowl.",
    status: "Ready"
  }
] as const;

export const gateEmergencyUpdates = [
  { gate: "Gate C", status: "Restricted", instruction: "Stop inflow and redirect late arrivals." },
  { gate: "Gate D", status: "Open bypass", instruction: "Use as emergency diversion route." },
  { gate: "Gate A", status: "Normal", instruction: "Continue standard scanning." }
] as const;

export const ticketSections = [
  {
    section: "118",
    stand: "Lower Bowl",
    side: "East Touchline",
    gate: "Gate C",
    entryTime: "45 min before kickoff",
    aisle: "Aisle 12",
    rowRange: "Rows 1-18",
    walkTime: "6 min",
    nearestParking: "Lot E2",
    amenities: ["Restrooms E-14", "Food Court 3", "First Aid 118"],
    note: "Best route uses the East Concourse escalator, then left at the cyan wayfinding pillar.",
    coordinates: { x: "73%", y: "48%" }
  },
  {
    section: "204",
    stand: "Club Level",
    side: "North Arc",
    gate: "Gate A",
    entryTime: "60 min before kickoff",
    aisle: "Aisle 27",
    rowRange: "Rows 1-12",
    walkTime: "8 min",
    nearestParking: "Lot N1",
    amenities: ["Club Lounge N", "Restrooms N-07", "Merch Hub North"],
    note: "Use the north glass elevators for the shortest accessible path to club seating.",
    coordinates: { x: "50%", y: "24%" }
  },
  {
    section: "332",
    stand: "Upper Deck",
    side: "West Corner",
    gate: "Gate D",
    entryTime: "70 min before kickoff",
    aisle: "Aisle 41",
    rowRange: "Rows 6-29",
    walkTime: "11 min",
    nearestParking: "Lot W4",
    amenities: ["Restrooms W-22", "Snack Bar 9", "Family Services"],
    note: "West ramp is smoother during peak entry than the central stair tower.",
    coordinates: { x: "30%", y: "61%" }
  },
  {
    section: "VIP-07",
    stand: "Premium Suite",
    side: "South Sideline",
    gate: "Gate S",
    entryTime: "90 min before kickoff",
    aisle: "Suite Lift 2",
    rowRange: "Suite level",
    walkTime: "4 min",
    nearestParking: "VIP South",
    amenities: ["Suite Lounge", "Private Restrooms", "Concierge Desk"],
    note: "Enter through the south premium lobby and follow the gold suite corridor.",
    coordinates: { x: "50%", y: "76%" }
  }
] as const;

export const bookedTickets = [
  {
    phone: "9876543210",
    holder: "Aarav Mehta",
    ticketId: "SSAI-FAL-118-0921",
    match: "Falcons vs Titans",
    seat: "Section 118, Row 8, Seat 14",
    section: "118",
    status: "Verified",
    entryWindow: "6:15 PM - 6:45 PM"
  },
  {
    phone: "9123456780",
    holder: "Maya Rao",
    ticketId: "SSAI-FAL-204-1187",
    match: "Falcons vs Titans",
    seat: "Section 204, Row 3, Seat 6",
    section: "204",
    status: "Verified",
    entryWindow: "6:00 PM - 6:35 PM"
  },
  {
    phone: "9988776655",
    holder: "Kabir Singh",
    ticketId: "SSAI-FAL-332-4104",
    match: "Falcons vs Titans",
    seat: "Section 332, Row 16, Seat 22",
    section: "332",
    status: "Verified",
    entryWindow: "5:55 PM - 6:30 PM"
  }
] as const;

export const fanSafetyAdvisories = [
  {
    label: "Best arrival",
    value: "6:15 PM",
    detail: "Arrive inside your verified entry window to reduce surge pressure."
  },
  {
    label: "Avoid",
    value: "Gate B queue",
    detail: "AI predicts slower movement near central plaza before kickoff."
  },
  {
    label: "Weather note",
    value: "Light rain watch",
    detail: "Covered concourse path is preferred for this section."
  }
] as const;
