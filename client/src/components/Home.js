import React from "react";
import NewCollections from "./NewCollections";
import TopRatedProducts from "./TopRatedProducts";

const Home = () => {
  return (
    <>
      <TopRatedProducts />
      <NewCollections />
    </>
  );
};

export default Home;
