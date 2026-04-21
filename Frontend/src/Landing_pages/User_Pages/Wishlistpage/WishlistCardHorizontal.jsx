export default function WishlistCardHorizontal({ title, price, img }) {
  return (
    <div className="md:col-span-6 flex bg-surface-container-low rounded-xl overflow-hidden">
      <img src={img} className="w-1/3 object-cover" />

      <div className="p-6 flex flex-col justify-between w-full">
        <h3 className="text-2xl text-white font-bold">{title}</h3>

        <div className="flex justify-between">
          <span className="text-white font-bold">₹{price}</span>
          <button className="bg-primary px-4 py-1 rounded text-white">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}