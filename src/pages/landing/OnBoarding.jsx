import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import FeaturesSection from "../../components/sections/Features";
import HeroSection from "../../components/sections/Hero";
import MissionSection from "../../components/sections/Mission";
import ReactLenis from "lenis/react"

const OnBoarding = () => {
  return (
    <ReactLenis root className="flex flex-col gap-10">
      <Navbar btnText={"Open Editor"} href={"/editor"} />
      <HeroSection />
      <FeaturesSection />
      <MissionSection />
      <Footer />
    </ReactLenis>
  );
};

export default OnBoarding;