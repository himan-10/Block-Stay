const Testimonials = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Trusted by Modern Travelers
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {["Incredible stays. The verification gave me total peace of mind.", "Perfect amenities and amazing host communication.", "The easiest booking platform I've ever used. Completely seamless."].map(
          (text, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <p className="italic text-slate-300">"{text}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center font-bold text-xs">U</div>
                <span className="text-sm font-semibold">Verified Guest</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Testimonials;