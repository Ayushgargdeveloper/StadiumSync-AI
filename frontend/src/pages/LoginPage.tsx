import { motion } from "framer-motion";
import { Fingerprint, LockKeyhole, Phone, Radar, ShieldCheck, TicketCheck } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const { ticket, loginWithPhone } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("Ticket, match, gate, and seat details unlock only after verification.");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/";

  if (ticket) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = loginWithPhone(phoneNumber);
    setMessage(result.message);
    setIsError(!result.ok);

    if (result.ok) {
      navigate(from, { replace: true });
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-cockpit px-4 py-8 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(16,185,129,0.14),transparent_28%),linear-gradient(135deg,#05070c,#0b1424_52%,#05070c)]" />
      <div className="scan-grid pointer-events-none fixed inset-0 opacity-60" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100 shadow-glow">
            <ShieldCheck className="h-4 w-4" />
            Verified ticket access
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Unlock your stadium route after ticket verification.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Match details, gate assignment, route guidance, and seat location are hidden
            until the booking phone number is verified against an active ticket.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-lg border border-cyan-300/20 bg-slate-950/45 p-5 backdrop-blur-2xl">
            <div className="scan-grid absolute inset-0 opacity-60" />
            <div className="relative mx-auto aspect-square max-w-[360px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-200/25"
              />
              <div className="absolute inset-[10%] rounded-full border border-white/10 bg-white/[0.03]" />
              <div className="absolute inset-[25%] rounded-full border border-cyan-300/20 bg-cyan-300/5" />
              <div className="absolute inset-[42%] rounded-full border border-emerald-300/25 bg-emerald-300/10" />
              {[
                ["Ticket", "Locked", "left-[50%] top-[18%]"],
                ["Gate", "Hidden", "left-[78%] top-[50%]"],
                ["Seat", "Hidden", "left-[50%] top-[82%]"],
                ["Route", "Hidden", "left-[22%] top-[50%]"]
              ].map(([label, value, position]) => (
                <div
                  key={label}
                  className={`absolute ${position} -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-black/45 px-3 py-2 text-center shadow-lg backdrop-blur`}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-1 text-xs font-semibold text-cyan-100">{value}</p>
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <Radar className="h-4 w-4" />
                Secure checkpoint
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          onSubmit={handleSubmit}
          className="glass-panel relative overflow-hidden rounded-lg p-6 control-ring"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-cyan-300/15 p-3 text-cyan-200 shadow-glow">
                <Fingerprint className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Ticket Verification</h2>
                <p className="text-sm text-slate-400">Private access for ticket holders</p>
              </div>
            </div>

            <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <LockKeyhole className="h-4 w-4 text-emerald-200" />
                Protected before reveal
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                We do not show match, ticket, gate, or seat details until the booking
                number is verified.
              </p>
            </div>

            <label className="block text-sm font-medium text-slate-300" htmlFor="login-phone">
              Booking phone number
            </label>
            <div className="relative mt-2">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200" />
              <input
                id="login-phone"
                inputMode="numeric"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Enter ticket booking number"
                className="w-full rounded-lg border border-white/10 bg-black/35 py-4 pl-12 pr-4 text-lg font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200 focus:shadow-glow"
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-300 px-4 py-4 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200"
            >
              <TicketCheck className="h-5 w-5" />
              Verify ticket and continue
            </button>

            <p className={`mt-4 text-sm ${isError ? "text-amber-200" : "text-emerald-200"}`}>
              {message}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Presenter demo access: 9876543210, 9123456780, 9988776655
            </p>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
