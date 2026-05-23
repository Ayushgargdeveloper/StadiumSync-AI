import { motion } from "framer-motion";
import { LockKeyhole, Phone, ShieldCheck, TicketCheck } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const { ticket, loginWithPhone } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("9876543210");
  const [message, setMessage] = useState("Only verified ticket holders can access match guidance.");
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

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
            <ShieldCheck className="h-4 w-4" />
            Ticket-holder security
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            StadiumSync AI starts with verified fan access.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
            Fans login with the booking phone number. If a match ticket exists,
            the platform opens their ticket details, gate, route, and exact seat guidance.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Match", "Falcons vs Titans"],
              ["Access", "Ticket holders"],
              ["Guidance", "Gate to seat"]
            ].map(([label, value]) => (
              <div key={label} className="glass-panel rounded-lg p-4">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
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
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Secure Login</h2>
                <p className="text-sm text-slate-400">Verify by booking phone number</p>
              </div>
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
              Demo numbers: 9876543210, 9123456780, 9988776655
            </p>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
