export default function RecommendedCard({ title, price, img }) {
  return (
    <div className="min-w-[280px] bg-surface-container rounded-xl overflow-hidden">
      <img src={img} className="h-40 w-full object-cover" />

      <div className="p-4">
        <h4 className="text-white font-bold">{title}</h4>

        <div className="flex justify-between mt-3">
          <span className="text-secondary">₹{price}/nt</span>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}