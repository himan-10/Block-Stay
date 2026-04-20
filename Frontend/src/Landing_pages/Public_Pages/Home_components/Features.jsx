const Features = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-white bg-slate-900">
      <h2 className="text-4xl font-bold mb-10">Why Choose Us</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">Automated Serenity</h3>
          <p className="text-gray-400">Smart environment system</p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Absolute Privacy</h3>
          <p className="text-gray-400">Secure & private stays</p>
        </div>

        <div>
          <h3 className="text-xl font-bold">24/7 Concierge</h3>
          <p className="text-gray-400">Always available support</p>
        </div>
      </div>
    </section>
  );
};

export default Features;