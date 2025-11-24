import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaGolang } from "react-icons/fa6";

const FeatureCard = ({ className = "", children }) => (
    <div className={`rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden relative ${className}`}>
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
            <div className="text-left text-neutral-800">
              <h2 className="text-3xl font-semibold mb-6">What’s in the Box</h2>
              <ul className="space-y-3 text-lg">
                {[
                  "100+ banners created",
                  "Designer’s tear (of joy)",
                  "Creative energy",
                  "Lots of template Options",
                ].map((item, i) => (
                  <li key={i}>✔️ {item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 w-full flex justify-center">
              <img
                src="/images/cool.webp"
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
          <div className="md:h-full h-[400px]">
            <div className="relative overflow-hidden">
              <h2 className="text-3xl font-medium mb-4 text-white/90">Quick Generation</h2>
              <p className="text-sm leading-relaxed text-white/90 max-w-xs">
              Create professional banners in seconds with our streamlined design process and templates.
              </p>
            </div>
            <div className="w-full flex justify-end lg:mt-0 mt-10">
              <div className="w-[400px] h-[200px] bg-gray-300 rounded-2xl flex items-center justify-center -bottom-16 -right-20 lg:absolute static">
                <span className="text-black text-4xl"></span>
              </div>
            </div>
          </div>
        ),
        group: "middle",
      },
      {
        id: 3,
        className: "bg-[#D8E7FA] text-left",
        content: (
          <div className="mt-auto relative md:h-full h-[450px]">
            <h2 className="text-4xl font-medium mb-3 max-w-[15rem] text-blue-900">Social Integration</h2>
            <p className="text-sm text-blue-900 leading-relaxed max-w-md">
            Seamlessly connect your social profiles to import data and share your new banner with your network.
            </p>
            <div className="absolute right-0 bottom-5">
                <img src="/images/socials.webp" className="lg:w-[350px] w-[200px]" alt="" />
            </div>
          </div>
        ),
        group: "middle",
      },
      {
        id: 4,
        className: "bg-[#DDF9C8] text-left",
        content: (
          <>
            <div className="text-yellow-900">
              <h2 className="text-3xl font-medium ">Skills showcase.</h2>
              <h2 className="text-3xl font-medium mb-4">Showcase your expertise.</h2>
            </div>
            <div className="text-5xl tracking-widest flex gap-2">
                <FaReact size={50} className="text-blue-500" />
                <IoLogoJavascript size={50} className="text-yellow-500" />
                <FaGolang size={50} className="text-blue-900" />
            </div>
          </>
        ),
        group: "right",
      },
    ];
  
    return (
      <section className="w-screen bg-neutral-200 z-10">
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
  