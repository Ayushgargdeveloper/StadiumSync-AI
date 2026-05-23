import { TicketSeatGuide } from "../components/dashboard/TicketSeatGuide";
import { GlassCard } from "../components/ui/GlassCard";
import { useAuth } from "../auth/AuthContext";

export function FanGuidePage() {
  const { ticket } = useAuth();

  return (
    <div>
      <section className="mb-5 grid gap-4 xl:grid-cols-[1fr_0.7fr]">
        <div className="glass-panel relative overflow-hidden rounded-lg p-6 control-ring">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-300/15 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Verified match access
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
            Your ticket is ready. Let’s get you to the seat.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
            StadiumSync AI uses the ticket linked to your booking phone number to show
            gate entry, route guidance, seat location, and nearby facilities.
          </p>
        </div>

        <GlassCard>
          <p className="text-sm text-slate-400">Active ticket</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{ticket?.holder}</h2>
          <p className="mt-2 text-sm text-slate-300">{ticket?.seat}</p>
          <div className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
            <p className="text-xs text-emerald-200">Entry window</p>
            <p className="mt-1 font-semibold text-white">{ticket?.entryWindow}</p>
          </div>
        </GlassCard>
      </section>

      <TicketSeatGuide mode="authenticated" />
    </div>
  );
}
