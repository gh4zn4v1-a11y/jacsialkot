import { motion } from "framer-motion";
import {
  Wrench,
  Gauge,
  Droplet,
  SprayCan,
  Disc3,
  Shield,
  Package,
  Sparkle,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import { useBooking } from "./BookingProvider";

const services = [
  { icon: Wrench, title: "Periodic Maintenance", desc: "Manufacturer-scheduled health checks." },
  { icon: Gauge, title: "Tuning & Diagnostics", desc: "Computerized engine performance scans." },
  { icon: Droplet, title: "Oil Change", desc: "Genuine JAC-grade lubricants & filters." },
  { icon: SprayCan, title: "Body Shop & Paint", desc: "Showroom-quality refinishing booths." },
  { icon: Disc3, title: "Brake Services", desc: "Pad, rotor & ABS system overhaul." },
  { icon: Shield, title: "PPF (Paint Protection Film)", desc: "Self-healing premium paint armour." },
  { icon: Package, title: "Genuine Parts", desc: "100% OEM JAC inventory & warranty." },
  { icon: Sparkle, title: "Compound Polish", desc: "Showroom-finish detailing & restoration." },
];

export function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 3S Aftercare Ecosystem
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient-silver leading-[1.05]">
            After Sales <span className="text-gradient-crimson">& Services</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base lg:text-lg">
            We are committed to keep your vehicle running at its best.
          </p>
        </div>

        {/* Premium dark service grid with crimson + white borders */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-[#0b0d12]/80 backdrop-blur-xl p-5 sm:p-8 lg:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-primary/60 p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.4)]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary/80" />
                </div>
                <h3 className="font-display text-base font-bold text-white leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/10 pt-8">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-primary mb-1">
                Certified JAC Workshop
              </div>
              <div className="text-lg font-display font-bold text-white">
                Open 24/7 on Sialkot–Wazirabad Highway
              </div>
            </div>
            <button
              onClick={() => openBooking(undefined, "Service Appointment")}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 font-bold text-primary-foreground tracking-wider uppercase text-sm border-2 border-white/20 hover:crimson-glow hover:scale-[1.02] active:scale-100 transition-all"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Service Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
