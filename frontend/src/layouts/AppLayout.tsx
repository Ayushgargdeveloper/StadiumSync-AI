import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { Topbar } from "../components/navigation/Topbar";

export function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cockpit text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(20,184,166,0.22),transparent_28%),radial-gradient(circle_at_86%_8%,rgba(99,102,241,0.18),transparent_26%),radial-gradient(circle_at_70%_78%,rgba(244,63,94,0.10),transparent_30%),linear-gradient(135deg,#05070c_0%,#0a1220_46%,#05070c_100%)]" />
      <div className="scan-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="noise-layer pointer-events-none fixed inset-0 -z-10 opacity-30" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-cyan-300/10 to-transparent" />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
          <Topbar />
          <main className="w-full flex-1 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
