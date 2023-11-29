import { Toaster } from "sonner";
import { HeroSection } from "../components/Homepage/HeroSection.jsx";
import { LatestProductsSection } from "../components/Homepage/LatestProductsSection.jsx";

function Home() {
  return (
    <div className="homepage">
      <HeroSection />
      <LatestProductsSection />
    </div>
  );
}

export default Home;
