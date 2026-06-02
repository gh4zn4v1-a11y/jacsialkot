import { motion } from "framer-motion";
import { ShoppingBag, Wrench, Package } from "lucide-react";

const services = [
  {
    icon: ShoppingBag,
    title: "Sales",
    tag: "S1",
    desc: "Customizable fleet packages, instant trade-in evaluations, and end-to-end commercial leasing assistance from certified JAC advisors.",
    points: ["Personal & Fleet Acquisition", "Trade-in Evaluation", "Commercial Leasing"],
  },
  {
    icon: Wrench,
    title: "Service",
    tag: "S2",
    desc: "Advanced diagnostic workshop with manufacturer-certified mechanics — operating right on the Wazirabad Road hub, 24/7.",
    points: ["Computerized Diagnostics", "Periodic Maintenance", "Warranty Repairs"],
  },
  {
    icon: Package,
    title: "Spare Parts",
    tag: "S3",
    desc: "100% genuine JAC body parts and component inventory backed by a national supply network with rapid tracking updates.",
    points: ["Genuine OEM Inventory", "Rapid Tracking", "Nationwide Sourcing"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> The 3S Ecosystem
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient-silver leading-[1.05]">
            Sales. Service. <span className="text-gradient-crimson">Spare Parts.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base lg:text-lg">
            One destination on the Sialkot–Wazirabad highway. Every touchpoint of your JAC ownership experience, engineered under one roof.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative glass-strong rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="absolute top-6 right-6 text-[11px] font-mono tracking-widest text-primary/80">{s.tag}</div>
              <div className="h-14 w-14 rounded-2xl silver-bevel flex items-center justify-center mb-6 shadow-inner group-hover:rotate-6 transition-transform">
                <s.icon className="h-6 w-6 text-background" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-2xl font-bold text-gradient-silver">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span className="text-silver/85">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
