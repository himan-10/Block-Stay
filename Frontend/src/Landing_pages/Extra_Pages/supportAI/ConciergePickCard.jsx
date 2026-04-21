import { useState } from "react";

export default function ConciergePickCard({
  title = "Luxury Experience",
  subtitle = "Curated by Nova",
  description = "Premium selection tailored for your preferences.",
  image = "https://images.unsplash.com/photo-1501117716987-c8e1ecb210a0",
  tag = "Exclusive",
  rating = 4.9,
  onClick,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer group rounded-2xl overflow-hidden bg-slate-900/40 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 shadow-lg hover:shadow-violet-500/10"
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Tag */}
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full border border-violet-500/30">
          {tag}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/70 px-2 py-1 rounded-full border border-slate-700">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-[10px] text-slate-200 font-semibold">
            {rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
          {title}
        </h3>

        <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>

        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <button className="text-[10px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors">
            View Details
          </button>

          <span className="text-[10px] text-slate-500">
            AI Recommended
          </span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-1 bg-violet-500/10 blur-2xl" />
      </div>
    </div>
  );
}