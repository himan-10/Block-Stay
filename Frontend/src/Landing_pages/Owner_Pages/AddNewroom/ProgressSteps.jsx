export default function ProgressSteps() {
  return (
    <div className="sticky top-28 space-y-6">
      <h3 className="text-xl font-bold">Registration Progress</h3>

      {["Basic Info", "Amenities", "Gallery", "Pricing"].map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center 
            ${i === 0 ? "bg-violet-500 text-white" : "bg-slate-800 text-slate-500"}`}>
            {i + 1}
          </div>
          <span className={i === 0 ? "text-white" : "text-slate-500"}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}