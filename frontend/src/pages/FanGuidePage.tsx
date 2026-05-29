import { Footprints, ShieldCheck, TicketCheck, TimerReset } from "lucide-react";
import { Fragment } from "react";
import { useAuth } from "../auth/AuthContext";
import { TicketSeatGuide } from "../components/dashboard/TicketSeatGuide";
import { GlassCard } from "../components/ui/GlassCard";
import { fanSafetyAdvisories } from "../data/dashboardData";

export function FanGuidePage() {
  const { ticket } = useAuth();

  return (
    <div>
      <section className="mb-5 grid gap-4 xl:grid-cols-[1fr_0.72fr]">
        <div className="glass-panel relative overflow-hidden rounded-lg p-6 control-ring">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-300/15 blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Verified match access
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
            Your ticket is ready. Let's get you to the seat.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
            StadiumSync AI uses the ticket linked to your booking phone number to show
            gate entry, route guidance, seat location, and nearby facilities while
            reducing crowd pressure before it becomes a bottleneck.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Ticket", "Verified"],
              ["Gate", "Optimized"],
              ["Route", "Density-aware"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Footprints className="h-4 w-4 text-emerald-200" />
                Live walk plan
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-100">
                <TimerReset className="h-3.5 w-3.5" />
                Updates in 42s
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 text-xs font-semibold text-slate-300">
              {["Gate", "Security", "Seat"].map((step, index) => (
                <Fragment key={step}>
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                  >
                    {index + 1}
                  </span>
                  {index < 2 && (
                    <span
                      className="h-1 rounded-full bg-gradient-to-r from-cyan-300 via-emerald-200 to-amber-200"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <GlassCard>
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
            <TicketCheck className="h-4 w-4" />
            Active ticket
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">{ticket?.holder}</h2>
          <p className="mt-2 text-sm text-slate-300">{ticket?.seat}</p>
          <div className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3">
            <p className="text-xs text-emerald-200">Entry window</p>
            <p className="mt-1 font-semibold text-white">{ticket?.entryWindow}</p>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm text-cyan-100">
            <ShieldCheck className="h-4 w-4" />
            Use the recommended route to reduce gate congestion.
          </div>
        </GlassCard>
      </section>

      <section className="mb-5 grid gap-4 md:grid-cols-3">
        {fanSafetyAdvisories.map((advisory) => (
          <GlassCard key={advisory.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {advisory.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">{advisory.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{advisory.detail}</p>
          </GlassCard>
        ))}
      </section>

      <TicketSeatGuide mode="authenticated" />
    </div>
  );
}
