import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sign_up = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "user" });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    try {
      const name = `${form.firstName} ${form.lastName}`;
      await register(name, form.email, form.password, form.role);
      setIsSuccess(true);
    } catch (error) {
      console.error('Frontend register error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed';
      alert(`Registration failed: ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-white flex items-center justify-center px-6">

      {/* Card */}
      <div className="w-full max-w-xl bg-slate-800/70 backdrop-blur-xl rounded-xl p-8 md:p-10 shadow-2xl border border-slate-700">

        {isSuccess ? (
          <div className="text-center py-10">
            <span className="material-symbols-outlined text-green-400 text-6xl mb-4">check_circle</span>
            <h2 className="text-3xl font-bold mb-4 text-white">Signup Successfully!</h2>
            <p className="text-gray-400 mb-8">
              Your account has been created. You can now log in to access your dashboard.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-purple-600 hover:bg-purple-700 transition-all font-bold py-3 px-8 rounded-lg text-white w-full"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Start your journey with Blockstay</h1>
              <p className="text-gray-400 text-sm">
                Create an account to discover extraordinary spaces.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />

                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Account Type</label>
                <div className="flex gap-3">
                  <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-700/50 flex-1">
                    <input type="radio" name="role" value="user" checked={form.role === 'user'} onChange={handleChange} className="text-purple-500" />
                    <span>Regular Guest</span>
                  </label>
                  <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-700/50 flex-1">
                    <input type="radio" name="role" value="owner" checked={form.role === 'owner'} onChange={handleChange} className="text-purple-500" />
                    <span>Property Owner</span>
                  </label>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all font-bold py-3 rounded-lg"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Sign_up;