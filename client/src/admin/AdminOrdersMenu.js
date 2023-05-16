import React from "react";

const AdminOrdersMenu = ({ activeLink, setActiveLink }) => {
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="orders-container">
      <ul className="orders-list">
        <li
          className={`orders-list-item ${activeLink === "all" ? "active" : ""}`}
          onClick={() => handleLinkClick("all")}
        >
          All Orders
        </li>
        <li
          className={`orders-list-item ${
            activeLink === "delivered" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("delivered")}
        >
          Delivered Orders
        </li>
        <li
          className={`orders-list-item ${
            activeLink === "pending" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("pending")}
        >
          Pending Orders
        </li>
        <li
          className={`orders-list-item ${
            activeLink === "cancelled" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("cancel")}
        >
          Cancelled Orders
        </li>
      </ul>
    </div>
  );
};

export default AdminOrdersMenu;
