export default function WishlistHeader() {
  return (
    <div className="mb-16">
      <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-4 block">
        YOUR SELECTIONS
      </span>

      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight mb-4">
        The Curated <br />
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Wishlist
        </span>
      </h1>

      <p className="text-slate-400 max-w-xl text-lg">
        A personal collection of luxury stays and escapes saved for your next journey.
      </p>
    </div>
  );
}