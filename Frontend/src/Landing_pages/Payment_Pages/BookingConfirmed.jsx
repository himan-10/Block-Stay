import Header from "./booking/Header";
import HeroSection from "./booking/HeroSection";
import BookingSummary from "./booking/BookingSummary";
import ConciergeCard from "./booking/ConciergeCard";
import TravelerInfo from "./booking/TravelerInfo";
import FeatureGrid from "./booking/FeatureGrid";
import Footer from "./booking/Footer";

export default function BookingConfirmation() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Header />
      <main className="pt-24 pb-32">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-8">
              <BookingSummary />
              <ConciergeCard />
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5 space-y-8">
              <TravelerInfo />
              <FeatureGrid />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}