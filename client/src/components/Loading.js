import React from "react";
import loader from "../images/loading.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loading;
