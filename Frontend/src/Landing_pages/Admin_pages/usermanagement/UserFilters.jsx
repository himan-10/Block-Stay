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
      <div className="col-span-12 md:col-span-6 bg-white dark:bg-[#13151a] p-4 rounded-xl border border-slate-200 dark:border-white/5 transition-colors">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or ID..."
          className="w-full bg-slate-50 dark:bg-[#0b0c10] p-3 rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none focus:ring-1 focus:ring-purple-500 border border-slate-200 dark:border-slate-800 transition-colors"
        />
      </div>

      {/* Role */}
      <div className="col-span-12 md:col-span-4 bg-white dark:bg-[#13151a] p-4 rounded-xl border border-slate-200 dark:border-white/5 transition-colors">
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full bg-slate-50 dark:bg-[#0b0c10] p-3 rounded-xl text-sm text-slate-900 dark:text-slate-200 outline-none focus:ring-1 focus:ring-purple-500 border border-slate-200 dark:border-slate-800 transition-colors"
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
          className="w-full h-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-3 rounded-xl transition text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}