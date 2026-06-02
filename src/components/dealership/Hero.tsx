import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-showroom.jpg";
import { useBooking } from "./BookingProvider";

export function Hero() {
  const { openBooking } = useBooking();

  const scrollToShowroom = () => {
    document.querySelector("#showroom")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="JAC luxury showroom interior" width={1920} height={1080}
          className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-silver mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Official JAC 3S Dealer · Sialkot</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-gradient-silver"
          >
            The Next Generation of <br />
            <span className="text-gradient-crimson">Power & Premium</span> Performance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Experience the ultimate fusion of lifestyle luxury and rugged capability. Explore Sialkot's
            premier destination for official JAC 4x4 pickups and utility vehicles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              onClick={scrollToShowroom}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground crimson-glow hover:scale-[1.03] active:scale-100 transition-transform"
            >
              Enter Showroom
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 rounded-xl glass-strong px-6 py-3.5 font-semibold text-foreground hover:bg-white/5 transition-colors"
            >
              <CalendarCheck className="h-4 w-4 text-primary" />
              Schedule Test Drive
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { v: "3", l: "Flagship Models" },
              { v: "24/7", l: "Workshop Hours" },
              { v: "4.3★", l: "Google Rated" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="text-2xl font-display font-bold text-gradient-silver">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-3xl glass-strong overflow-hidden crimson-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
              <div className="absolute inset-6 rounded-2xl border border-white/10 flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-widest text-primary mb-2">Flagship</div>
                <div className="font-display text-3xl font-bold">JAC T9 Hunter</div>
                <div className="text-sm text-muted-foreground mt-1">168 HP · 410 Nm · 8-Speed ZF</div>
                <div className="mt-4 h-1 w-16 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
