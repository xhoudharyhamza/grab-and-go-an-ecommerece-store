import React from 'react';
import {Link} from "react-router-dom"
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Page not found.</p>
      <Link to={"/"} className="not-found-link">Go back to homepage</Link>
    </div>
  );
};

export default NotFoundPage;
