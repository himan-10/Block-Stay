import { useState, useEffect } from "react";
import axios from "axios";
import SideNavBar from "./usermanagement/SideNavBar";
import TopAppBar from "./usermanagement/TopAppBar";
import UserFilters from "./usermanagement/UserFilters";
import UsersTable from "./usermanagement/UsersTable";
import StatsBento from "./usermanagement/StatsBento";
import Pagination from "./usermanagement/Pagination";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", { withCredentials: true });
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}`, { role: newRole }, { withCredentials: true });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, { withCredentials: true });
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.includes(searchQuery);
      
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="dark min-h-screen bg-[#0b1326] text-slate-200 flex font-sans">
      {/* Sidebar */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1 ml-64 relative">
        {/* Top Bar */}
        <TopAppBar />

        <main className="pt-24 px-10 pb-10 max-w-7xl mx-auto">
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
              <button className="px-5 py-2 border border-slate-700 rounded-lg text-xs uppercase tracking-widest hover:bg-slate-800 transition">
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <UserFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />

          {/* Table */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 border-t-transparent"></div>
            </div>
          ) : (
            <UsersTable 
              users={filteredUsers} 
              onRoleChange={handleRoleChange} 
              onDelete={handleDeleteUser} 
            />
          )}

          {/* Pagination */}
          <Pagination totalPages={Math.ceil(filteredUsers.length / 10) || 1} />

        </main>
      </div>
    </div>
  );
}