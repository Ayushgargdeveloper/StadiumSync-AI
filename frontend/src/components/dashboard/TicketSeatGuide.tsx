import { AnimatePresence, motion } from "framer-motion";
import {
  Armchair,
  Car,
  Clock,
  DoorOpen,
  LocateFixed,
  LockKeyhole,
  MapPinned,
  Navigation,
  Phone,
  TicketCheck,
  Utensils
} from "lucide-react";
import { useMemo, useState } from "react";
import { bookedTickets, ticketSections } from "../../data/dashboardData";
import { GlassCard } from "../ui/GlassCard";

type TicketSection = (typeof ticketSections)[number]["section"];
type BookedTicket = (typeof bookedTickets)[number];

export function TicketSeatGuide() {
  const [selectedSection, setSelectedSection] = useState<TicketSection>(ticketSections[0].section);
  const [phoneNumber, setPhoneNumber] = useState("9876543210");
  const [activeTicket, setActiveTicket] = useState<BookedTicket | null>(bookedTickets[0]);
  const [loginMessage, setLoginMessage] = useState("Demo login ready. Try 9876543210.");
  const [routeMode, setRouteMode] = useState(false);

  const selectedTicket = useMemo(
    () => ticketSections.find((ticket) => ticket.section === selectedSection) ?? ticketSections[0],
    [selectedSection]
  );

  function fetchTicketByPhone() {
    const normalizedPhone = phoneNumber.replace(/\D/g, "");
    const matchedTicket = bookedTickets.find((ticket) => ticket.phone === normalizedPhone);

    if (!matchedTicket) {
      setActiveTicket(null);
      setRouteMode(false);
      setLoginMessage("No demo ticket found for this number.");
      return;
    }

    setActiveTicket(matchedTicket);
    setSelectedSection(matchedTicket.section);
    setRouteMode(false);
    setLoginMessage("Ticket verified. Seat guidance is unlocked.");
  }

  return (
    <GlassCard className="mt-5 bg-gradient-to-br from-cyan-300/[0.08] via-white/[0.045] to-emerald-300/[0.04]">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Fan ticket navigator
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Login, fetch ticket, get to the seat
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Login with the phone number used for booking. StadiumSync AI fetches the ticket,
            verifies the section, and prepares a route to the correct seat.
          </p>

          <div className="mt-5 rounded-lg border border-cyan-300/20 bg-slate-950/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <LockKeyhole className="h-4 w-4 text-cyan-200" />
              Secure ticket login
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-300" htmlFor="ticket-phone">
              Booking phone number
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200" />
                <input
                  id="ticket-phone"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200 focus:shadow-glow"
                />
              </div>
              <button
                type="button"
                onClick={fetchTicketByPhone}
                className="rounded-lg border border-cyan-300/30 bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200"
              >
                Fetch ticket
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Demo numbers: 9876543210, 9123456780, 9988776655
            </p>
            <p className={`mt-2 text-sm ${activeTicket ? "text-emerald-200" : "text-amber-200"}`}>
              {loginMessage}
            </p>
          </div>

          {activeTicket ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                    <TicketCheck className="h-4 w-4" />
                    Ticket verified
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{activeTicket.holder}</h3>
                  <p className="mt-1 text-sm text-slate-300">{activeTicket.seat}</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  {activeTicket.status}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-slate-400">Ticket ID</p>
                  <p className="mt-1 text-sm font-semibold text-white">{activeTicket.ticketId}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-xs text-slate-400">Entry window</p>
                  <p className="mt-1 text-sm font-semibold text-white">{activeTicket.entryWindow}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
              Enter a demo booking number to load ticket details and unlock seat routing.
            </div>
          )}

          <label className="mt-5 block text-sm font-medium text-slate-300" htmlFor="ticket-section">
            Manual section preview
          </label>
          <select
            id="ticket-section"
            value={selectedSection}
            onChange={(event) => {
              setSelectedSection(event.target.value as TicketSection);
              setRouteMode(false);
            }}
            className="mt-2 w-full rounded-lg border border-cyan-300/20 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-cyan-200 focus:shadow-glow"
          >
            {ticketSections.map((ticket) => (
              <option key={ticket.section} value={ticket.section}>
                Section {ticket.section} - {ticket.stand}
              </option>
            ))}
          </select>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTicket.section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid gap-3 sm:grid-cols-2"
            >
              {[
                { label: "Entry gate", value: selectedTicket.gate, icon: DoorOpen },
                { label: "Seat area", value: selectedTicket.side, icon: Armchair },
                { label: "Walk time", value: selectedTicket.walkTime, icon: Clock },
                { label: "Parking", value: selectedTicket.nearestParking, icon: Car }
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <item.icon className="h-4 w-4 text-cyan-200" />
                    {item.label}
                  </div>
                  <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            disabled={!activeTicket}
            onClick={() => setRouteMode((isActive) => !isActive)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none"
          >
            <LocateFixed className="h-4 w-4" />
            {routeMode ? "Hide seat route" : "Get to my seat"}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-cyan-300/20 bg-slate-950/55 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(59,130,246,0.10),rgba(16,185,129,0.08))]" />
          <div className="scan-grid absolute inset-0 opacity-60" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                Section {selectedTicket.section}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{selectedTicket.stand}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {selectedTicket.aisle} - {selectedTicket.rowRange}
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              {routeMode ? "Routing" : "Best route"}
            </span>
          </div>

          <div className="relative z-10 mx-auto mt-6 aspect-[1.35] max-w-[520px]">
            <div className="absolute inset-[4%] rounded-[999px] border border-white/10 bg-black/25" />
            <div className="absolute inset-[13%] rounded-[999px] border border-cyan-300/25 bg-cyan-300/5" />
            <div className="absolute inset-[28%] rounded-[999px] border border-emerald-300/25 bg-emerald-300/10" />
            <div className="absolute left-[17%] top-1/2 h-[18%] w-[66%] -translate-y-1/2 rounded-full border border-white/15 bg-slate-950/65" />
            <div className="absolute left-1/2 top-[18%] h-[64%] w-[14%] -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/65" />

            {routeMode && (
              <motion.div className="pointer-events-none absolute inset-0">
                <svg className="h-full w-full" viewBox="0 0 100 74" preserveAspectRatio="none">
                  <motion.path
                    d="M 8 50 C 25 52, 38 48, 50 42 S 65 35, 73 48"
                    fill="none"
                    stroke="rgb(110 231 183)"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
            )}

            {ticketSections.map((ticket) => {
              const isActive = ticket.section === selectedTicket.section;

              return (
                <button
                  key={ticket.section}
                  type="button"
                  onClick={() => {
                    setSelectedSection(ticket.section);
                    setRouteMode(false);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                  style={{ left: ticket.coordinates.x, top: ticket.coordinates.y }}
                  aria-label={`View section ${ticket.section}`}
                >
                  <span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold transition ${
                      isActive
                        ? "border-cyan-100 bg-cyan-200 text-slate-950 shadow-glow"
                        : "border-white/15 bg-white/10 text-slate-200 hover:border-cyan-200/50"
                    }`}
                  >
                    {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/45" />}
                    <span className="relative">{ticket.section.replace("VIP-", "V")}</span>
                  </span>
                </button>
              );
            })}

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs text-slate-200 backdrop-blur">
              <MapPinned className="h-3.5 w-3.5 text-cyan-200" />
              Pitch view
            </div>

            {routeMode && (
              <div className="absolute left-[8%] top-[50%] -translate-y-1/2 rounded-full border border-emerald-300/25 bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                Start: {selectedTicket.gate}
              </div>
            )}
          </div>

          <div className="relative z-10 mt-5 grid gap-3 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-lg border border-white/10 bg-black/25 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Navigation className="h-4 w-4 text-cyan-200" />
                {routeMode ? "Turn-by-turn seat path" : "Route note"}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {routeMode
                  ? `Enter from ${selectedTicket.gate}, scan at security, follow signs to ${selectedTicket.aisle}, then continue to ${activeTicket?.seat ?? `Section ${selectedTicket.section}`}.`
                  : selectedTicket.note}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/25 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Utensils className="h-4 w-4 text-emerald-200" />
                Nearby
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTicket.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-slate-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
