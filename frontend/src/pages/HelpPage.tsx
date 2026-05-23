import { useState } from "react";
import { Bell, HandHeart, MapPin, Phone, ShieldAlert } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";

export function HelpPage() {
  const { ticket } = useAuth();
  const [permission, setPermission] = useState(
    typeof Notification === "undefined" ? "unsupported" : Notification.permission
  );
  const [sosSent, setSosSent] = useState(false);

  async function requestNotifications() {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  }

  function sendSos() {
    setSosSent(true);

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("StadiumSync SOS sent", {
        body: "Nearest response team notified. Stay near your seat marker unless staff direct you."
      });
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Fan emergency help"
        title="One-tap SOS and safety notifications"
        description="Fans can request emergency help, allow critical notifications, and receive gate or route updates during a live incident."
      />

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="bg-gradient-to-br from-rose-300/[0.09] to-white/[0.035]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-rose-300/15 p-3 text-rose-100">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Emergency SOS</h2>
              <p className="text-sm text-slate-400">Linked to your verified ticket and seat</p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
            <p className="text-sm text-slate-400">Current location</p>
            <p className="mt-2 font-semibold text-white">{ticket?.seat}</p>
            <p className="mt-1 text-sm text-slate-300">Nearest marker: East Touchline - Aisle 12</p>
          </div>

          <button
            type="button"
            onClick={sendSos}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-300/30 bg-rose-300 px-4 py-4 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-rose-200"
          >
            <HandHeart className="h-5 w-5" />
            Send SOS to stadium control
          </button>

          {sosSent && (
            <div className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
              SOS logged. Medical Alpha and Security Delta receive your section, row, and seat.
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Allow notifications so emergency gate changes, route diversions, and safety instructions
            can reach you during the match.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Permission", permission],
              ["Gate updates", "Enabled in demo"],
              ["SOS contact", "Stadium control"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={requestNotifications}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200"
          >
            <Bell className="h-4 w-4" />
            Allow emergency notifications
          </button>

          <div className="mt-5 space-y-3">
            {[
              ["Police", "Control room can relay crowd surge alerts."],
              ["Fire", "Service lane and gate access updates are broadcast."],
              ["Medical", "SOS includes seat, aisle, and nearest route marker."]
            ].map(([label, detail]) => (
              <div key={label} className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 p-3">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-200" />
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="text-sm text-slate-300">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
            <Phone className="h-4 w-4 text-emerald-200" />
            Production version: Firebase Cloud Messaging + SMS provider + emergency service API.
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
