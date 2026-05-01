export default function UserFilters({ 
  searchQuery, 
  setSearchQuery, 
  roleFilter, 
  setRoleFilter 
}) {
  const handleClear = () => {
    setSearchQuery("");
    setRoleFilter("All Roles");
  };

  return (
    <div className="grid grid-cols-12 gap-4 mb-8">

      {/* Search */}
      <div className="col-span-12 md:col-span-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or ID..."
          className="w-full bg-slate-950 p-3 rounded text-sm text-slate-200 outline-none focus:ring-1 focus:ring-violet-500 border border-slate-800"
        />
      </div>

      {/* Role */}
      <div className="col-span-12 md:col-span-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full bg-slate-950 p-3 rounded text-sm text-slate-200 outline-none focus:ring-1 focus:ring-violet-500 border border-slate-800"
        >
          <option value="All Roles">All Roles</option>
          <option value="user">Guest (User)</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Clear */}
      <div className="col-span-12 md:col-span-2">
        <button 
          onClick={handleClear}
          className="w-full h-full bg-slate-800 hover:bg-slate-700 p-3 rounded-xl transition text-sm font-bold text-slate-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}