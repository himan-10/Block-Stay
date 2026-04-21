import React from 'react';
import { Link } from 'react-router-dom';

const RoomDetails = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container/30">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0');

          .material-symbols-outlined {
              font-family: 'Material Symbols Outlined';
              font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
          .text-glow:hover {
              text-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
          }
        `}
      </style>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-violet-900/10 flex justify-between items-center px-8 py-4 max-w-full font-['Manrope'] tracking-tight">
        <div className="text-xl font-bold tracking-tighter text-slate-100">Blockstay</div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/rooms" className="text-violet-400 border-b-2 border-violet-500 pb-1">Rooms</Link>
          <Link to="/about" className="text-slate-400 hover:text-slate-100 transition-colors">About</Link>
          <Link to="/contact" className="text-slate-400 hover:text-slate-100 transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-400 hover:text-slate-100 transition-colors font-medium text-sm">Login</Link>
          <Link to="/signup" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold hover:scale-95 transition-all duration-200 shadow-lg shadow-primary-container/20">Sign Up</Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Editorial Hero Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <span className="font-label tracking-[0.2em] text-secondary text-xs uppercase mb-2 block">Premium Property</span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-none">Downtown Apartment</h1>
              <div className="flex items-center gap-4 mt-4 text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-semibold">4.98</span>
                  <span className="text-muted opacity-60">(124 reviews)</span>
                </div>
                <span className="opacity-30">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>Reykjavík, Iceland</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>
        </header>

        {/* Asymmetric Editorial Gallery */}
        <section className="grid grid-cols-12 grid-rows-2 gap-4 h-[716px] mb-20 overflow-hidden">
          <div className="col-span-12 md:col-span-8 row-span-2 relative group overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Ultra-modern luxury hotel bedroom with dark velvet textures, ambient violet lighting, and a panoramic window overlooking a snowy night landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKpTfYomnT-pYIu_Ac5_LyZe9EjQvUUaroh9LlsfRITHP5p-tLPZWBvladU6bptHUt_O9qi88IZmKDbJL6vI6Zl8ZyexjY3USnNulD011EKtryeT8lB1H27I5Y2TJg6twJ6RuZGeDyucprgmBQdMcs7Txcl3dpamPXHjfbmlT9qhHrdBkn9KmTSskZrapCqGoSRldJzLudIfri_U1SCBnXIbWYAnWNWvE0UzNBUg7mYTVvX9Uwd_kHObFVAKqoaND3uY1wReVZUzSX" alt="Bedroom"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
          </div>
          <div className="hidden md:block col-span-4 row-span-1 overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" data-alt="High-end marble bathroom with a deep soaking tub, minimalist black fixtures, and subtle cyan accent lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkQZRDqflu4a6RiTLWUEbVut2lktFdIelW0V_AJmdiYSQxbLamSTle62W2tk1A81GjChQ9CEqVVBvv-S11VAJUr_YEuDk5t1zP6qpiAoNm2orSbicUdAI9YHalw5vm4g_SdO_ZZihMeYPe20NsGLu780PGKlVeLlstA9KIqIITIPBC-Hos-cEdxd_tT0w3bYoic_Z4JhtlA-5py3mrscDSixooRG6TchlF_zpKdNPsdxHLxWGoh-8sTXDiOH8U3vEL-epcqhGYqsrP" alt="Bathroom"/>
          </div>
          <div className="hidden md:block col-span-2 row-span-1 overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" data-alt="Sleek private lounge area within a suite featuring dark oak wood and contemporary designer furniture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhEPlgu2tjusWqFKDOGUNNo1lfPGPE7PRChH1DjNJRtBVD3GLBBIFqwu2x4ErIl78IsdU1id8vyDD_7EhmkmEHeo3qXdsQRFFROrjJXhUGnX41Yip7LTGzAjBuKe-TzdDnYzAsagcR2Ptd96JsEvgF2Rz4v8JZ-BibprkInaMUx1aMojVaKYw9rtNCrwbgWM12L0LX4WQFz0zHbBgE2ISipkhriewo8Oa0Yqh5ZecRxHppIF1ZVvuaada80leCutbbmVf5ZL6ugWdU" alt="Lounge Area"/>
          </div>
          <div className="hidden md:block col-span-2 row-span-1 overflow-hidden rounded-xl relative">
            <img className="w-full h-full object-cover blur-[2px] opacity-60" data-alt="Abstract close-up of premium Egyptian cotton sheets with dramatic moody lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSRI4FG0Ao2elQMQdSzs2xN8fkNdJDrVJNsAHlSPUpQhq7AbETi-CpUpWSwJCBg71RiHFI5UKfk-5drDQxzYUxVubEq2xbVOX_lsyCy0tsvAc2GSz4lmc3AaaeDwxpQbb070lzRaQl7GOlwHEuix1q-TdJymVbcRPVT9-4H2ux6g5VdQjPxrD4wnwBucJqXitiCUTcepwm_X6zbUchF2i1mvz2178uCje_y31SBqgRK3OEoB08dtkoRwrzWj69zH-vVuxuZ9vZ6Hrc" alt="Premium Egyptian cotton sheets"/>
            <button className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/20">
              <span className="font-headline font-bold text-lg">+14 Photos</span>
            </button>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-16">
            {/* Description Section */}
            <section>
              <div className="flex items-center gap-12 mb-8 py-8 border-y border-outline-variant/20">
                <div className="text-center">
                  <span className="block font-headline text-2xl font-bold text-on-surface">120</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Sq Meters</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline text-2xl font-bold text-on-surface">2</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Guests</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline text-2xl font-bold text-on-surface">King</span>
                  <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Bed Size</span>
                </div>
              </div>
              <h2 className="font-headline text-3xl font-bold mb-6">Experience Unparalleled Comfort</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
                Experience unparalleled comfort in this premium space. Handpicked for quality and location, this stay features top-tier amenities, modern design, and 24/7 support to ensure a seamless experience.
              </p>
            </section>

            {/* Amenities Bento Grid */}
            <section>
              <h3 className="font-headline text-2xl font-bold mb-8">Curated Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">ac_unit</span>
                  <span className="font-medium">Climate Control</span>
                </div>
                <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">wine_bar</span>
                  <span className="font-medium">Private Cellar</span>
                </div>
                <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                  <span className="font-medium">In-suite Sauna</span>
                </div>
                <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">wifi</span>
                  <span className="font-medium">Satellite Fiber</span>
                </div>
                <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">local_cafe</span>
                  <span className="font-medium">Barista Station</span>
                </div>
                <div className="p-6 rounded-xl bg-surface-container-high border border-primary/20 flex flex-col items-center justify-center text-center cursor-pointer group">
                  <span className="font-headline font-bold text-primary group-hover:underline">View All 42 Amenities</span>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline text-2xl font-bold">Guest Impressions</h3>
                <button className="text-primary font-semibold hover:underline">Write a Review</button>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-xl bg-surface-container-low border-l-2 border-primary">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                      <img data-alt="Portrait of a middle-aged man with silver hair in a dark turtleneck looking professional and serene" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa95hctU4Zek7ReYygr4B0B8fdSZMElUs5_nxHLVZlYVlesO3AW1MJxLgeY30W4Q3VKFj7EcVXz0_4yv9YR_wzFBGGqoMQGtYWBVYp7Feg7JjVqWsNtF2S_vUEb4YIAkWEDlPaiFC8ERz48Qx2FNauz4UnMExPHl8w-53JYw2_6Jj1iXN953vzKa4O8PTbFcDQKZbbdisuU5TNdPp5A0EQO-ZBm9_oRwQ7EDGC2J0ks2KWZSqo_0QPcqsYbs7_BjORpUYP_c9UBfol" alt="Julian Thorne"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Julian Thorne</h4>
                      <span className="text-xs text-on-surface-variant uppercase tracking-widest font-label">Stayed in October 2023</span>
                    </div>
                    <div className="ml-auto flex items-center text-primary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant italic leading-relaxed">
                    "The level of detail is staggering. The way the light is controlled in the suite makes it feel like you're in another world. Truly the most restorative stay I've ever had."
                  </p>
                </div>
                <div className="p-8 rounded-xl bg-surface-container-low border-l-2 border-transparent">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                      <img data-alt="Close up of a young woman laughing with soft sunset lighting hitting her face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_GFfM_gH1EV_cYwPHCCT_4UCnqHj0qkTH_a1i2kP2VayugvuoipMeqxNXNEN7gKHnHoZ5afvw0aMAAWZ-zJF10zvtvXW57a1fgBrLcAKmWXEQchnGQsS7EcmsoIkvIcFAnwkI-hs7wXN4WZUF0FCzCWzctyFrbgxL3sF3i928Rt2QMhGyA2hRdA0o7ezx2dMoc8k4xFpHn9SWZ2BVeLsPkGnwME1ikoJiYHZK3ihUgKBtcee1KVtGlvFDOELXONXtEIP_TwzlLsRh" alt="Elena Rossi"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">Elena Rossi</h4>
                      <span className="text-xs text-on-surface-variant uppercase tracking-widest font-label">Stayed in December 2023</span>
                    </div>
                    <div className="ml-auto flex items-center text-primary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant italic leading-relaxed">
                    "The concierge anticipated needs I didn't even know I had. A sanctuary of peace."
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Widget */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 p-8 rounded-2xl bg-surface-container-highest/70 backdrop-blur-xl border border-outline-variant/10 shadow-2xl shadow-black/50">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <span className="text-3xl font-headline font-extrabold text-on-surface">$850</span>
                  <span className="text-on-surface-variant text-sm"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-secondary text-sm">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <span className="font-semibold uppercase tracking-tighter">Rare Find</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20">
                  <div className="p-4 border-r border-outline-variant/20">
                    <label className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase block mb-1">Check In</label>
                    <span className="font-medium text-sm">Oct 24, 2024</span>
                  </div>
                  <div className="p-4">
                    <label className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase block mb-1">Check Out</label>
                    <span className="font-medium text-sm">Oct 28, 2024</span>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <label className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase block mb-1">Travelers</label>
                  <span className="font-medium text-sm">2 Guests</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-on-surface-variant">
                  <span>$850 x 4 nights</span>
                  <span className="text-on-surface">$3,400</span>
                </div>
                <div className="flex justify-between text-sm text-on-surface-variant">
                  <span>Service &amp; Concierge Fee</span>
                  <span className="text-on-surface">$120</span>
                </div>
                <div className="flex justify-between text-sm text-on-surface-variant">
                  <span>Nocturnal Surcharge</span>
                  <span className="text-on-surface">$45</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-headline font-bold text-xl text-primary">$3,565</span>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-on-primary font-headline font-extrabold rounded-xl hover:bg-inverse-primary hover:scale-[0.98] transition-all duration-300 shadow-xl shadow-primary/20 mb-4">
                Complete Booking
              </button>
              <button className="w-full py-3 bg-surface-container text-on-surface border border-outline-variant rounded-xl font-medium hover:bg-surface-variant transition-all">
                ← Explore About Page
              </button>
              <p className="text-center text-xs text-on-surface-variant mt-4 opacity-60">
                You won't be charged yet.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Map Section (Asymmetric) */}
      <section className="mt-20 px-4 md:px-12 max-w-7xl mx-auto mb-32">
        <h3 className="font-headline text-3xl font-bold mb-8">Location</h3>
        <div className="w-full h-96 rounded-2xl overflow-hidden grayscale contrast-125 opacity-80 border border-outline-variant/20 relative">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
            <img className="w-full h-full object-cover mix-blend-luminosity" data-alt="Dark stylized map of Reykjavik Iceland with minimalist aesthetics and purple accent points" data-location="Reykjavik, Iceland" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc0lFaAeckzcC-DCCXkuS-UATF_gcGvKS9kwuWNWcqB6eCPmXIUp5i-ndzfhI0eezDXHN-0Zk-5yjd9sBZYl9L7MYKmAWSvorzwGmtaIMDIdU_G8XVsnT8VS5lCmNOjpRSn51QVEHUThyzTT2EhEKe4zaxEbgGi4XCysVwC7lMm5zNilibikKrU4on0zpuqCDdcNMSjg6lv3JUXyAlWfITC-tSiXImNLD6RKHkcsF30u4ls5oYpOcUpONjnsPvYQaBUE_2RiU8O3iu" alt="Location Map"/>
            <div className="absolute w-6 h-6 bg-primary rounded-full animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-on-primary rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 p-4 bg-surface/80 backdrop-blur-md rounded-lg max-w-xs border border-outline-variant/30">
            <p className="font-bold text-sm mb-1">Vatnsmýri District</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">Nestled away from the urban noise, with direct views of the Perlan and the aurora dome.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 w-full border-t border-slate-800/50 font-['Inter'] leading-relaxed text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full">
          <div className="col-span-1 md:col-span-1">
            <div className="text-lg font-black text-slate-200 mb-6">BlockStay</div>
            <p className="text-slate-500 mb-6">Crafting nocturnal experiences for the world's most discerning travelers since 2024.</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">public</span>
              <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">share</span>
              <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">chat_bubble</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Featured Suites</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">The Experience</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Destinations</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">FAQ</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Careers</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Press Kit</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Concierge Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-slate-500 hover:text-cyan-400 transition-colors" href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="px-12 py-8 border-t border-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-slate-500">© 2024 BlockStay. All rights reserved.</span>
          <div className="flex gap-8 text-xs font-label uppercase tracking-widest">
            <span className="text-slate-600">Designed for Darkness</span>
            <span className="text-slate-600">Secure Protocol v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoomDetails;