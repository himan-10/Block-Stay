export default function UserRow({ user }) {
  return (
    <tr className="hover:bg-slate-900 transition">

      {/* User */}
      <td className="px-6 py-4 flex items-center gap-3">
        <img src={user.img} className="w-10 h-10 rounded-full" />
        <div>
          <p>{user.name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
      </td>

      {/* Role */}
      <td>{user.role}</td>

      {/* Status */}
      <td>
        <span className="text-xs">{user.status}</span>
      </td>

      {/* Activity */}
      <td className="text-sm text-slate-400">{user.lastActive}</td>

      {/* Actions */}
      <td className="text-right space-x-2">
        <button>✏️</button>
        <button>✉️</button>
        <button>🚫</button>
      </td>
    </tr>
  );
}