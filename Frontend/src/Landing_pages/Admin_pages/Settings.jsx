import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Save, Shield, CreditCard, Bell, Palette, Globe, Mail, Percent, Smartphone } from "lucide-react";
import Sidebar from "./admin/Sidebar";
import Topbar from "./admin/Topbar";
import { ThemeContext } from "../../context/ThemeContext";

export default function Settings() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    platformName: "",
    adminEmail: "",
    razorpayKey: "",
    razorpaySecret: "",
    commissionPercentage: 10,
    emailNotifications: true,
    smsNotifications: false,
    themeMode: themeMode
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true });
      if (res.data) {
        setFormData({
          platformName: res.data.platformName || "",
          adminEmail: res.data.adminEmail || "",
          razorpayKey: res.data.razorpayKey || "",
          razorpaySecret: res.data.razorpaySecret || "",
          commissionPercentage: res.data.commissionPercentage || 10,
          emailNotifications: res.data.emailNotifications ?? true,
          smsNotifications: res.data.smsNotifications ?? false,
          themeMode: res.data.themeMode || "dark"
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch settings", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Instantly preview theme change locally before save
    if (name === 'themeMode') {
      setThemeMode(newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/admin/settings", formData, { withCredentials: true });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-[#0b0c10] min-h-screen flex items-center justify-center transition-colors">
        <Sidebar />
        <div className="flex-1 ml-64 relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-[#0b0c10] min-h-screen text-slate-800 dark:text-slate-200 flex font-sans selection:bg-purple-500/30 transition-colors">
      <Sidebar />
      
      <div className="flex-1 ml-64 relative">
        <Topbar />

        <main className="pt-24 px-8 pb-16 max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Platform Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
              Configure global system parameters, payment gateways, and platform appearance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* General Settings */}
            <div className="bg-white dark:bg-[#13151a] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl p-8 relative transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 dark:text-white">
                <Globe size={120} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="text-purple-500" /> General Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Platform Name</label>
                  <input 
                    type="text" 
                    name="platformName" 
                    value={formData.platformName} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                    <Mail size={14} /> Admin Support Email
                  </label>
                  <input 
                    type="email" 
                    name="adminEmail" 
                    value={formData.adminEmail} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Financial & Payments */}
            <div className="bg-white dark:bg-[#13151a] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl p-8 relative transition-colors">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 dark:text-white">
                <CreditCard size={120} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-emerald-500" /> Payment & Financials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                    <Percent size={14} /> Global Commission Rate (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      name="commissionPercentage" 
                      min="0" max="30" step="0.5"
                      value={formData.commissionPercentage} 
                      onChange={handleChange}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                    />
                    <span className="text-xl font-black text-emerald-500 dark:text-emerald-400 w-12">{formData.commissionPercentage}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">This is the percentage the platform takes from every successful booking.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Razorpay Key ID</label>
                  <input 
                    type="text" 
                    name="razorpayKey" 
                    value={formData.razorpayKey} 
                    onChange={handleChange}
                    placeholder="rzp_test_..."
                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none font-mono text-sm transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Razorpay Secret</label>
                  <input 
                    type="password" 
                    name="razorpaySecret" 
                    value={formData.razorpaySecret} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none font-mono text-sm transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Notifications */}
              <div className="bg-white dark:bg-[#13151a] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl p-8 transition-colors">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Bell className="text-blue-500" /> Notifications
                </h2>
                
                <div className="space-y-6">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Mail size={16} className="text-slate-500 dark:text-slate-400"/> Email Alerts</p>
                      <p className="text-xs text-slate-500">Receive system alerts via email</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Smartphone size={16} className="text-slate-500 dark:text-slate-400"/> SMS Alerts</p>
                      <p className="text-xs text-slate-500">Receive critical alerts via SMS</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" name="smsNotifications" checked={formData.smsNotifications} onChange={handleChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Theme & Appearance */}
              <div className="bg-white dark:bg-[#13151a] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl p-8 transition-colors">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Palette className="text-rose-500" /> Appearance
                </h2>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Default Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className={`cursor-pointer text-center p-4 rounded-xl border transition-all ${formData.themeMode === 'light' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500/50 text-rose-500 dark:text-rose-400' : 'bg-slate-50 dark:bg-[#0b0c10] border-slate-200 dark:border-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                      <input type="radio" name="themeMode" value="light" checked={formData.themeMode === 'light'} onChange={handleChange} className="sr-only" />
                      <span className="font-semibold">Light</span>
                    </label>
                    <label className={`cursor-pointer text-center p-4 rounded-xl border transition-all ${formData.themeMode === 'dark' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500/50 text-rose-500 dark:text-rose-400' : 'bg-slate-50 dark:bg-[#0b0c10] border-slate-200 dark:border-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                      <input type="radio" name="themeMode" value="dark" checked={formData.themeMode === 'dark'} onChange={handleChange} className="sr-only" />
                      <span className="font-semibold">Dark</span>
                    </label>
                    <label className={`cursor-pointer text-center p-4 rounded-xl border transition-all ${formData.themeMode === 'system' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-500/50 text-rose-500 dark:text-rose-400' : 'bg-slate-50 dark:bg-[#0b0c10] border-slate-200 dark:border-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                      <input type="radio" name="themeMode" value="system" checked={formData.themeMode === 'system'} onChange={handleChange} className="sr-only" />
                      <span className="font-semibold">System</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-white/10">
              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={20} />
                )}
                {saving ? "Saving Changes..." : "Save All Settings"}
              </button>
            </div>

          </form>

        </main>
      </div>
    </div>
  );
}
