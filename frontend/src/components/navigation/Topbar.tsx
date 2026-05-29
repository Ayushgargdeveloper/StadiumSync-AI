import { useEffect, useState } from "react";
import { Bell, Radio, ShieldCheck, Trophy, UsersRound, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { fallbackVenueStatus, fetchVenueStatus } from "../../utils/liveData";

export function Topbar() {
  const { ticket, logout } = useAuth();
  const navigate = useNavigate();
  const [topbarStats, setTopbarStats] = useState(() => fallbackVenueStatus());

  useEffect(() => {
    let isMounted = true;

    fetchVenueStatus().then((data) => {
      if (isMounted) {
        setTopbarStats(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const statusItems = [
    {
      label: "Status",
      value: topbarStats.stadiumStatus,
      icon: ShieldCheck,
      className: "text-emerald-200"
    },
    {
      label: "Match",
      value: topbarStats.matchName,
      icon: Trophy,
      className: "text-cyan-200"
    },
    {
      label: "Crowd",
      value: topbarStats.crowdCount,
      icon: UsersRound,
      className: "text-blue-200"
    },
    {
      label: "Alerts",
      value: String(topbarStats.activeAlerts),
      icon: Bell,
      className: "text-amber-200",
      path: "/emergency-center"
    }
  ];

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-cockpit/65 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <Radio className="h-4 w-4" />
              Live score
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-semibold text-white">
              {topbarStats.liveScore}
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
              {topbarStats.matchOver}
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            {ticket ? `${topbarStats.chaseInfo} - ${ticket.holder} - ${ticket.seat}` : topbarStats.chaseInfo}
          </p>
          <div className="mt-3 flex max-w-xl items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
            <Waves className="h-3.5 w-3.5 text-emerald-200" />
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-200 to-amber-200"
                style={{ width: `${topbarStats.venuePulse}%` }}
              />
            </div>
            <span className="font-semibold text-cyan-100">Venue pulse {topbarStats.venuePulse}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 xl:min-w-[680px]">
          {statusItems.map((item) => {
            const content = (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <item.icon className={`h-3.5 w-3.5 ${item.className}`} />
                  {item.label}
                </div>
                <p className="mt-1 text-sm font-semibold leading-tight text-white">
                  {item.value}
                </p>
              </>
            );

            if ("path" in item && item.path) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="min-w-0 rounded-lg border border-amber-300/20 bg-amber-300/[0.08] px-3 py-2 text-left shadow-lg shadow-black/20 transition hover:border-amber-200/50 hover:bg-amber-300/[0.12]"
                  aria-label={`Open ${item.value} active alerts`}
                >
                  {content}
                </button>
              );
            }

            return (
              <div
                key={item.label}
                className="min-w-0 rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 shadow-lg shadow-black/20"
              >
                {content}
              </div>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/10 bg-white/[0.07] px-3 py-2 text-left text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition hover:border-cyan-300/30 hover:text-white"
          >
            <span className="block text-xs font-normal text-slate-400">Access</span>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
