import HeroSection from "../../components/HeroSection/HeroSection";
import Navbar from "../../components/Navbar/Navbar";
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