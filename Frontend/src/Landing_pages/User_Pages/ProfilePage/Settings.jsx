import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, updateProfile, deleteProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('blockstay_notifications');
    return saved ? JSON.parse(saved) : { email: true, sms: false, push: true };
  });

  // Security State
  const [twoFactor, setTwoFactor] = useState(() => {
    return localStorage.getItem('blockstay_2fa') === 'true';
  });

  // Device Info Logic
  const getDeviceDetails = () => {
    const ua = navigator.userAgent;
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";

    if (ua.includes("Win")) os = "Windows PC";
    else if (ua.includes("Mac")) os = "Mac";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("like Mac")) os = "iOS Device";

    return `${os} • ${browser}`;
  };

  const [deviceInfo] = useState(getDeviceDetails());

  useEffect(() => {
    localStorage.setItem('blockstay_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('blockstay_2fa', twoFactor.toString());
  }, [twoFactor]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const updates = { name: formData.name, email: formData.email };
      if (formData.password) updates.password = formData.password;
      
      await updateProfile(updates);
      setMessage('Profile updated successfully!');
      setActiveSection(null);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        await deleteProfile();
        navigate('/');
      } catch (err) {
        alert("Failed to delete account");
      }
    }
  };

  const handleSessionLogout = async () => {
    if (window.confirm("Are you sure you want to end this active session? You will be logged out immediately.")) {
      try {
        await logout();
        navigate('/login');
      } catch (err) {
        alert("Failed to log out session.");
      }
    }
  };

  const toggleSection = (section) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  return (
    <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl text-white font-bold mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        Account Settings
      </h3>

      {message && (
        <div className={`p-3 mb-4 rounded-xl text-sm ${message.includes('success') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* Personal Information Section */}
        <div className="bg-slate-800/30 rounded-2xl border border-transparent hover:border-white/10 transition-all overflow-hidden">
          <div onClick={() => toggleSection('personal')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${activeSection === 'personal' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div>
                <span className="block text-slate-300 font-medium">Personal Information</span>
                {activeSection !== 'personal' && <span className="block text-xs text-slate-500">{user?.email}</span>}
              </div>
            </div>
            <span className={`text-slate-500 transition-transform duration-300 ${activeSection === 'personal' ? 'rotate-90 text-violet-400' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
          
          {activeSection === 'personal' && (
            <div className="p-4 pt-0 border-t border-white/5">
              <form onSubmit={handleUpdate} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">New Password (optional)</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 rounded-xl transition-colors disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
             </button>
              </form>
            </div>
          )}
        </div>

        {/* Payment Methods Section */}
        <div className="bg-slate-800/30 rounded-2xl border border-transparent hover:border-white/10 transition-all overflow-hidden">
          <div onClick={() => toggleSection('payment')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${activeSection === 'payment' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
              <span className="text-slate-300 font-medium">Payment Methods</span>
            </div>
            <span className={`text-slate-500 transition-transform duration-300 ${activeSection === 'payment' ? 'rotate-90 text-violet-400' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
          
          {activeSection === 'payment' && (
            <div className="p-4 pt-0 border-t border-white/5 mt-2">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center">
                    <span className="text-[10px] font-bold text-blue-900">VISA</span>
                  </div>
                  <div>
                    <p className="text-white text-sm">•••• •••• •••• 4242</p>
                    <p className="text-slate-500 text-xs">Expires 12/28</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md">Default</span>
              </div>
              <button className="w-full py-2 border border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-violet-500 transition-colors text-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Add New Card
              </button>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <div className="bg-slate-800/30 rounded-2xl border border-transparent hover:border-white/10 transition-all overflow-hidden">
          <div onClick={() => toggleSection('notifications')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${activeSection === 'notifications' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <span className="text-slate-300 font-medium">Notifications</span>
            </div>
            <span className={`text-slate-500 transition-transform duration-300 ${activeSection === 'notifications' ? 'rotate-90 text-violet-400' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
          
          {activeSection === 'notifications' && (
            <div className="p-4 pt-0 border-t border-white/5 mt-2 space-y-3">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive booking confirmations and updates via email.' },
                { key: 'sms', label: 'SMS Alerts', desc: 'Get text messages for important trip changes.' },
                { key: 'push', label: 'Push Notifications', desc: 'Receive real-time alerts on your device.' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${notifications[item.key] ? 'bg-violet-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security & Privacy Section */}
        <div className="bg-slate-800/30 rounded-2xl border border-transparent hover:border-white/10 transition-all overflow-hidden">
          <div onClick={() => toggleSection('security')} className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${activeSection === 'security' ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <span className="text-slate-300 font-medium">Security & Privacy</span>
            </div>
            <span className={`text-slate-500 transition-transform duration-300 ${activeSection === 'security' ? 'rotate-90 text-violet-400' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
          
          {activeSection === 'security' && (
            <div className="p-4 pt-0 border-t border-white/5 mt-2 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <p className="text-white text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-slate-500 text-xs">Add an extra layer of security to your account.</p>
                </div>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${twoFactor ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
                >
                  {twoFactor ? 'Disable' : 'Enable'}
                </button>
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-2">Recent Logins</p>
                <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-slate-300 text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> {deviceInfo}</p>
                    <p className="text-slate-500 text-[10px] mt-1">Current Session • Active Now</p>
                  </div>
                  <button onClick={handleSessionLogout} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 bg-red-500/10 rounded-md border border-red-500/20 hover:bg-red-500/20 transition-colors">Log out</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-all font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;