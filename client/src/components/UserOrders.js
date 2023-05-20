import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Loading from "./Loading";
import Error from "./Error";
import { nullErrors } from "../utils/utils";
import moment from "moment";
import { fetchUserOrders, handelCancelOrder } from "../api/api";
import GiveRatings from "./GiveRatings";
import Rating from "./Rating"

const UserOrders = () => {
  const { error, dispatch, loading, user } = useContext(ProductsContext);
  const [userOrders, setUserOrders] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState("");
  const [userRatings, setUserRatings] = useState([])
  let fetchUserRatings = async () => {
    let res = await fetch(`/ratings/${user.email}`)
    let response = await res.json()
    if (res.status === 200) {
      let { ratings } = response
      console.log(ratings)
      setUserRatings([...ratings])
    }
  }
  let checkRating = (slug) => {
    let ratingItem = userRatings.find((item) => {
      return item.product == slug
    })
    if (ratingItem) {
      return <Rating rating={ratingItem.rate} />
    }
    else {
      return <button
        className="btn btn-secondary"
        onClick={() => handleShowRating(slug)}
      >
        Rate Product
      </button>
    }
  }
  useEffect(() => {
    fetchUserOrders(user, dispatch, setUserOrders);
    fetchUserRatings()
    nullErrors(dispatch);
  }, [user]);
  const handleShowRating = (slug) => {
    setSelectedProductSlug(slug);
    setShowRating(true);
    nullErrors(dispatch)
  };

  const handleCancelRating = () => {
    setShowRating(false);
    nullErrors(dispatch)
  };
  if (userOrders.length === 0) {
    return <p>You haven't made any orders yet!</p>;
  }

  return (
    <>
      {loading && <Loading />}
      {error && <Error error={error} />}
      <div className="container">
        <div className="user-orders">
          <div className="user-orders-list">
            <h2>Orders List</h2>
            {userOrders.map((order, index) => (
              <div className="order" key={index}>
                <h3>Order #{order._id}</h3>
                <p>
                  Order Place On:{" "}
                  <strong>{moment(order.date).format("DD/MM/YYYY")}</strong>
                </p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Size</th>
                      <th scope="col">Quantity</th>
                      {order.orderStatus === "delivered" && (
                        <th scope="col">Ratings</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <img src={product.image} alt="" />
                        </td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.size}</td>
                        <td>{product.quantity}</td>
                        {order.orderStatus === "delivered" && (
                          <td>
                            {checkRating(product.slug)}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-shipping-address">
                  <p>
                    <span>
                      <strong>Contact,</strong>
                    </span>
                    {order.email},{order.phone}
                  </p>
                  <p>
                    <span>
                      <strong>Ship to,</strong>
                    </span>
                    {order.shippingAddress}
                  </p>
                </div>
                <div className="order-delivery">
                  <p>
                    Order Status{" "}
                    {order.orderStatus === "pending" ? (
                      <span className="badge text-bg-primary">Pending</span>
                    ) : order.orderStatus === "delivered" ? (
                      <span className="badge text-bg-success">Delivered</span>
                    ) : (
                      <span className="badge text-bg-danger">Cancel</span>
                    )}
                  </p>
                  {order.deliveryDate && (
                    <p>
                      Delivery Date:{" "}
                      <strong>
                        {moment(order.deliveryDate).format("DD/MM/YYYY")}
                      </strong>
                    </p>
                  )}
                </div>
                {new Date() - new Date(order.date) / (1000 * 60 * 60) < 6 && (
                  <button
                    className="btn btn-danger"
                    disabled={order.orderStatus === "cancel"}
                    onClick={() => {
                      handelCancelOrder(order._id);
                    }}
                  >
                    Cancel Order
                  </button>
                )}
                <hr />
              </div>
            ))}
          </div>
        </div>
        {showRating && (
          <GiveRatings
            slug={selectedProductSlug}
            cancelRating={handleCancelRating}
          />
        )}
      </div>
    </>
  );
};

export default UserOrders;
