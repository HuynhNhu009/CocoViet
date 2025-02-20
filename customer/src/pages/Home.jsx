import React from "react";
import Hero from "../components/Home/Hero";
import { assets } from "../assets/assets";
import LatestCollection from "../components/LatestCollection";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <div className="py-5 font-medium px-4 sm:px-[5vw] lg:px-[7vw] h-[830px]">
        HELOO
      </div>
    </div>
  );
};

export default Home;
