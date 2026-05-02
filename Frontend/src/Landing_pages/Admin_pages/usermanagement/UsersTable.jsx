import UserRow from "./UserRow";

export default function UsersTable({ users, onRoleChange, onDelete, onViewProfile }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white dark:bg-[#13151a] rounded-xl p-8 text-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 transition-colors">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#13151a] rounded-xl overflow-hidden shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/5 transition-colors">
      <table className="w-full text-left">
        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="p-4 font-semibold tracking-wider">User</th>
            <th className="font-semibold tracking-wider">Role</th>
            <th className="font-semibold tracking-wider">Joined Date</th>
            <th className="text-right p-4 font-semibold tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {users.map((u) => (
            <UserRow 
              key={u._id} 
              user={u} 
              onRoleChange={onRoleChange} 
              onDelete={onDelete} 
              onViewProfile={onViewProfile}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}