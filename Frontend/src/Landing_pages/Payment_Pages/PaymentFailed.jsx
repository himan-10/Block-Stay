import Header from ".//Header";
import StatusSection from "./payment/StatusSection";
import ErrorDetails from "./payment/ErrorDetails";
import ActionButtons from "./payment/ActionButtons";
import ReferenceInfo from "./payment/ReferenceInfo";
import BottomNav from "./payment/BottomNav";

export default function PaymentFailed() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Header />

      <main className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        
        {/* Glow */}
        <div className="absolute w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-4xl w-full grid md:grid-cols-12 gap-8 relative z-10">
          
          {/* LEFT */}
          <div className="md:col-span-5">
            <StatusSection />
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7">
            <div className="bg-slate-900/40 p-8 rounded-xl">
              <ErrorDetails />
              <ActionButtons />
              <ReferenceInfo />
            </div>
          </div>

        </div>
      </main>

      <BottomNav />
    </div>
  );
}