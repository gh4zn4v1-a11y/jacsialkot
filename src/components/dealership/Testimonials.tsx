import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Hassan R.",
    role: "JAC T9 Hunter Owner",
    rating: 5,
    text: "From the first walk-in to handover, the experience was flawlessly premium. My T9 was delivered detailed, fueled, and ready — exactly as promised.",
  },
  {
    name: "Bilal K.",
    role: "Fleet Owner · T6 ×4",
    rating: 4,
    text: "Lightning-fast delivery on a four-unit T6 order for our logistics operation. Their commercial advisor genuinely understood our payload requirements.",
  },
  {
    name: "Ayesha M.",
    role: "X200 Business Customer",
    rating: 5,
    text: "The aftersales team treats every customer like a flagship buyer. Service appointments are punctual, parts are genuine, and the lounge is world-class.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= n ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Google Verified Reviews
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gradient-silver leading-[1.05]">
              Trusted across <span className="text-gradient-crimson">Sialkot.</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-2xl p-6 flex items-center gap-5 crimson-glow"
          >
            <div>
              <div className="font-display text-5xl font-bold text-gradient-silver leading-none">4.3</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Out of 5.0</div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <Stars n={4} />
              <div className="text-xs text-muted-foreground mt-2">Verified on Google Maps</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-strong rounded-3xl p-7 relative hover:-translate-y-1 transition-transform"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/30" />
              <Stars n={r.rating} />
              <p className="mt-5 text-foreground/90 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full silver-bevel flex items-center justify-center font-display font-bold text-background">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-silver">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
