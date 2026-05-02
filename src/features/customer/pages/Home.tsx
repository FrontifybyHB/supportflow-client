import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatWidget from "../components/ChatWidget";
import Footer from "../components/Footer";  
import { JSX } from "react/jsx-runtime";

const Home = (): JSX.Element => {
  return (
    <div className="bg-[#02142a] text-white min-h-screen">
      <Navbar />
      <Hero />
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default Home;