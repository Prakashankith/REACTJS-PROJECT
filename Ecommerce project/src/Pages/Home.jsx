import React from "react";
import HeroBanner from "../Components/Herobanner";
import MultiBanner from "../Components/Multibanner";
import NewCollection from "../Components/NewCollection";
import MidBanner from "../Components/MidBanner";
import TopSellers from "../Components/TopSellers";
import Features from "../Components/Features";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <MultiBanner />
      <NewCollection />
      <MidBanner />
      <TopSellers />
      <Features />
    </>
  );
};

export default Home;
