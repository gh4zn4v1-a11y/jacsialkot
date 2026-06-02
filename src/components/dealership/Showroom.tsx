import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import t9 from "@/assets/jac-t9.jpg";
import t6 from "@/assets/jac-t6.jpg";
import x200 from "@/assets/jac-x200.jpg";
import { useBooking, type VehicleModel } from "./BookingProvider";

interface Vehicle {
  model: VehicleModel;
  badge: string;
  tagline: string;
  image: string;
  specs: string[];
  highlights: string[];
  colors: { name: string; hex: string }[];
}

const vehicles: Vehicle[] = [
  {
    model: "JAC T9 Hunter",
    badge: "Flagship Luxury 4x4 Pickup",
    tagline: "Engineered for those who lead. The first true premium 4x4 lifestyle pickup in Pakistan.",
    image: t9,
    specs: ["2.0L Turbo Diesel", "168 HP · 410 Nm", "8-Speed ZF Automatic", "Selectable 4x4 Modes"],
    highlights: [
      "First pickup in Pakistan with built-in Sunroof",
      "Level 2 ADAS Safety Suite (AEB, Blind Spot Monitoring)",
      "10.4\" vertical touchscreen infotainment",
      "360° view camera system",
      "18-inch dual-tone alloy wheels",
    ],
    colors: [
      { name: "Metallic Silver", hex: "#c8ccd1" },
      { name: "Diamond White", hex: "#f1efeb" },
      { name: "Carbon Grey", hex: "#3a3d42" },
      { name: "Glossy Black", hex: "#0a0a0c" },
    ],
  },
  {
    model: "JAC T6",
    badge: "Premium Double-Cabin Utility",
    tagline: "The commercial workhorse engineered for relentless performance and double-cabin comfort.",
    image: t6,
    specs: ["2.0L CTi Turbo Diesel", "6-Speed Manual", "1-Ton Payload", "Body-on-Frame Chassis"],
    highlights: [
      "High-strength body-on-frame chassis",
      "Heavy-duty multi-leaf rear suspension",
      "Double-cabin comfort configuration",
      "Factory-fitted entertainment system",
      "16-inch alloy rims",
    ],
    colors: [
      { name: "Solid White", hex: "#f4f4f2" },
      { name: "Silver Metallic", hex: "#c1c4c9" },
      { name: "Shadow Black", hex: "#101012" },
    ],
  },
  {
    model: "JAC X200",
    badge: "Urban Mini-Truck · Deck Loader",
    tagline: "A premium light commercial vehicle built for urban delivery and superior payload stability.",
    image: x200,
    specs: ["2.8L Turbo Diesel", "5-Speed Manual", "1.3-Ton Capacity", "Dual Rear Wheels"],
    highlights: [
      "Multi-functional folding center seat",
      "Dual rear wheels for payload stability",
      "Factory-installed high-cooling AC",
      "Ergonomic urban cabin layout",
    ],
    colors: [{ name: "Arctic White", hex: "#f5f5f3" }],
  },
];

function VehicleCard({ v, idx }: { v: Vehicle; idx: number }) {
  const [color, setColor] = useState(v.colors[0]);
  const { openBooking } = useBooking();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group relative glass-strong rounded-3xl overflow-hidden flex flex-col hover:scale-[1.015] transition-transform duration-500"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-secondary to-background">
        <img src={v.image} alt={v.model} loading="lazy" width={1280} height={896}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/95 text-primary-foreground px-3 py-1 text-xs font-semibold tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {v.badge}
        </span>
        <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1.5 text-xs">
          <span className="text-muted-foreground">Active Paint · </span>
          <span className="font-semibold text-silver">{color.name}</span>
        </div>
      </div>

      <div className="p-6 lg:p-7 flex-1 flex flex-col">
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-gradient-silver">{v.model}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {v.specs.map((s) => (
            <span key={s} className="text-[11px] uppercase tracking-wider rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-silver/90">
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {v.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-foreground/85">
              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2.5">Available Paints</div>
          <div className="flex gap-2.5">
            {v.colors.map((c) => {
              const active = c.name === color.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  className={`relative h-9 w-9 rounded-full transition-all ${active ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background" : "ring-1 ring-white/15 hover:scale-105"}`}
                  style={{ background: c.hex }}
                >
                  {active && <Check className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => openBooking(v.model)}
          className="mt-7 group/btn inline-flex items-center justify-between gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground hover:crimson-glow transition-all"
        >
          <span>Inquire Package</span>
          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
}

export function Showroom() {
  return (
    <section id="showroom" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Virtual Showroom
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient-silver leading-[1.05]">
            Configure your <span className="text-gradient-crimson">JAC.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl text-base lg:text-lg">
            Explore the full official JAC lineup available at Sialkot City Motors. Pick your paint, read the spec sheet, and reserve a private viewing.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v, i) => <VehicleCard key={v.model} v={v} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
