import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans min-h-screen overflow-x-hidden">



      {/* MAIN */}
      <main className="min-h-screen flex items-center justify-center pt-24 px-6 relative">

        {/* Background blur */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px]"></div>

        <section className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16 z-10">

          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/2 space-y-4">

            <div className="relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-Wge8x8-NrOPCTPgZOcT9wEy_EfOEmtY-GAkm0-3F2lh1Ws_r4B6s4-IxgEy-fG5nUzzTrnn1dblOEFT39ZV46VIdxi8eB78gvSsOJtjbooDkj40TMvK6af-9flys3I3_JgAyDGHM3AgYpW_iWQsiU0mO-kGySk-8tYa1RKEW3-caNiY_KOQeXLuq4Go8UDpRGs0Sue_Z3eW8O3mz-y2NpcagSuP5Mwj7BhZFLPOW4rmsczBN_fkytahkLVDRJr1fdRoz4dqo7Vi"
                alt="hotel"
                className="w-full h-[400px] object-cover rounded-xl grayscale group-hover:grayscale-0 transition"
              />

              <div className="absolute -top-4 -right-4 bg-[#1e293b]/70 backdrop-blur p-6 rounded-xl">
                <span className="text-cyan-400 text-5xl font-black">404</span>
              </div>
            </div>

            <div className="flex gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAysU8HD83vL3H_-KYSQ7yTK7XG3nsqzXN36y6K7HCCZhKa0aqf1QfIvIeC1CsOhUS_H39WhxKi71rNNudkBzUyKDkow0On4AG4GztRnLHfPtLoOqF9p8YVhcDV1fjWjMX_xBnFrU9u3LE604wQnQs4HI25-9TEEhYKlbUeVztI8M6ywm7gn6kA3Px0wn53bQLAKartTnY5dLQqZ5vw6NDm4AOPYGKGxXHYTie5Lu7b61I1xtPzt96FpWohez_FshqNkM4xImV2p6m5"
                alt="card"
                className="w-1/2 h-32 object-cover rounded-xl opacity-60"
              />

              <div className="w-1/2 h-32 bg-[#2d3449] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">
                  explore_off
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-1/2 space-y-6">

            <div>
              <h2 className="text-xs uppercase tracking-widest text-cyan-300 mb-3">
                Error Code 404
              </h2>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Lost in the{" "}
                <span className="text-purple-500">Shadows.</span>
              </h1>
            </div>

            <p className="text-gray-400 text-lg">
              Even the most seasoned travelers sometimes find themselves in
              uncharted territory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <Link
                to="/"
                className="bg-purple-600 px-6 py-3 rounded-lg font-bold text-center hover:bg-purple-700"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="border border-gray-500 px-6 py-3 rounded-lg text-center hover:bg-gray-800"
              >
                Explore
              </Link>

            </div>

            <div className="pt-8 border-t border-gray-700">
              <p className="text-xs uppercase text-gray-500 mb-3">
                Quick Links
              </p>

              <div className="flex gap-6 flex-wrap text-gray-400">
                <Link to="/support">Support</Link>
                <Link to="/portal">Portal</Link>
                <Link to="/help">Help</Link>
              </div>
            </div>

          </div>
        </section>
      </main>


    </div>
  );
};

export default PageNotFound;