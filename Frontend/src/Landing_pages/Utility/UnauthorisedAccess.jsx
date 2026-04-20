import React from "react";
import { Link } from "react-router-dom";

const UnauthorisedAccess = () => {
  return (
    <div className="bg-[#060e20] text-[#dae2fd] min-h-screen font-sans">

      {/* MAIN */}
      <main className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">

        {/* Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/5 blur-[100px] rounded-full"></div>

        {/* CARD */}
        <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-12 rounded-xl overflow-hidden shadow-2xl">

          {/* LEFT IMAGE */}
          <div className="md:col-span-5 relative h-64 md:h-auto">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1zoCyYWkIG_JKGr8kdTrRmV2WLg_hh3873_Mv47LZwXLb_4ZgH_4aNWXGCy-rnOeCBNGbUrtVBfnxmzMLlJN86Eut4bHFYsVAOmrEYosQV3lp_pLlHOIM3vaWWQc4DpYWS0ByJ0hSKUFEUfneizVW1jseFe6bwyb9NxhLUFCC_mCIolklkk4rD_LxedxxqYqmFx3_YZKxBP9ghbDDzdhhexUHyaPAbV78FQ2veEUuVxfYPUjokWUtcxIf_iF0w_xeASi8DmfB-8Zo"
              alt="lobby"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-transparent to-transparent md:bg-gradient-to-r"></div>

            <div className="absolute top-6 left-6 font-bold text-white">
              Midnight Concierge
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-xs uppercase text-cyan-300">
                Restricted Tier
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-7 p-10 md:p-14 bg-[#222a3d] flex flex-col justify-center">

            <span className="material-symbols-outlined text-purple-400 text-4xl mb-4">
              lock_person
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Elite Access <br /> Required.
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Membership has its privileges. This section is restricted to
              administrators only.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Link
                to="/dashboard"
                className="px-6 py-3 bg-purple-600 rounded-md font-semibold text-center hover:bg-purple-700"
              >
                Dashboard
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 border border-gray-500 rounded-md text-center hover:bg-gray-700"
              >
                Switch Account
              </Link>

            </div>

            {/* SUPPORT */}
            <div className="mt-10 pt-6 border-t border-gray-600 flex items-center gap-3">

              <div className="flex -space-x-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU4y__YDopKtYYlsestiToWxgBsGtEVzXq84fgYumYNFYqTq_tDMWSqb0i6C7QKEeK93nMPfD9p6VwkCu45HcKXzQhyxj0TTqjkMvkKLpEt6WjtQg8EDXD0006yFD5RwfbzMKua-xRjwD9F5wI0FAuyafHllF-QTTdFqdg1NR0tnSd5LViYoDbFnp2e_oWvbdgN4jBUuAUy_YLD1SSsIfgV9Tx1-DMEQ__3vlLg-9gAy8E0qoge_TUVpAzySsKEI2A333HdhvsFiTt"
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_P9t25i3qT4gKqE73JH07hXbapW0WM-AMw-m-kb6sj2zp72cG7JbXZGItynmPf4ho_dQZGiOYDK9Be4WCpiaehDLU4fOc4EIPe4fjDX4TkFZtwk1T8a_JJSk69SS4vi8niOmOd6h8KV1F85jNxWu2kZLLY2oIGO3xEmo_rruyk-ZltGMFZ05DPbxgyvlpQtnqVb_BIzXTkd23ZK6ZVCmMsxFiBNjI25_dmEIsNQKZSRAl8kgG2HNywkbHIvOgHqQZWUF8znmHeFE3"
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
              </div>

              <p className="text-sm text-gray-400">
                Need help?{" "}
                <Link to="/support" className="text-cyan-400 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* 403 TEXT */}
        <div className="mt-10 flex items-center gap-6 opacity-20">
          <span className="text-6xl font-bold">403</span>
          <div className="h-px w-20 bg-gray-500"></div>
          <span className="text-xs uppercase tracking-widest">
            Access Forbidden
          </span>
        </div>
      </main>


    </div>
  );
};

export default UnauthorisedAccess;