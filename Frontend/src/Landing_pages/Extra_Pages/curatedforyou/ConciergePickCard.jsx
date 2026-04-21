export default function ConciergePickCard({
  title,
  desc,
  image,
  tag,
  type = "large"
}) {
  const isLarge = type === "large";

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-2xl group
      ${isLarge ? "h-[500px]" : "h-[400px]"}`}>

      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute bottom-0 p-6 md:p-8 w-full">

        <span className="text-xs text-violet-300 uppercase tracking-widest">
          {tag}
        </span>

        <h3 className="text-2xl md:text-3xl font-bold mt-2">
          {title}
        </h3>

        <p className="text-slate-300 mt-2 text-sm md:text-base">
          {desc}
        </p>

        <button className="mt-4 px-5 py-2 bg-violet-600 rounded-md text-sm">
          View Details
        </button>

      </div>

    </div>
  );
}