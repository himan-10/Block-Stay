import Sidebar from "./OwnerDashboard/Sidebar";
import Topbar from "./OwnerDashboard/Topbar";
import ProgressSteps from "./AddNewroom/ProgressSteps";
import BasicInfoForm from "./AddNewroom/BasicInfoForm";
import Amenities from "./AddNewroom/Amenities";
import GalleryUpload from "./AddNewroom/GalleryUpload";
import PricingSection from "./AddNewroom/PricingSection";
import BottomBar from "./AddNewroom/BottomBar";

export default function AddRoom() {
  return (
    <div className="bg-[#0b1326] text-slate-200 min-h-screen flex">
      
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Topbar title="Add New Room" />

        <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
          
          {/* LEFT */}
          <div className="lg:col-span-4">
            <ProgressSteps />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 space-y-16">
            <BasicInfoForm />
            <Amenities />
            <GalleryUpload />
            <PricingSection />
          </div>

        </div>

        <BottomBar />
      </div>
    </div>
  );
}