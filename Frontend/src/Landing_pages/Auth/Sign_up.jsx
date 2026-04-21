import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sign_up = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    try {
      const name = `${form.firstName} ${form.lastName}`;
      await register(name, form.email, form.password, form.role);
      navigate("/");
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Midnight Concierge</h1>
          <p className="text-gray-400 text-sm">
            Create your account
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
              className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />

            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
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
          <a href="/login" className="text-purple-400 font-semibold">
            Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default Sign_up;