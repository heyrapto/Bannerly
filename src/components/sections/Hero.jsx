import Button from "../shared/Button";
import { Icons } from "../ui/Icons";

const FloatingIcon = ({ children, className }) => (
  <div
    className={`absolute drop-shadow-xl select-none pointer-events-none transition-transform duration-300 ${className}`}
  >
    {children}
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-start pt-20 sm:pt-24 pb-32 overflow-hidden max-w-[1440px] mx-auto w-full">
      {/* Icons */}
      <FloatingIcon className="top-[20%] left-[5%] w-14 sm:w-20 lg:w-24">
        <Icons.Logo />
      </FloatingIcon>

      <FloatingIcon className="top-[28%] left-[25%] w-12 sm:w-16 lg:w-20 rotate-[-10deg]">
        <Icons.Love />
      </FloatingIcon>

      <FloatingIcon className="bottom-[35%] left-[5%] w-24 sm:w-32 rotate-[8deg] hidden sm:block">
        <Icons.Fire />
      </FloatingIcon>

      <FloatingIcon className="bottom-[28%] left-[20%] w-16 sm:w-24 rotate-[6deg] hidden sm:block">
        <Icons.WorldEye />
      </FloatingIcon>

      <FloatingIcon className="top-[30%] right-[20%] w-24 sm:w-32 rotate-[10deg]">
        <Icons.Bear />
      </FloatingIcon>

      <FloatingIcon className="top-[20%] right-[5%] w-20 sm:w-28 rotate-[-6deg]">
        <Icons.Designer />
      </FloatingIcon>

      <FloatingIcon className="top-[45%] right-[10%] w-24 sm:w-32 rotate-[10deg] hidden sm:block">
        <Icons.Banner />
      </FloatingIcon>

      <FloatingIcon className="bottom-[10%] right-[20%] w-16 sm:w-24 rotate-[-20deg]">
        <Icons.PeaceSign />
      </FloatingIcon>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center z-10">
        <h2 className="text-gray-500 text-lg sm:text-xl tracking-wide">
          Drop Zone
        </h2>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-3">
          Sticker Kit
        </h1>

        <Button className="mt-6" size="lg">
          Get it now
        </Button>

        <div className="relative mt-12 sm:mt-16 w-[260px] sm:w-[350px] lg:w-[420px] max-w-full">
          <img
            src="/hero.png"
            alt="Sticker Kit"
            className="w-full drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
