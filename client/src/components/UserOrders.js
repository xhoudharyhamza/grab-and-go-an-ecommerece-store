import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Loading from "./Loading";
import Error from "./Error";
import { nullErrors } from "../utils/utils";
import moment from "moment";
import { fetchUserOrders, handelCancelOrder } from "../api/api";
const UserOrders = () => {
  let { error, dispatch, loading, user } = useContext(ProductsContext);
  let [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    fetchUserOrders(user, dispatch, setUserOrders);
    nullErrors(dispatch);
  }, [user]);
  return (
    <div>
      {loading && <Loading />}
      {error ? (
        <Error error={error} />
      ) : (
        <div className="container">
          <div className="user-orders">
            <div className="user-orders-list">
              <h2>Orders List</h2>
              {userOrders.length > 0 ? (
                userOrders.map((order, index) => {
                  return (
                    <div className="order" key={index}>
                      <h3>Order #{order._id}</h3>
                      <p>Order Place On: <strong>{moment(order.date).format("DD/MM/YYYY")}</strong> </p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img src={product.image} alt="" />
                                </td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.size}</td>
                                <td>{product.quantity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="order-shipping-address">
                        <p>
                          <span><strong>Contact,</strong></span> {order.email},{order.phone}
                        </p>
                        <p>
                          <span><strong>Ship to,</strong></span> {order.shippingAddress}
                        </p>
                      </div>
                      <div className="order-delivery">
                        <p>
                          Order Status
                          {order.orderStatus === "pending" ? (
                            <span className="badge text-bg-primary">
                              Pending
                            </span>
                          ) : order.orderStatus === "delivered" ? (
                            <span className="badge text-bg-success">
                              Delivered
                            </span>
                          ) : (
                            <span className="badge text-bg-danger">Cancel</span>
                          )}
                        </p>
                        {order.deliveryDate&&<p>Delivery Date: <strong>{moment(order.deliveryDate).format("DD/MM/YYYY")}</strong></p>}
                      </div>
                      {(new Date() - new Date(order.date)) / (1000 * 60 * 60) <
                        6 && (
                        <button
                          className="btn btn-danger"
                          disabled={order.orderStatus==="cancel"}
                          onClick={() => {
                            handelCancelOrder(order._id);
                          }}
                        >
                          Cancel Order
                        </button>
                      )}
                      <hr />
                    </div>
                  );
                })
              ) : (
                <h5>You didn't place an order yet!</h5>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
