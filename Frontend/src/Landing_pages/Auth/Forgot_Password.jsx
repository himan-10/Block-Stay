import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Forgot_Password = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await forgotPassword(email);
      setMessage("A password reset link has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            <Link to="/" className="text-3xl font-bold hover:text-violet-400 transition-colors">Blockstay</Link>
          </div>

          {/* Card */}
          <div className="bg-surface-container rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
            <p className="text-sm text-center text-on-surface-variant mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {message && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-sm mb-4">{message}</div>}
            {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs uppercase text-on-surface-variant">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-surface-container-highest outline-none border border-transparent hover:border-slate-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-lg font-bold transition-colors"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-on-surface-variant">
            Remember your password?
            <Link to="/login" className="text-primary ml-1 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Forgot_Password;
