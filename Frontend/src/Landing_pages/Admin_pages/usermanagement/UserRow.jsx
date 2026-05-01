import { Trash2, Shield, User as UserIcon } from "lucide-react";

export default function UserRow({ user, onRoleChange, onDelete }) {
  return (
    <tr className="hover:bg-slate-800/50 transition duration-200 group">
      {/* User */}
      <td className="px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/30 font-bold uppercase">
          {user.photo ? <img src={user.photo} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-slate-200 group-hover:text-violet-400 transition-colors">{user.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
        </div>
      </td>

      {/* Role */}
      <td className="px-2">
        <select 
          value={user.role}
          onChange={(e) => onRoleChange(user._id, e.target.value)}
          className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none"
        >
          <option value="user">Guest</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="pending">Pending</option>
        </select>
      </td>

      {/* Joined */}
      <td className="text-sm text-slate-400 px-2">
        {new Date(user.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </td>

      {/* Actions */}
      <td className="text-right px-6 space-x-3">
        <button 
          onClick={() => onDelete(user._id)}
          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
          title="Delete User"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}