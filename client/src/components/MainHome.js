import React from "react";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
<div className="main-home" style={{ backgroundColor: '#E4D5FF' }}>
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <div className="main-left">
          <div className="main-left-content">
            <h1 style={{ color: '#702670' }}>Grab&Go Your One-Stop Shop for All Your Needs</h1>
            <h3 style={{ color: '#444' }}>Shop the Latest Trends and Find Great Deals</h3>
            <p style={{ color: '#444' }}>Welcome to Grab and Go, your ultimate destination for all your shopping needs. From the latest fashion trends to home essentials and electronics, we've got you covered. Our curated selection of products ensures you'll find what you're looking for.</p>
            <button style={{ backgroundColor: '#702670', color: '#fff' }}>Browse Products</button>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="main-right">
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default MainHome;
