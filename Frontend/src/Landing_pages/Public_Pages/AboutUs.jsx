import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30">



      <main>

        {/* Hero Section */}
        <section className="relative h-[819px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNpp8_OWMK6IcFdvFDhPj1Fy-Sf0sgncumE1O8dhVy3wXTnllhxR8fR-9O40wZo9p0gSI8kxq2-5taiyyzTxYMO73dD5nydHv5t23AMRHxOF5e3d2g75yCfM5JKcJ_H6s2gQV8uCFVRtYTOAaI8tf6yUgGLaF3rMoLT_impQF_jWt96RZepTUNf-lHM9s7x2tHXb1pHh0HELo6iTu_KlQjvu10hBGQNy4grIyDY1plBeVC6dv4Oksmxp2fOLvaITsM08WoTCnf-Mkt"
              className="w-full h-full object-cover brightness-50"
              alt="hotel"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
          </div>

          <div className="relative text-center px-4 max-w-4xl">
            <span className="text-secondary tracking-[0.2em] uppercase text-xs mb-6 block">
              Our Story
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface mb-8">
              Redefining the Way{" "}
              <span className="text-primary">You Stay</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              Founded with the vision of making long-term rentals and short-term stays effortless, Blockstay has evolved into a global network.
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto grid md:grid-cols-12 gap-8">
          
          <div className="md:col-span-7 bg-surface-container-low p-12 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">
              The Origin of Blockstay
            </h2>
            <p className="text-on-surface-variant mb-6">
              Blockstay is your premier destination for exceptional living spaces. From boutique apartments to flexible coliving PG rentals, we connect travelers and professionals with trusted, high-quality stays across the globe.
            </p>
            <p className="text-on-surface-variant">
              We verify every listing to ensure our guests experience the highest standards of comfort, security, and design.
            </p>
          </div>

          <div className="md:col-span-5 overflow-hidden rounded-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9zCm8PZjMkuPRCB04v2qxguMgnS4fFWBSt_3rJCIqlHQtXwyKSIsiopitha4fPGPt1SPihIs95iAAoAlqRdokheHwyqLGrDLqsakza7xJlr9E4201vHCyBBKOfvshER3Y-KjXm0O8LJrDb-pegmzHMcb_51MwGhGgDrCShBEBWSbGsfk6TG7cNBQPuK44GEi_dctQigkMQ4yOAiUBppPcxleyaADOIGGG2MR1duP26mocODkfgShGMb_f3mdDU-tLHaAbkZUh3x0D"
              className="w-full h-full object-cover"
              alt="lounge"
            />
          </div>

        </section>

        {/* Values */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-extrabold mb-4">
              Our Core Principles
            </h2>
            <p className="text-on-surface-variant mb-16">
              Secure, seamless, and designed for your lifestyle.
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-xl font-bold">Verified Trust</h4>
                <p className="text-sm text-on-surface-variant">
                  Every property is vetted for comfort and security.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold">Modern Comfort</h4>
                <p className="text-sm text-on-surface-variant">
                  Designed for the contemporary traveler and professional.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold">Global Presence</h4>
                <p className="text-sm text-on-surface-variant">
                  Find your perfect space, anywhere you go.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to explore?
          </h2>
          <button className="bg-primary px-8 py-3 rounded-md font-bold">
            Explore Rooms
          </button>
        </section>

      </main>



    </div>
  );
};

export default AboutUs;