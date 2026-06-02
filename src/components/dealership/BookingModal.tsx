import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, User, Phone, Car, Tag, Calendar, Sparkles } from "lucide-react";
import { useBooking, type VehicleModel, type RequestType } from "./BookingProvider";

const MODELS: VehicleModel[] = ["JAC T9 Hunter", "JAC T6", "JAC X200"];
const REQUESTS: RequestType[] = ["Test Drive", "Sales Inquiry", "Aftersales Workshop Appointment"];

export function BookingModal() {
  const { open, closeBooking, prefillModel, submitBooking, lastBooking, clearLast } = useBooking();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState<VehicleModel>("JAC T9 Hunter");
  const [requestType, setRequestType] = useState<RequestType>("Test Drive");
  const [preferredDate, setPreferredDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep(0); setErrors({});
      if (prefillModel) setModel(prefillModel);
    }
  }, [open, prefillModel]);

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (fullName.trim().length < 2) e.fullName = "Please enter your full name";
      if (!/^[0-9 +\-]{8,15}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
    }
    if (s === 2) {
      if (!preferredDate) e.preferredDate = "Pick a preferred date";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(s + 1, 2)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (!validateStep(2)) return;
    submitBooking({ fullName: fullName.trim(), phone: phone.trim(), model, requestType, preferredDate });
    setFullName(""); setPhone(""); setPreferredDate("");
  };

  const steps = ["Contact", "Vehicle & Intent", "Date & Confirm"];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={closeBooking} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              id="book"
              className="relative w-full max-w-xl glass-strong rounded-3xl overflow-hidden crimson-glow"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary">Reservation Engine</div>
                  <h3 className="font-display text-xl font-bold text-gradient-silver mt-1">Book Your JAC Experience</h3>
                </div>
                <button onClick={closeBooking} aria-label="Close" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-6 pt-5">
                <div className="flex items-center gap-2">
                  {steps.map((label, i) => (
                    <div key={label} className="flex-1 flex items-center gap-2">
                      <div className={`flex items-center gap-2 ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 text-primary border border-primary" : "bg-white/5"}`}>
                          {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </div>
                        <span className="text-xs font-medium hidden sm:inline">{label}</span>
                      </div>
                      {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary" : "bg-white/10"}`} />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {step === 0 && (
                      <>
                        <Field label="Full Name" icon={User} error={errors.fullName}>
                          <input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={80}
                            placeholder="Muhammad Hassan" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
                        </Field>
                        <Field label="Phone Number" icon={Phone} error={errors.phone}>
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} inputMode="tel"
                            placeholder="0321 7165555" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
                        </Field>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <Field label="Select JAC Model" icon={Car}>
                          <select value={model} onChange={(e) => setModel(e.target.value as VehicleModel)}
                            className="w-full bg-transparent outline-none">
                            {MODELS.map((m) => <option key={m} value={m} className="bg-card">{m}</option>)}
                          </select>
                        </Field>
                        <Field label="Request Type" icon={Tag}>
                          <select value={requestType} onChange={(e) => setRequestType(e.target.value as RequestType)}
                            className="w-full bg-transparent outline-none">
                            {REQUESTS.map((r) => <option key={r} value={r} className="bg-card">{r}</option>)}
                          </select>
                        </Field>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Field label="Preferred Date" icon={Calendar} error={errors.preferredDate}>
                          <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full bg-transparent outline-none [color-scheme:dark]" />
                        </Field>
                        <div className="glass rounded-xl p-4 space-y-2 text-sm">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Review</div>
                          <Row k="Name" v={fullName} />
                          <Row k="Phone" v={phone} />
                          <Row k="Vehicle" v={model} />
                          <Row k="Request" v={requestType} />
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between p-6 border-t border-white/5">
                <button onClick={back} disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2.5 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                {step < 2 ? (
                  <button onClick={next}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:crimson-glow transition-all">
                    Continue <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={submit}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:crimson-glow transition-all">
                    <Sparkles className="h-4 w-4" /> Log Inquiry
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success modal */}
      <AnimatePresence>
        {lastBooking && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={clearLast} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative w-full max-w-md glass-strong rounded-3xl overflow-hidden crimson-glow"
            >
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="mx-auto h-20 w-20 rounded-full bg-primary/15 flex items-center justify-center relative"
                >
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <Check className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold text-gradient-silver">Inquiry Successfully Logged</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A JAC consultant will reach you on <span className="text-silver font-semibold">{lastBooking.phone}</span> shortly.
                </p>

                <div className="mt-6 glass rounded-xl p-4 text-left space-y-2 text-sm">
                  <Row k="Booking ID" v={lastBooking.id.slice(0, 8).toUpperCase()} />
                  <Row k="Name" v={lastBooking.fullName} />
                  <Row k="Vehicle" v={lastBooking.model} />
                  <Row k="Request" v={lastBooking.requestType} />
                  <Row k="Preferred Date" v={lastBooking.preferredDate} />
                </div>

                <button onClick={clearLast}
                  className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:crimson-glow transition-all">
                  Excellent
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, icon: Icon, error, children }: { label: string; icon: React.ElementType; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className={`mt-1.5 flex items-center gap-3 rounded-xl bg-input/60 border px-4 py-3 transition-colors ${error ? "border-destructive" : "border-white/10 focus-within:border-primary"}`}>
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        {children}
      </div>
      {error && <div className="mt-1.5 text-xs text-destructive">{error}</div>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground text-xs uppercase tracking-wider">{k}</span>
      <span className="text-silver font-medium text-right truncate">{v || "—"}</span>
    </div>
  );
}
