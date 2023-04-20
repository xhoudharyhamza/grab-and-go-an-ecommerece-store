import React, { useContext } from "react";
import { ProductsContext } from "../store/Store";
const Error = () => {
    let {error}= useContext(ProductsContext)
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};

export default Error;
