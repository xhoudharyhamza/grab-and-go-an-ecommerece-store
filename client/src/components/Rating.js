import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="rating">
      {rating <= 0.5 ? (
        <span>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : rating <= 1 ? (
        <span>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating <= 1.5 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : rating <= 2 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating <= 2.5 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : rating <= 3 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating <= 3.5 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : rating <= 4 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
      ) : rating <= 4.5 ? (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star-half-stroke"></i>
        </span>
      ) : (
        <span>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
      )}
    </div>
  );
};

export default Rating;
