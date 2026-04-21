import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      alert("Login failed");
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

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Midnight Concierge</h1>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant">
              Exquisite Stays. Seamless Access.
            </p>
          </div>

          {/* Card */}
          <div className="bg-surface-container rounded-xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-center text-on-surface-variant mb-6">
              Please login to continue
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="text-xs uppercase text-on-surface-variant">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <label>Password</label>
                  <Link to="/forgot" className="text-primary">
                    Forgot?
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button className="w-full py-3 bg-primary rounded-lg font-bold">
                Login
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 text-center text-xs text-on-surface-variant">
              OR
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-surface-container-high p-3 rounded-lg">
                Google
              </button>
              <button className="bg-surface-container-high p-3 rounded-lg">
                Apple
              </button>
            </div>

          </div>

          {/* Signup */}
          <p className="text-center mt-6 text-sm text-on-surface-variant">
            New user?
            <Link to="/signup" className="text-primary ml-1">
              Create account
            </Link>
          </p>

        </div>
      </main>

    </div>
  );
};

export default Login;