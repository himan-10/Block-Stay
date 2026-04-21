export default function WishlistHeroCard() {
  return (
    <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-xl">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKGxliv6GMGtafrPPNB4_yD-fE0KenxQAbuZs_kgiqF88cKm-IyuY-Sgnmzow0VsNu3A7_yYItpYTwhcVcia4YXtV_75DLEb4r_cvJVowA0-19NPnRUBYAPI4TPl4Wn4j6lpMW5kaHoCuINwBh2c-ShL735W6ZaByqs6p4dSNwkl1P9NP_UDKbGcWXlwMqRwM1sIjolzQIZ56VvIMeo21tBCtRdyfD2x6HoNJRgFewLJnzDtYmxTwVnD1FU1oO4vGqPMDWxi0z_W22"
        className="w-full h-full object-cover group-hover:scale-110 transition"
      />

      <div className="absolute bottom-0 p-8 w-full flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold text-white">
            Celestial Observation Suite
          </h3>
          <p className="text-slate-400 text-sm">Reykjavik, Iceland</p>
        </div>

        <button className="bg-primary px-6 py-2 rounded text-white">
          Book Now
        </button>
      </div>
    </div>
  );
}