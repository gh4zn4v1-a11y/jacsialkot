import { createFileRoute } from "@tanstack/react-router";
import { BookingProvider } from "@/components/dealership/BookingProvider";
import { Navbar } from "@/components/dealership/Navbar";
import { Hero } from "@/components/dealership/Hero";
import { Showroom } from "@/components/dealership/Showroom";
import { Services } from "@/components/dealership/Services";
import { Testimonials } from "@/components/dealership/Testimonials";
import { Footer } from "@/components/dealership/Footer";
import { BookingModal } from "@/components/dealership/BookingModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JAC Sialkot City Motors — Premium 3S Dealership & Auto Showroom" },
      { name: "description", content: "Official JAC 3S dealership in Sialkot. Explore the T9 Hunter, T6 and X200 lineup, book a test drive, and access certified service & genuine spare parts 24/7." },
      { property: "og:title", content: "JAC Sialkot City Motors — Premium Auto Showroom" },
      { property: "og:description", content: "Sialkot's premier destination for official JAC 4x4 pickups and utility vehicles. Sales · Service · Spare Parts." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Showroom />
          <Services />
          <Testimonials />
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
