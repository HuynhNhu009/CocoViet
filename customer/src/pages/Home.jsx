import React from "react";
import Hero from "../components/Home/Hero";
import LatestCollection from "../components/LatestCollection";
import HomeAbout from "../components/Home/HomeAbout";
import HomeBlog from "../components/Home/HomeBlog";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />

      <HomeAbout />
      <HomeBlog />
      {/* <div className="py-5 font-medium px-4 sm:px-[5vw] lg:px-[7vw] h-[830px]">
        HELOO
      </div> */}
    </div>
  );
};

export default Home;
