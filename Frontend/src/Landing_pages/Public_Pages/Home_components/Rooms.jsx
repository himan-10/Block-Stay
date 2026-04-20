const Rooms = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-white">
      <h2 className="text-4xl font-bold mb-10">Curated Collections</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {["Penthouse", "Studio", "Spa Room"].map((room, i) => (
          <div key={i} className="bg-slate-800 rounded-lg overflow-hidden">
            <img src="https://picsum.photos/400/300" alt="" />
            <div className="p-4">
              <h3 className="font-bold text-xl">{room}</h3>
              <p className="text-gray-400 text-sm">Luxury stay</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms;