import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Hexagon } from "lucide-react";
import { useBooking } from "./BookingProvider";

const links = [
  { label: "Home", href: "#home" },
  { label: "Virtual Showroom", href: "#showroom" },
  { label: "3S Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book a Service", href: "#book", action: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, link: typeof links[number]) => {
    setMobileOpen(false);
    if (link.action) {
      e.preventDefault();
      openBooking();
      return;
    }
    const el = document.querySelector(link.href);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className={`glass-strong rounded-2xl flex items-center justify-between px-4 md:px-6 py-3 transition-all ${scrolled ? "shadow-2xl" : ""}`}>
            <a href="#home" onClick={(e) => handleClick(e, links[0])} className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 rounded-xl silver-bevel flex items-center justify-center shadow-inner">
                <Hexagon className="h-5 w-5 text-background" strokeWidth={2.5} />
                <span className="absolute -inset-px rounded-xl ring-1 ring-white/20 pointer-events-none" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm md:text-base tracking-tight text-gradient-silver">JAC Sialkot City Motors</span>
                <span className="text-[10px] md:text-[11px] text-muted-foreground tracking-widest uppercase">Authorized 3S Dealership</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleClick(e, l)}
                  className="px-4 py-2 text-sm text-silver/80 hover:text-foreground rounded-lg hover:bg-white/5 transition-all"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="tel:03217165555"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground crimson-glow hover:scale-[1.03] active:scale-100 transition-transform"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden md:inline">Call Showroom</span>
                <span>0321 7165555</span>
              </a>
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden h-11 w-11 rounded-xl glass flex items-center justify-center"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm glass-strong z-50 lg:hidden p-6 pt-24 flex flex-col gap-2"
            >
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={(e) => handleClick(e, l)}
                  className="px-4 py-4 text-lg font-medium border-b border-white/5 hover:text-primary transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="tel:03217165555" className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">
                <Phone className="h-4 w-4" /> 0321 7165555
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
