import { useState, useEffect } from 'react';

const Preferences = () => {
  const allPreferences = ["High Floor", "Late Checkout", "Firm Pillow", "City View", "Non-Smoking", "Pet Friendly", "Pool Access"];
  
  const [selectedPrefs, setSelectedPrefs] = useState(() => {
    const saved = localStorage.getItem('blockstay_user_preferences');
    return saved ? JSON.parse(saved) : ["High Floor", "Non-Smoking"];
  });

  useEffect(() => {
    localStorage.setItem('blockstay_user_preferences', JSON.stringify(selectedPrefs));
  }, [selectedPrefs]);

  const togglePref = (pref) => {
    setSelectedPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-white font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          Stay Preferences
        </h3>
        <span className="text-xs text-slate-400">Auto-saved</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {allPreferences.map((pref, i) => {
          const isSelected = selectedPrefs.includes(pref);
          return (
            <button 
              key={i} 
              onClick={() => togglePref(pref)}
              className={`px-4 py-2 text-sm rounded-xl border cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20' 
                  : 'bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-violet-500/20 hover:text-violet-300 hover:border-violet-500/30'
              }`}
            >
              {pref}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Preferences;