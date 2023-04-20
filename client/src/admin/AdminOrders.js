import React, { useEffect, useState, useContext } from "react";
import { fetchAllOrders } from "../api/api";
import { ProductsContext } from "../store/Store";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { nullErrors } from "../utils/utils";
import moment from "moment";
const AdminOrders = () => {
  let { loading, dispatch } = useContext(ProductsContext);
  let [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchAllOrders(setOrders, dispatch);
    nullErrors(dispatch);
  }, []);

  return (
    <div className="">
      <div className="admin-orders main-div">
        <div className="center-div">
          <div className="admin-orders-body">
            {loading ? (
              <Loading />
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Transaction Id</th>
                      <th scope="col">Products</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Shipping Address</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Status</th>
                      <th scope="col">Delivery Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      return (
                        <tr key={index}>
                          <td>{moment(order.date).format("DD/MM/YYYY")}</td>
                          <td>{order.transactionId}</td>
                          <td>
                            <table className="table">
                              <thead>
                                <tr>
                                  <td>Title</td>
                                  <td>Image</td>
                                  <td>Quantity</td>
                                  <td>Price</td>
                                  <td>Size</td>
                                </tr>
                              </thead>
                              <tbody>
                                {order.products.map((product, ind) => {
                                  return (
                                    <tr key={ind}>
                                      <td>{product.title}</td>
                                      <td>
                                        <img src={product.image} />
                                      </td>
                                      <td>{product.quantity}</td>
                                      <td>${product.price}</td>
                                      <td>{product.size}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </td>
                          <td>{order.userEmail}</td>
                          <td>${order.totalAmount}</td>
                          <td>{order.shippingAddress}</td>
                          <td>{`${order.email}, ${order.phone}`}</td>
                          <td>
                            {order.orderStatus === "pending" ? (
                              <span className="badge text-bg-primary">
                                Pending
                              </span>
                            ) : order.orderStatus === "delivered" ? (
                              <span className="badge text-bg-success">
                                Delivered
                              </span>
                            ) : (
                              <span className="badge text-bg-danger">
                                Cancel
                              </span>
                            )}
                          </td>
                          <td>
                            {moment(order.deliveryDate).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            <Link to={`/admin/dashboard/orders/${order._id}`}>
                              <i className="fa-solid fa-pen-to-square edit-btn text-primary"></i>
                            </Link>
                            {/* <i className="fa-solid fa-trash delete-product-btn text-danger"></i> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
