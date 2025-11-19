
import HeroSection from "../../components/Landing-Page-Components/HeroSection/HeroSection";
import Navbar from "../../components/Landing-Page-Components/Navbar/Navbar";
const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">

      {/* NAVBAR */}
      <Navbar/>

      {/* HERO-SECTION */}
      <HeroSection/>

      
    </div>
  )
}

export default HomePage