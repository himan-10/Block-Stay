import { X, Mail, Phone, Calendar, Shield, Activity } from "lucide-react";

export default function UserProfileModal({ user, onClose, onRoleChange, onDelete }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#13151a] w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-indigo-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8 relative flex-1 overflow-y-auto">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#13151a] bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-4xl font-black shadow-lg uppercase overflow-hidden">
              {user.photo ? <img src={user.photo} alt={user.name} className="w-full h-full object-cover" /> : user.name.charAt(0)}
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                user.role === 'admin' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30' :
                user.role === 'owner' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' :
                'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
              }`}>
                {user.role}
              </span>
              {user.isBanned && (
                 <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                  Banned
                 </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">ID: {user._id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-100 dark:border-white/5 pb-2">Contact Details</h3>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Mail size={14} /></div>
                {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Phone size={14} /></div>
                {user.phone || "No phone provided"}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-100 dark:border-white/5 pb-2">Account Status</h3>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Calendar size={14} /></div>
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Activity size={14} /></div>
                Last Active: {new Date(user.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-3">
            <select 
              value={user.role}
              onChange={(e) => onRoleChange(user._id, e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl px-4 py-2 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors cursor-pointer"
            >
              <option value="user">Role: Guest</option>
              <option value="owner">Role: Owner</option>
              <option value="admin">Role: Admin</option>
              <option value="pending">Role: Pending</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors text-slate-700 dark:text-slate-300">
              <Mail size={16} /> Contact User
            </button>
            
            <button 
              onClick={() => {
                onDelete(user._id);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 ml-auto bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-red-200 dark:border-red-500/20"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
