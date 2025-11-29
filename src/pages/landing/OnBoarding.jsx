import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import FeaturesSection from "../../components/sections/Features";
import HeroSection from "../../components/sections/Hero";
import MissionSection from "../../components/sections/Mission";

const OnBoarding = () => {
  return (
    <main className="flex flex-col gap-10">
      <Navbar btnText={"Get Started"} href={"/editor"} />
      <HeroSection />
      <FeaturesSection />
      <MissionSection />
      <Footer />
    </main>
  );
};

export default OnBoarding;