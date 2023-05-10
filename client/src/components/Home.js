import React from "react";
import NewCollections from "./NewCollections";
import TopRatedProducts from "./TopRatedProducts";
import MainHome from "./MainHome";

const Home = () => {
  return (
    <>
      <MainHome />
      <div className="container">
      <TopRatedProducts />
      <NewCollections />
      </div>
    </>
  );
};

export default Home;
