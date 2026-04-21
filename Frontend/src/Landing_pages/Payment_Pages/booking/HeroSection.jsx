export default function HeroSection() {
  return (
    <section className="relative h-[650px] flex items-center justify-center">
      <img
        src="YOUR_IMAGE"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      <div className="relative text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
          Your journey begins.
        </h1>
        <p className="text-lg text-gray-300">
          The stars have aligned for your upcoming stay.
        </p>
      </div>
    </section>
  );
}