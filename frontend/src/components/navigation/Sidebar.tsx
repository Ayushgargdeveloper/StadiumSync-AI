import { NavLink } from "react-router-dom";
import { Cpu, Menu, Sparkles } from "lucide-react";
import { navigationItems } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

export function Sidebar() {
  return (
    <aside className="glass-panel fixed inset-x-3 top-3 z-30 rounded-lg p-3 lg:inset-y-4 lg:left-4 lg:right-auto lg:w-64">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="flex items-center justify-between gap-3 lg:mb-8">
        <div className="flex items-center gap-3">
          <div className="relative rounded-lg bg-cyan-300/15 p-2 text-cyan-200 shadow-glow">
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/10" />
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">StadiumSync AI</p>
            <p className="text-xs text-slate-400">Crowd command grid</p>
          </div>
        </div>
        <Menu className="h-5 w-5 text-slate-400 lg:hidden" />
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-0 lg:flex lg:flex-col">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "group flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition",
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
      </nav>

      <div className="mt-6 hidden rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 lg:block">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
          <Sparkles className="h-4 w-4" />
          Predictive mode
        </div>
        <p className="mt-3 text-sm leading-5 text-slate-300">
          Exit pressure model recalibrates every 90 seconds.
        </p>
      </div>
    </aside>
  );
}
