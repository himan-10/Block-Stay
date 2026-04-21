import SideNavBar from "./usermanagement/SideNavBar";
import TopAppBar from "./usermanagement/TopAppBar";
import UserFilters from "./usermanagement/UserFilters";
import UsersTable from "./usermanagement/UsersTable";
import StatsBento from "./usermanagement/StatsBento";
import Pagination from "./usermanagement/Pagination";

export default function UserManagement() {
  return (
    <div className="dark min-h-screen bg-[#0b1326] text-slate-200 flex">

      {/* Sidebar */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1 ml-64">

        {/* Top Bar */}
        <TopAppBar />

        <main className="pt-24 px-10 pb-10">

          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                User Registry
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Manage all registered users in the system.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2 border border-slate-700 rounded-lg text-xs uppercase tracking-widest hover:bg-slate-800">
                Export CSV
              </button>
              <button className="px-5 py-2 bg-violet-600 rounded-lg text-xs uppercase tracking-widest">
                Add New User
              </button>
            </div>
          </div>

          {/* Filters */}
          <UserFilters />

          {/* Table */}
          <UsersTable />

          {/* Pagination */}
          <Pagination totalPages={5} />

          {/* Stats */}
          <StatsBento />

        </main>
      </div>
    </div>
  );
}