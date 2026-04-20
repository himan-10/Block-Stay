const Testimonials = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Whispers of Excellence
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {["Amazing service", "Luxury experience", "Best platform"].map(
          (text, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-lg">
              <p className="italic">{text}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Testimonials;