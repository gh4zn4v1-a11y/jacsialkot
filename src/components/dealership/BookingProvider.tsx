import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type VehicleModel =
  | "JAC T9 Hunter"
  | "JAC Frison"
  | "JAC X200"
  | "JAC 1020"
  | "JAC 1042"
  | "JAC 1091"
  | "JAC 1120"
  | "Captain C"
  | "Realling M"
  | "Dong Fang K 375";

export type RequestType =
  | "Test Drive"
  | "Sales Inquiry"
  | "Aftersales Workshop Appointment"
  | "Service Appointment";

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
  prefillRequest: RequestType | null;
  bookings: Booking[];
  lastBooking: Booking | null;
  openBooking: (model?: VehicleModel, request?: RequestType) => void;
  closeBooking: () => void;
  submitBooking: (data: Omit<Booking, "id" | "createdAt">) => Booking;
  clearLast: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);
const STORAGE_KEY = "jac_bookings_v1";

export const VEHICLE_MODELS: VehicleModel[] = [
  "JAC T9 Hunter",
  "JAC Frison",
  "JAC X200",
  "JAC 1020",
  "JAC 1042",
  "JAC 1091",
  "JAC 1120",
  "Captain C",
  "Realling M",
  "Dong Fang K 375",
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefillModel, setPrefillModel] = useState<VehicleModel | null>(null);
  const [prefillRequest, setPrefillRequest] = useState<RequestType | null>(null);
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
    prefillRequest,
    bookings,
    lastBooking,
    openBooking: (model, request) => {
      setPrefillModel(model ?? null);
      setPrefillRequest(request ?? null);
      setOpen(true);
    },
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
