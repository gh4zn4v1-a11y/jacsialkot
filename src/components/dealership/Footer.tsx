import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Hexagon, Navigation } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-strong rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 lg:p-14 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl silver-bevel flex items-center justify-center">
                  <Hexagon className="h-6 w-6 text-background" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-gradient-silver">JAC Sialkot City Motors</div>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase">Authorized 3S Dealership</div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Showroom Address</div>
                    <div className="mt-1 text-silver font-medium">FFQF+XV8, Sialkot – Wazirabad Dual Carriageway, Sialkot</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Operating Hours</div>
                    <div className="mt-1 text-silver font-medium flex items-center gap-2">
                      Open 24 Hours · 7 Days a Week
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Direct Line</div>
                    <a href="tel:03217165555" className="mt-1 text-silver font-medium hover:text-primary block">0321 7165555</a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Sialkot+Wazirabad+Dual+Carriageway"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:crimson-glow transition-all"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>

            {/* Dynamic Map placeholder */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative min-h-[420px] lg:min-h-full bg-secondary overflow-hidden"
            >
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-primary/10" />
              {/* stylized highway */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="road" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="oklch(0.4 0.01 270)" />
                    <stop offset="1" stopColor="oklch(0.25 0.01 270)" />
                  </linearGradient>
                </defs>
                <path d="M-50 420 C 150 360, 350 300, 650 200" stroke="url(#road)" strokeWidth="60" fill="none" />
                <path d="M-50 420 C 150 360, 350 300, 650 200" stroke="oklch(0.82 0.005 270 / 0.4)" strokeWidth="2" strokeDasharray="14 14" fill="none" />
                {[...Array(8)].map((_,i)=>(
                  <circle key={i} cx={80 + i*70} cy={400 - i*25} r="1.5" fill="oklch(0.82 0.005 270 / 0.4)" />
                ))}
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  <div className="relative h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center crimson-glow">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-3 glass rounded-xl px-3 py-2 text-center whitespace-nowrap">
                  <div className="text-xs font-semibold text-silver">JAC Sialkot City Motors</div>
                  <div className="text-[10px] text-muted-foreground">Sialkot–Wazirabad Highway</div>
                </div>
              </div>
              <div className="absolute top-6 left-6 glass rounded-lg px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Prime Highway Placement
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} JAC Sialkot City Motors. All rights reserved.</div>
          <div className="tracking-widest uppercase">Driven by Excellence</div>
        </div>
      </div>
    </footer>
  );
}
