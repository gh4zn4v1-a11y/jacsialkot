import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import t9 from "@/assets/jac-t9.png.asset.json";
import frison from "@/assets/jac-frison.jpg.asset.json";
import x200 from "@/assets/jac-x200.jpg.asset.json";
import t1020 from "@/assets/jac-1020.jpg.asset.json";
import t1042 from "@/assets/jac-1042.png.asset.json";
import t1091 from "@/assets/jac-1091.png.asset.json";
import t1120 from "@/assets/jac-1120.jpg.asset.json";
import captainC from "@/assets/jac-captain-c.jpg.asset.json";
import reallingM from "@/assets/jac-realling-m.jpg.asset.json";
import dongfeng from "@/assets/dongfeng-k375.jpg.asset.json";
import { useBooking, type VehicleModel } from "./BookingProvider";

interface Spec { label: string; value: string }
interface Vehicle {
  model: VehicleModel;
  badge: string;
  tagline: string;
  image: string;
  isNew?: boolean;
  specs: Spec[];
  features: string[];
  colors: { name: string; hex: string }[];
}

const passengerVehicles: Vehicle[] = [
  {
    model: "JAC T9 Hunter",
    badge: "Premium 4x4 Double Cabin Pickup",
    tagline: "The flagship lifestyle 4x4 — premium safety, premium presence.",
    image: t9.url,
    isNew: true,
    specs: [
      { label: "Engine", value: "2.0L Turbo Diesel (HFC4DB2-2D1)" },
      { label: "Output", value: "168 HP @ 3600 RPM" },
      { label: "Torque", value: "410 Nm @ 1500–2500 RPM" },
      { label: "Transmission", value: "8-Speed Automatic (8AT)" },
    ],
    features: [
      "L2 ADAS Safety Suite (AEB · BSM · LDW)",
      "10.4\" vertical touchscreen panel",
      "18\" dual-spoke premium alloy rims",
      "360° surround-view camera",
      "7 Safety Airbags",
    ],
    colors: [
      { name: "Metallic Black", hex: "#0a0a0c" },
      { name: "Arctic White", hex: "#f3f1ec" },
      { name: "Silver Gray", hex: "#bcc0c5" },
      { name: "Ocean Blue", hex: "#1f3a5f" },
      { name: "Wine Red", hex: "#6b1a2a" },
    ],
  },
  {
    model: "JAC Frison",
    badge: "Urban 4x2 RWD Double Cabin Pickup",
    tagline: "City-ready double cabin with limousine refinement and 1-ton hauling muscle.",
    image: frison.url,
    isNew: true,
    specs: [
      { label: "Engine", value: "2.0L Turbo Diesel" },
      { label: "Output", value: "168 HP" },
      { label: "Torque", value: "410 Nm" },
      { label: "Transmission", value: "8-Speed Automatic (8AT)" },
    ],
    features: [
      "High-efficiency daily workhorse",
      "Leather upholstery accents",
      "10.4\" infotainment display",
      "High-ground city clearance",
      "1,000 kg payload capacity",
    ],
    colors: [
      { name: "Solid White", hex: "#f4f4f2" },
      { name: "Midnight Black", hex: "#0a0a0c" },
      { name: "Metallic Blue", hex: "#1e3a8a" },
      { name: "Desert Silver", hex: "#c9ccd1" },
    ],
  },
];

const commercialVehicles: Vehicle[] = [
  {
    model: "JAC X200",
    badge: "Premium 1-Ton Urban Logistics Pickup",
    tagline: "Sedan-grade comfort meets serious last-mile capability. HFC 1036K.",
    image: x200.url,
    specs: [
      { label: "Engine", value: "2.7L In-line-4 Diesel (HFC4DA1 Euro I VNT)" },
      { label: "Output", value: "76 HP @ 3600 RPM · 174 Nm" },
      { label: "Cargo Deck", value: "9.2 Feet" },
      { label: "Payload", value: "1,150 kg" },
    ],
    features: [
      "Sedan-like driver cabin configuration",
      "Independent wishbone front suspension with torsion bar",
      "Central locking with folding keys as standard",
    ],
    colors: [{ name: "Arctic White", hex: "#f3f1ec" }],
  },
  {
    model: "JAC 1020",
    badge: "Light Commercial Deck Truck · HFC 1020K",
    tagline: "Dependable light-duty deck truck engineered for daily route economics.",
    image: t1020.url,
    specs: [
      { label: "Engine", value: "2.8L Diesel (HFC4DA1)" },
      { label: "Output", value: "76 HP · 174 Nm" },
      { label: "Payload", value: "3,450 kg" },
      { label: "GVW", value: "5,150 kg" },
    ],
    features: [
      "5-Speed Manual Override transmission",
      "Reliable deck cargo platform",
      "Optimized for last-mile distribution",
    ],
    colors: [{ name: "Factory White", hex: "#f5f4f1" }],
  },
  {
    model: "JAC 1042",
    badge: "Medium Duty Commercial Loader · HFC 1042K",
    tagline: "A reinforced workhorse for serious medium-tonnage operations.",
    image: t1042.url,
    specs: [
      { label: "Engine", value: "2.7L Turbo Intercooler 4-Cyl Diesel (Euro II)" },
      { label: "Output", value: "91 HP @ 3600 RPM · 216 Nm" },
      { label: "GVW", value: "5,500 kg" },
      { label: "Net Payload", value: "3,520 kg" },
    ],
    features: [
      "Reinforced heavy-duty ladder frame chassis",
      "Robust multi-leaf spring suspension system",
    ],
    colors: [{ name: "Commercial White", hex: "#f4f3ef" }],
  },
  {
    model: "JAC 1091",
    badge: "Heavy-Duty Commercial Cargo Transporter",
    tagline: "Extended deck, premium air-braking, axle architecture built for the long haul.",
    image: t1091.url,
    specs: [
      { label: "Class", value: "Heavy-Duty Cargo" },
      { label: "Braking", value: "Premium Air-Braking Loop" },
      { label: "Axles", value: "Robust Regional Haulage" },
    ],
    features: [
      "High-capacity extended rear deck",
      "Premium responsive air-braking loop",
      "Robust axle architecture for maximal regional payloads",
    ],
    colors: [{ name: "Classique White", hex: "#f4f3ef" }],
  },
  {
    model: "JAC 1120",
    badge: "High-Capacity Freight Carrier · HFC1120KR1N",
    tagline: "Smart digital cabin meets heavy-tonnage chassis engineering.",
    image: t1120.url,
    specs: [
      { label: "Cluster", value: "10\" Smart Digital Layout" },
      { label: "Steering", value: "Multi-Function w/ Cruise" },
      { label: "Suspension", value: "Heavy-Tonnage Multi-Leaf" },
    ],
    features: [
      "10\" smart digital instrument layout",
      "Multi-function steering wheel with cruise control",
      "Specialized heavy-tonnage multi-leaf spring assemblies",
    ],
    colors: [{ name: "Polar White", hex: "#f6f5f1" }],
  },
  {
    model: "Captain C",
    badge: "Next-Gen High-Performance Light Commercial",
    tagline: "Driver-first ergonomics and low-emission performance.",
    image: captainC.url,
    specs: [
      { label: "Class", value: "Light Commercial Truck" },
      { label: "Mirrors", value: "Premium Wide-Angle" },
      { label: "Powertrain", value: "Optimized Low-Emission" },
    ],
    features: [
      "Advanced driver-centric cabin ergonomics",
      "Premium wide-angle side mirrors",
      "Highly optimized low-emission powertrain system",
    ],
    colors: [{ name: "Bright White", hex: "#f7f6f3" }],
  },
  {
    model: "Realling M",
    badge: "Long-Wheelbase Commercial Cargo Bed Truck",
    tagline: "Extra-long reinforced bay, tight turning radius, panoramic deck visibility.",
    image: reallingM.url,
    specs: [
      { label: "Wheelbase", value: "Specialized Long" },
      { label: "Cargo Bay", value: "Extra-Long Reinforced" },
      { label: "Visibility", value: "Enhanced Deck Sightlines" },
    ],
    features: [
      "Extra-long reinforced heavy-duty cargo bay",
      "Optimized tight turning radius",
      "Enhanced all-around driving deck visibility parameters",
    ],
    colors: [{ name: "Superior White", hex: "#f4f3ef" }],
  },
  {
    model: "Dong Fang K 375",
    badge: "Heavy-Duty Prime Mover Tractor Unit",
    tagline: "Ultra-high-horsepower multi-axle prime mover with long-haul sleeper cabin.",
    image: dongfeng.url,
    specs: [
      { label: "Class", value: "Prime Mover Tractor" },
      { label: "Cabin", value: "Long-Haul Sleeper Bunk" },
      { label: "Coupling", value: "Heavy Fifth-Wheel" },
    ],
    features: [
      "Ultra-high-horsepower multi-axle heavy freight transporter",
      "Long-haul cabin sleeper bunk layout",
      "Specialized heavy fifth-wheel coupling mechanism",
    ],
    colors: [
      { name: "Signature White", hex: "#f4f3ef" },
      { name: "Flame Red", hex: "#c1272d" },
    ],
  },
];

function VehicleCard({ v, idx }: { v: Vehicle; idx: number }) {
  const [color, setColor] = useState(v.colors[0]);
  const { openBooking } = useBooking();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
      className="group relative glass-strong rounded-3xl overflow-hidden flex flex-col hover:scale-[1.012] transition-transform duration-500"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-secondary to-background">
        <img
          src={v.image}
          alt={v.model}
          loading="lazy"
          className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/95 text-primary-foreground px-3 py-1 text-[11px] font-semibold tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {v.badge}
        </span>
        {v.isNew && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-red-600 text-white px-3 py-1 text-[11px] font-bold tracking-widest uppercase shadow-lg shadow-red-600/40 ring-2 ring-red-300/30">
            <Sparkles className="h-3 w-3" /> NEW
          </span>
        )}
        <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1.5 text-xs">
          <span className="text-muted-foreground">Active Paint · </span>
          <span className="font-semibold text-silver">{color.name}</span>
        </div>
      </div>

      <div className="p-6 lg:p-7 flex-1 flex flex-col">
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-gradient-silver">{v.model}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.tagline}</p>

        <dl className="mt-5 grid grid-cols-2 gap-2.5">
          {v.specs.map((s) => (
            <div key={s.label} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
              <dd className="mt-0.5 text-xs font-medium text-silver/95 leading-snug">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 space-y-2">
          {v.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-foreground/85">
              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2.5">
            Available Colours
          </div>
          <div className="flex flex-wrap gap-2.5">
            {v.colors.map((c) => {
              const active = c.name === color.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  title={c.name}
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

const TABS = [
  { id: "passenger", label: "Passenger Vehicles", data: passengerVehicles },
  { id: "commercial", label: "Commercial & Loader Vehicles", data: commercialVehicles },
] as const;

export function Showroom() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("passenger");
  const active = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="showroom" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Our Vehicle Range
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient-silver leading-[1.05]">
            Configure your <span className="text-gradient-crimson">JAC.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl text-base lg:text-lg">
            Explore the complete JAC lineup available at Sialkot City Motors — from premium 4x4 pickups
            to heavy-duty prime movers. Tap a model to inquire about pricing, delivery and a private viewing.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-10 inline-flex glass-strong rounded-2xl p-1.5 gap-1">
          {TABS.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors ${isActive ? "text-primary-foreground" : "text-silver/70 hover:text-silver"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-active-pill"
                    className="absolute inset-0 rounded-xl bg-primary crimson-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
                <span className={`relative ml-2 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white/20 text-primary-foreground" : "bg-white/5 text-silver/60"}`}>
                  {t.data.length}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3"
          >
            {active.data.map((v, i) => (
              <VehicleCard key={v.model} v={v} idx={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
