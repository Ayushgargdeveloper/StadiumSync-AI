import { useState, type FormEvent } from "react";
import {
  Bell,
  CheckCircle2,
  HandHeart,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldAlert
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { GlassCard } from "../components/ui/GlassCard";
import { PageHeader } from "../components/ui/PageHeader";
import { saveHelpRequest, type StoredHelpRequest } from "../utils/helpRequests";

type HelpRequest = {
  category: string;
  urgency: string;
  message: string;
};

const helpCategories = [
  "Seat or gate guidance",
  "Medical support",
  "Security concern",
  "Lost item",
  "Food, water, or facilities",
  "Accessibility help"
];

export function HelpPage() {
  const { ticket } = useAuth();
  const [permission, setPermission] = useState(
    typeof Notification === "undefined" ? "unsupported" : Notification.permission
  );
  const [sosSent, setSosSent] = useState(false);
  const [request, setRequest] = useState<HelpRequest>({
    category: helpCategories[0],
    urgency: "Normal",
    message: ""
  });
  const [submittedRequest, setSubmittedRequest] = useState<StoredHelpRequest | null>(null);

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

  function submitHelpRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!request.message.trim()) {
      return;
    }

    const storedRequest = saveHelpRequest({
      ...request,
      message: request.message.trim(),
      holder: ticket?.holder ?? "Verified fan",
      seat: ticket?.seat ?? "Ticket location pending"
    });
    setSubmittedRequest(storedRequest);
    setRequest((current) => ({ ...current, message: "" }));
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

        <GlassCard className="bg-gradient-to-br from-cyan-300/[0.08] via-white/[0.045] to-emerald-300/[0.04]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-300/15 p-3 text-cyan-100">
              <MessageSquareText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Tell Us What Help You Need</h2>
              <p className="text-sm text-slate-400">Send a clear request to the nearest support desk</p>
            </div>
          </div>

          <form onSubmit={submitHelpRequest} className="mt-5 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-300" htmlFor="help-category">
                Help type
                <select
                  id="help-category"
                  value={request.category}
                  onChange={(event) =>
                    setRequest((current) => ({ ...current, category: event.target.value }))
                  }
                  className="mt-2 w-full rounded-lg border border-cyan-300/20 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-200 focus:shadow-glow"
                >
                  {helpCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-300" htmlFor="help-urgency">
                Urgency
                <select
                  id="help-urgency"
                  value={request.urgency}
                  onChange={(event) =>
                    setRequest((current) => ({ ...current, urgency: event.target.value }))
                  }
                  className="mt-2 w-full rounded-lg border border-cyan-300/20 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-200 focus:shadow-glow"
                >
                  {["Normal", "Need staff soon", "Urgent but not SOS"].map((urgency) => (
                    <option key={urgency} value={urgency}>
                      {urgency}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-300" htmlFor="help-message">
              What do you need?
              <textarea
                id="help-message"
                value={request.message}
                onChange={(event) =>
                  setRequest((current) => ({ ...current, message: event.target.value }))
                }
                rows={5}
                maxLength={280}
                placeholder="Example: I need wheelchair assistance from Gate C to Section 118."
                className="mt-2 w-full resize-none rounded-lg border border-cyan-300/20 bg-slate-950/80 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200 focus:shadow-glow"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400">
                Request is linked to {ticket?.seat ?? "your verified ticket location"}.
              </p>
              <button
                type="submit"
                disabled={!request.message.trim()}
                className="flex items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none"
              >
                <Send className="h-4 w-4" />
                Send help request
              </button>
            </div>
          </form>

          {submittedRequest && (
            <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                <CheckCircle2 className="h-4 w-4" />
                Help request queued
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-emerald-200">Type</p>
                  <p className="mt-1 text-sm font-semibold text-white">{submittedRequest.category}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-200">Urgency</p>
                  <p className="mt-1 text-sm font-semibold text-white">{submittedRequest.urgency}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-200">{submittedRequest.message}</p>
              <p className="mt-3 text-xs text-emerald-100">
                Visible to staff in Logs as request #{submittedRequest.id.slice(0, 8)}.
              </p>
            </div>
          )}
        </GlassCard>
      </section>

      <section className="mt-5">
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
