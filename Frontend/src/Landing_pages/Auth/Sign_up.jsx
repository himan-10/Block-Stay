import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { auth, googleProvider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";

const Sign_up = () => {
  const navigate = useNavigate();
  const { register, googleLogin, setAccountRole } = useContext(AuthContext);

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "user" });
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      const data = await googleLogin(idToken);
      
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      if (data.role === 'pending') {
        setShowRoleModal(true);
      } else if (data.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.log("Google Login Error:", error);
      alert(`Google Login failed: ${error.message}`);
    }
  };

  const handleRoleSelection = async (role) => {
    if (role === 'owner') {
      const isConfirmed = window.confirm("Are you sure you want to register as a Property Owner? This will allow you to create and manage property listings.");
      if (!isConfirmed) return;
    }
    
    try {
      const data = await setAccountRole(role);
      setShowRoleModal(false);
      if (data.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to set account type.");
    }
  };

  const handleAppleLogin = () => {
    alert("Apple login coming soon!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    try {
      const name = `${form.firstName} ${form.lastName}`;
      const user = await register(name, form.email, form.password, form.role);
      
      // Successfully registered and logged in! Redirect immediately based on role.
      if (user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('Frontend register error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed';
      alert(`Registration failed: ${errorMsg}`);
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen flex flex-col">

      {/* Background Glow */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]"></div>
      </div>

      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">

        <div className="w-full max-w-xl">

          {/* Logo */}
          <div className="text-center mb-10">
            <Link to="/" className="text-3xl font-bold hover:text-violet-400 transition-colors">Blockstay</Link>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant">
              Start your journey with us
            </p>
          </div>

          {/* Card */}
          <div className="bg-surface-container rounded-xl p-8 md:p-10 shadow-xl">

            <h2 className="text-2xl font-bold mb-2 text-center">
              Create an account
            </h2>
            <p className="text-sm text-center text-on-surface-variant mb-6">
              Discover extraordinary spaces around the world.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-on-surface-variant">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-on-surface-variant">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-on-surface-variant">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-on-surface-variant">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-on-surface-variant">Confirm</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="pt-2">
                <label className="text-xs uppercase text-on-surface-variant mb-3 block">Account Type</label>
                <div className="flex gap-3">
                  <label className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer flex-1 transition-all ${form.role === 'user' ? 'bg-primary/20 border-primary' : 'bg-surface-container-highest border-transparent hover:bg-slate-700'}`}>
                    <input type="radio" name="role" value="user" checked={form.role === 'user'} onChange={handleChange} className="hidden" />
                    <span className="material-symbols-outlined text-primary">person</span>
                    <span className="font-medium text-sm">Guest</span>
                  </label>
                  <label className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer flex-1 transition-all ${form.role === 'owner' ? 'bg-primary/20 border-primary' : 'bg-surface-container-highest border-transparent hover:bg-slate-700'}`}>
                    <input type="radio" name="role" value="owner" checked={form.role === 'owner'} onChange={handleChange} className="hidden" />
                    <span className="material-symbols-outlined text-primary">real_estate_agent</span>
                    <span className="font-medium text-sm">Owner</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full py-3 mt-4 bg-primary rounded-lg font-bold">
                Create Account
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 text-center text-xs text-on-surface-variant">
              OR
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-surface-container-high p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors font-medium">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={handleAppleLogin}
                className="bg-surface-container-high p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors font-medium">
                <span className="material-symbols-outlined text-lg">apple</span>
                <span>Apple</span>
              </button>
            </div>

          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-on-surface-variant">
            Already have an account?
            <Link to="/login" className="text-primary ml-1 font-semibold">
              Sign in
            </Link>
          </p>

        </div>
      </main>

      {/* Role Selection Modal (For Google Login) */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10 text-center relative animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">Choose Your Account Type</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              How would you like to use Blockstay today?
            </p>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelection('user')}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all"
              >
                Continue as Guest
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelection('owner')}
                className="bg-surface-container-highest hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all border border-white/10"
              >
                Continue as Property Owner
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sign_up;