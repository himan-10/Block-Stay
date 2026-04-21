const Features = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-white bg-slate-900">
      <h2 className="text-4xl font-bold mb-10">Why Choose Us</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">Verified Trust</h3>
          <p className="text-gray-400">Every property vetted for security</p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Modern Comfort</h3>
          <p className="text-gray-400">Tailored for the contemporary traveler</p>
        </div>

        <div>
          <h3 className="text-xl font-bold">24/7 Support</h3>
          <p className="text-gray-400">Always available round-the-clock</p>
        </div>
      </div>
    </section>
  );
};

export default Features;