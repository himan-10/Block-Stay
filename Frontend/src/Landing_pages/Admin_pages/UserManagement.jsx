import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./admin/AdminLayout";
import UserFilters from "./usermanagement/UserFilters";
import UsersTable from "./usermanagement/UsersTable";
import StatsBento from "./usermanagement/StatsBento";
import Pagination from "./usermanagement/Pagination";
import UserProfileModal from "./usermanagement/UserProfileModal";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, { withCredentials: true });
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, { role: newRole }, { withCredentials: true });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, { withCredentials: true });
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
    <AdminLayout>
      <main className="pt-24 px-4 md:px-8 pb-16 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                User Registry
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
                Manage all registered users in the system.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white dark:bg-[#13151a] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm">
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 border-t-transparent"></div>
            </div>
          ) : (
            <UsersTable 
              users={filteredUsers} 
              onRoleChange={handleRoleChange} 
              onDelete={handleDeleteUser} 
              onViewProfile={setActiveUser}
            />
          )}

          {/* Pagination */}
          <div className="mt-8">
            <Pagination totalPages={Math.ceil(filteredUsers.length / 10) || 1} />
          </div>

      </main>

      <UserProfileModal 
        user={activeUser}
        onClose={() => setActiveUser(null)}
        onRoleChange={handleRoleChange}
        onDelete={handleDeleteUser}
      />
    </AdminLayout>
  );
}