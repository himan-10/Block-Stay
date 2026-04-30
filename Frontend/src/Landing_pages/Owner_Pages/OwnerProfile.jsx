import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, Mail, Phone, Lock, Save, AlertTriangle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function OwnerProfile() {
  const { user, setUser, api } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match", "error");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      if (formData.password) payload.password = formData.password;

      const { data } = await api.put('/auth/me', payload);
      setUser(data);
      showToast("Profile updated successfully!");
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-4xl mx-auto space-y-8 relative z-10">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-8 left-1/2 z-50 flex items-center gap-3 backdrop-blur-xl border px-6 py-3.5 rounded-2xl shadow-2xl ${
              toast.type === 'error' ? 'bg-[#0d1529]/90 border-rose-500/30 text-white shadow-[0_10px_40px_rgba(244,63,94,0.2)]' 
              : 'bg-[#0d1529]/90 border-emerald-500/30 text-white shadow-[0_10px_40px_rgba(16,185,129,0.2)]'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle className="text-rose-400" size={18} /> : <CheckCircle className="text-emerald-400" size={18} />}
            <span className="font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Identity Management</h2>
        <p className="text-slate-400 mt-1">Update your personal information and security settings</p>
      </div>

      <div className="bg-[#0d1529]/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-8 border-b border-white/5 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/20">
            <img 
              src={user?.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Owner'}`} 
              alt="Profile" 
              className="w-full h-full rounded-full bg-[#0a0f1d] object-cover border-4 border-[#0d1529]"
            />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1">{user?.name}</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Verified Owner</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2.5">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Full Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium" />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium" />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium" />
              </div>
            </div>
          </div>

          <hr className="border-white/5 my-8" />

          <div>
            <h4 className="text-xl font-bold text-white mb-6">Security Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold tracking-wide text-slate-300 uppercase">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner font-medium" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
