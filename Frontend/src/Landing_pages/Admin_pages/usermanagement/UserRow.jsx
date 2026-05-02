import { Trash2, Shield, User as UserIcon } from "lucide-react";

export default function UserRow({ user, onRoleChange, onDelete, onViewProfile }) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-200 group">
      {/* User */}
      <td className="px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-500/30 font-bold uppercase">
          {user.photo ? <img src={user.photo} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{user.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
        </div>
      </td>

      {/* Role */}
      <td className="px-2">
        <select 
          value={user.role}
          onChange={(e) => onRoleChange(user._id, e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
        >
          <option value="user">Guest</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="pending">Pending</option>
        </select>
      </td>

      {/* Joined */}
      <td className="text-sm text-slate-500 dark:text-slate-400 px-2">
        {new Date(user.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </td>

      {/* Actions */}
      <td className="text-right px-6 space-x-2 flex justify-end">
        <button 
          onClick={() => onViewProfile(user)}
          className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition"
          title="View Profile"
        >
          <UserIcon size={16} />
        </button>
        <button 
          onClick={() => onDelete(user._id)}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
          title="Delete User"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}