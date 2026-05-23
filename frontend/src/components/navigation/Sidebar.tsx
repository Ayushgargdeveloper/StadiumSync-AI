import { NavLink } from "react-router-dom";
import { Cpu, Menu } from "lucide-react";
import { navigationItems } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

export function Sidebar() {
  return (
    <aside className="glass-panel fixed inset-x-3 top-3 z-30 rounded-lg p-3 lg:inset-y-4 lg:left-4 lg:right-auto lg:w-64">
      <div className="flex items-center justify-between gap-3 lg:mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-300/15 p-2 text-cyan-200 shadow-glow">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">StadiumSync AI</p>
            <p className="text-xs text-slate-400">Crowd command grid</p>
          </div>
        </div>
        <Menu className="h-5 w-5 text-slate-400 lg:hidden" />
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition",
                "hover:bg-white/10 hover:text-white",
                isActive && "bg-cyan-300/15 text-cyan-100 ring-1 ring-cyan-300/20"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
