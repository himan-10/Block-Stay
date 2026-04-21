import UserRow from "./UserRow";

const users = [
  {
    name: "Adrian Vance",
    email: "adrian@midnight.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 mins ago",
    img: "https://i.pravatar.cc/100?img=1",
  },
];

export default function UsersTable() {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <table className="w-full text-left">

        <thead className="text-xs text-slate-500 uppercase">
          <tr>
            <th className="p-4">User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Activity</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <UserRow key={i} user={u} />
          ))}
        </tbody>

      </table>
    </div>
  );
}