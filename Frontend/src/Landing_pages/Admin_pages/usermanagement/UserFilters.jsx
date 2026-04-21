export default function UserFilters() {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">

      {/* Search */}
      <div className="col-span-12 md:col-span-4 bg-slate-900 p-4 rounded-xl">
        <input
          placeholder="Name, email, or ID..."
          className="w-full bg-slate-950 p-3 rounded text-sm"
        />
      </div>

      {/* Role */}
      <div className="col-span-12 md:col-span-3 bg-slate-900 p-4 rounded-xl">
        <select className="w-full bg-slate-950 p-3 rounded text-sm">
          <option>All Roles</option>
          <option>Traveler</option>
          <option>Owner</option>
          <option>Admin</option>
        </select>
      </div>

      {/* Status */}
      <div className="col-span-12 md:col-span-3 bg-slate-900 p-4 rounded-xl">
        <select className="w-full bg-slate-950 p-3 rounded text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* Clear */}
      <div className="col-span-12 md:col-span-2">
        <button className="w-full bg-slate-800 p-3 rounded-xl">
          Clear
        </button>
      </div>
    </div>
  );
}