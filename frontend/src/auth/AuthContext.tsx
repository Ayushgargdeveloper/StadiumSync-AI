import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { bookedTickets } from "../data/dashboardData";

type BookedTicket = (typeof bookedTickets)[number];

type AuthContextValue = {
  ticket: BookedTicket | null;
  loginWithPhone(phoneNumber: string): { ok: boolean; message: string };
  logout(): void;
};

const SESSION_KEY = "stadiumsync.ticketSession";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [ticket, setTicket] = useState<BookedTicket | null>(() => {
    const storedPhone = window.localStorage.getItem(SESSION_KEY);
    return bookedTickets.find((item) => item.phone === storedPhone) ?? null;
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      ticket,
      loginWithPhone(phoneNumber) {
        const normalizedPhone = phoneNumber.replace(/\D/g, "");
        const matchedTicket = bookedTickets.find((item) => item.phone === normalizedPhone);

        if (!matchedTicket) {
          setTicket(null);
          window.localStorage.removeItem(SESSION_KEY);
          return {
            ok: false,
            message: "No active match ticket found for this number."
          };
        }

        setTicket(matchedTicket);
        window.localStorage.setItem(SESSION_KEY, matchedTicket.phone);
        return {
          ok: true,
          message: "Ticket verified. Seat guidance is ready."
        };
      },
      logout() {
        setTicket(null);
        window.localStorage.removeItem(SESSION_KEY);
      }
    }),
    [ticket]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
