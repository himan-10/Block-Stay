export default function WishlistCardVertical() {
  return (
    <div className="md:col-span-4 bg-surface-container rounded-xl overflow-hidden">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW4yR4t6pCoX0ml6gaz_M1GTXjl5QuPBScggu_MouowBT6ygi1VQsdh6Cf8njvI8hkShTgTU8swzwI5B5uH-a7mQ7tEYt8YcHyrDGNZGjNuxMNzfHpHxmI7WMF39OVZlymK9eYh-VUJOH6Gc_DReXXy1mtlCPokzxaFnz8xi2GqzWpIwbpj5NnnlZ27twQWleD5RHK-NHnjR-G0Ha5tCBbcOhKxHVxEe8lwkiDNFOl92vIhtzErKB6cCmcCbGXixSfzOwSkTx9fv5f"
        className="w-full h-60 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">
          Obsidian Cliff Villa
        </h3>
        <p className="text-slate-400 text-sm">2 Bedrooms • Pool</p>

        <div className="flex justify-between mt-4">
          <span className="text-white font-bold">$890</span>
          <button className="text-primary">Reserve</button>
        </div>
      </div>
    </div>
  );
}