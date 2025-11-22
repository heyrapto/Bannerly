const FeatureCard = ({ className = "", children }) => (
    <div className={`rounded-3xl p-8 h-full flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );
  
  const FeaturesSection = () => {
    const cards = [
      {
        id: 1,
        className: "bg-[#C8B8A6]",
        content: (
          <>
            <div className="text-left">
              <h2 className="text-3xl font-semibold mb-6">What’s in the Box</h2>
              <ul className="space-y-3 text-lg">
                {[
                  "16+ Crafted pieces",
                  "Designer’s tear (of joy)",
                  "Creative energy",
                  "Lots of good vibes",
                ].map((item, i) => (
                  <li key={i}>✔️ {item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 w-full flex justify-center">
              <img
                src="/mnt/data/Image 21-11-2025 at 22.23.png"
                alt="Stickers"
                className="w-[90%] rounded-xl"
              />
            </div>
          </>
        ),
      },
  
      {
        id: 2,
        className: "bg-[#EB4C70] text-left",
        content: (
          <>
            <div>
              <h2 className="text-3xl font-semibold mb-4">Stick with meaning</h2>
              <p className="text-sm leading-relaxed text-white/90 max-w-xs">
                We made stickers that stick with you (literally). After all, great design deserves to go wherever you do.
              </p>
            </div>
            <div className="w-full flex justify-end">
              <div className="w-40 h-28 bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-black text-4xl"></span>
              </div>
            </div>
          </>
        ),
        group: "middle",
      },
  
      {
        id: 3,
        className: "bg-[#D8E7FA] text-left",
        content: (
          <>
            <h2 className="text-3xl font-semibold mb-3">Designed for humans</h2>
            <p className="text-sm text-neutral-800 leading-relaxed max-w-md">
              We’re a UX/UI studio with a tight-knit team of designers, thinkers, and makers crafting digital experiences people actually enjoy.
            </p>
          </>
        ),
        group: "middle",
      },
  
      {
        id: 4,
        className: "bg-[#DDF9C8] text-left",
        content: (
          <>
            <div>
              <h2 className="text-3xl font-semibold mb-2">Water resistance.</h2>
              <h2 className="text-3xl font-semibold mb-4">Bad vibes proof.</h2>
            </div>
            <div className="text-5xl tracking-widest">⌐■_■</div>
          </>
        ),
        group: "right",
      },
    ];
  
    return (
      <section className="w-screen bg-neutral-200">
        <div className="max-w-[1440px] mx-auto flex flex-col text-center px-6 py-20 gap-12">
          <h1 className="text-2xl">Hangout with us</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Left Column - Full Height */}
          <div className="md:row-span-2">
            {cards
              .filter((c) => c.id === 1)
              .map((card) => (
                <FeatureCard key={card.id} className={card.className}>
                  {card.content}
                </FeatureCard>
              ))}
          </div>

          {/* Top Middle */}
          {cards
            .filter((c) => c.id === 2)
            .map((card) => (
              <FeatureCard key={card.id} className={card.className}>
                {card.content}
              </FeatureCard>
            ))}

          {/* Top Right */}
          {cards
            .filter((c) => c.id === 4)
            .map((card) => (
              <FeatureCard key={card.id} className={card.className}>
                {card.content}
              </FeatureCard>
            ))}

          {/* Bottom Right - Spans 2 columns */}
          <div className="md:col-span-2">
            {cards
              .filter((c) => c.id === 3)
              .map((card) => (
                <FeatureCard key={card.id} className={card.className}>
                  {card.content}
                </FeatureCard>
              ))}
          </div>
        </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  