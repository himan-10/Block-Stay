const Settings = () => {
  return (
    <div className="md:col-span-2 bg-slate-900 rounded-3xl p-6">
      <h3 className="text-white mb-6">Account Settings</h3>

      {["Password", "Payments", "Email", "Language"].map((item, i) => (
        <div key={i} className="flex justify-between py-4 border-b border-slate-700">
          <span>{item}</span>
          <span>›</span>
        </div>
      ))}
    </div>
  );
};

export default Settings;