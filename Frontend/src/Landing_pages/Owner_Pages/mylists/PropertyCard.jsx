export default function PropertyCard({ data }) {
  return (
    <div className="flex gap-6 bg-slate-800 p-4 rounded-xl items-center">

      <img
        src={data.image}
        className="w-40 h-28 object-cover rounded"
      />

      <div className="flex-1 grid grid-cols-4 gap-4">

        <div>
          <h4 className="font-bold">{data.name}</h4>
          <p className="text-sm text-slate-400">{data.location}</p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Price</p>
          <p className="font-semibold">₹{data.price}</p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Analytics</p>
          <p>{data.analytics}%</p>
        </div>

        <div className="flex gap-2 justify-end">
          <button className="bg-slate-700 px-3 py-1 rounded">Edit</button>
          <button className="bg-slate-700 px-3 py-1 rounded">View</button>
          <button className="bg-red-600 px-3 py-1 rounded">Delete</button>
        </div>

      </div>
    </div>
  );
}