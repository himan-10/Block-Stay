const Hero = () => {
  return (
    <section className="pt-24 min-h-screen flex items-center px-8 md:px-16 relative text-white">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfBiJklBE7AIPJZ3ckRWUway8Mj6XrP1lhB1vqMaqwVXZSpK0U_khaILtN3K68dJWS4Szlk72azTZP61xj6IvDUAuWWyPuaBYHCi0zyabOiq3LQLg3G1wj6RvGEpNZPa5ivh2SVmA63Z98VCu77iKMHKQFMOVsBGMVMKCglt_POL-NFXgp32SMoV3gcwvkdxmZAD_uoAExc9rlc94RDFgia1nS6-Yes5C6R2tD1Qw80F1ju2Mal1THo1Y1m0K-_PdSKzHbdsP6giTe"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        alt=""
      />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          The Night is <br />
          <span className="text-cyan-400">Yours to Own</span>
        </h1>

        <div className="bg-slate-800/70 p-4 rounded-xl flex flex-col md:flex-row gap-4">
          <input placeholder="Location" className="bg-transparent outline-none px-4 py-2"/>
          <input placeholder="Dates" className="bg-transparent outline-none px-4 py-2"/>
          <input placeholder="Guests" className="bg-transparent outline-none px-4 py-2"/>
          <button className="bg-violet-600 px-6 py-2 rounded-md">Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;