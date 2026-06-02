import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type VehicleModel = "JAC T9 Hunter" | "JAC T6" | "JAC X200";
export type RequestType = "Test Drive" | "Sales Inquiry" | "Aftersales Workshop Appointment";

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  model: VehicleModel;
  requestType: RequestType;
  preferredDate: string;
  createdAt: string;
}

interface BookingCtx {
  open: boolean;
  prefillModel: VehicleModel | null;
  bookings: Booking[];
  lastBooking: Booking | null;
  openBooking: (model?: VehicleModel) => void;
  closeBooking: () => void;
  submitBooking: (data: Omit<Booking, "id" | "createdAt">) => Booking;
  clearLast: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);
const STORAGE_KEY = "jac_bookings_v1";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefillModel, setPrefillModel] = useState<VehicleModel | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookings(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Booking[]) => {
    setBookings(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const value: BookingCtx = {
    open,
    prefillModel,
    bookings,
    lastBooking,
    openBooking: (model) => { setPrefillModel(model ?? null); setOpen(true); },
    closeBooking: () => setOpen(false),
    submitBooking: (data) => {
      const b: Booking = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
      persist([b, ...bookings]);
      setLastBooking(b);
      setOpen(false);
      return b;
    },
    clearLast: () => setLastBooking(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
