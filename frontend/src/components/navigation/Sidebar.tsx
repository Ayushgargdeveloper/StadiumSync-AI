import { Link, NavLink } from "react-router-dom";
import { Cpu, LogOut, Menu, Sparkles, X, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { navigationItems } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <aside className="glass-panel signal-sweep sticky top-3 z-30 mx-3 mt-3 rounded-lg p-3 lg:fixed lg:inset-y-4 lg:left-4 lg:right-auto lg:mx-0 lg:mt-0 lg:w-64">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="flex items-center justify-between gap-3 lg:mb-8">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-lg outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          aria-label="Go to home"
        >
          <div className="relative rounded-lg bg-cyan-300/15 p-2 text-cyan-200 shadow-glow">
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/10" />
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">StadiumSync AI</p>
            <p className="text-xs text-slate-400">Crowd command grid</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-lg border border-white/10 bg-white/[0.06] p-2 text-slate-300 transition hover:border-cyan-300/30 hover:text-white lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        className={cn(
          "no-scrollbar mt-4 gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex lg:flex-col lg:overflow-visible lg:pb-0",
          isOpen ? "flex" : "hidden"
        )}
      >
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                "group flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition lg:min-w-0",
                "hover:bg-white/10 hover:text-white",
                isActive &&
                  "bg-gradient-to-r from-cyan-300/18 to-blue-400/10 text-cyan-100 ring-1 ring-cyan-300/25"
              )
            }
          >
            <item.icon className="h-4 w-4 transition group-hover:scale-110" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="group flex min-w-max items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <LogOut className="h-4 w-4 transition group-hover:scale-110" />
          <span>Sign out</span>
        </button>
      </nav>

      <div className="mt-6 hidden rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 lg:block">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
          <Sparkles className="h-4 w-4" />
          Predictive mode
        </div>
        <p className="mt-3 text-sm leading-5 text-slate-300">
          Exit pressure model recalibrates every 90 seconds.
        </p>
        <div className="pulse-bars mt-4 flex h-8 items-end gap-1.5" aria-hidden="true">
          {[48, 70, 56, 86].map((height) => (
            <span
              key={height}
              className="w-full rounded-t bg-gradient-to-t from-cyan-300/30 to-emerald-200"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-300/15 bg-black/20 px-3 py-2 text-xs font-semibold text-emerald-100">
          <Zap className="h-3.5 w-3.5" />
          Auto-routing enabled
        </div>
      </div>
    </aside>
  );
}
