import React from "react";

const Sign_up = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account Created!");
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
              placeholder="First Name"
              className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-slate-900 border border-slate-600 px-4 py-3 rounded-lg outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

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