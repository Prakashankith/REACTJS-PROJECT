import React from "react";
import HeroBanner from "../Components/Herobanner";
import MultiBanner from "../Components/Multibanner";
import NewCollection from "../Components/NewCollection";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <MultiBanner />
      <NewCollection />
    </>
  );
};

export default Home;
