import UserRow from "./UserRow";

export default function UsersTable({ users, onRoleChange, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
      <table className="w-full text-left">
        <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
          <tr>
            <th className="p-4 font-semibold tracking-wider">User</th>
            <th className="font-semibold tracking-wider">Role</th>
            <th className="font-semibold tracking-wider">Joined Date</th>
            <th className="text-right p-4 font-semibold tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {users.map((u) => (
            <UserRow 
              key={u._id} 
              user={u} 
              onRoleChange={onRoleChange} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}