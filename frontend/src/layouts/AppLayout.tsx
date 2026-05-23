import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { Topbar } from "../components/navigation/Topbar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-cockpit text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.20),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,#070B12_0%,#101827_52%,#070B12_100%)]" />
      <div className="flex min-h-screen">
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
