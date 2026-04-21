import Sidebar from "./Editroom/Sidebar";
import Topbar from "./Editroom/Topbar";
import GallerySection from "./Editroom/GallerySection";
import CoreInfoForm from "./Editroom/CoreInfoForm";
import Amenities from "./Editroom/Amenities";
import AvailabilityCard from "./Editroom/AvailabilityCard";
import ListingHealth from "./Editroom/ListingHealth";
import Footer from "./components/reusable/Footer";

export default function EditRoom() {
  return (
    <div className="flex bg-[#0b1326] text-slate-200">
      <Sidebar />

      <main className="ml-64 w-full min-h-screen">
        <Topbar />

        <div className="p-12 max-w-6xl mx-auto space-y-16">
          <GallerySection />

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <CoreInfoForm />
              <Amenities />
            </div>

            <div className="space-y-8">
              <AvailabilityCard />
              <ListingHealth />
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}