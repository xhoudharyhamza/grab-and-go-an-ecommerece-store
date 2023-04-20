import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../store/Store";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { nullErrors } from "../utils/utils";
import { fetchOrderDetails } from "../api/api";
import moment from "moment";
const AdminUpdateOrder = () => {
  let { _id } = useParams();
  let navigate = useNavigate();
  let { error, dispatch, loading } = useContext(ProductsContext);
  let [orderDetails, setOrderDetails] = useState({
    userEmail: "",
    date: "",
    orderStatus: "",
    totalAmount: 0,
    deliveryDate: "",
  });
  let changeHandler = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };
  let updateOrder = async (e) => {
    e.preventDefault();
    try {
      let { userEmail, date, deliveryDate, orderStatus, totalAmount } =
        orderDetails;
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch(`/orders/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          date,
          deliveryDate,
          orderStatus,
          totalAmount,
        }),
      });
      let response = await res.json();
      if (res.status === 200) {
        navigate("/admin/dashboard/orders");
      } else {
        let { error } = response;
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
        dispatch({ type: "SET_ERROR", payload: { error } });
      }
    } catch (error) {
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      dispatch({ type: "SET_ERROR", payload: { error:error.message } });
    }
  };
  useEffect(() => {
    fetchOrderDetails(_id, dispatch, setOrderDetails);
    nullErrors(dispatch);
  }, [_id]);
  return (
    <div className="container">
      <div className="update-order">
        <div className="update-order-form">
          <h2>Update Order</h2>
          {error && <Error error={error} />}
          {loading && <Loading />}
          <form onSubmit={updateOrder}>
            <div className="form-group">
              <label htmlFor="update-order-title">Customer</label>
              <input
                type="text"
                className="form-control update-order-customer"
                id="update-order-customer"
                placeholder="Customer"
                required
                name="customer"
                readOnly
                value={orderDetails.userEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-order-date">Order Date</label>
              <input
                type="text"
                className="form-control update-order-date"
                id="update-order-date"
                required
                name="date"
                readOnly
                value={moment(orderDetails.date).format("MM/DD/YYYY")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-order-delivered-date">
                Order Delivered Date
              </label>
              <input
                type="date"
                className="form-control update-order--delivered-date"
                id="update-order-date"
                required
                name="deliveryDate"
                value={orderDetails.deliveryDate}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="update-order-price">Order Amount</label>
              <input
                type="number"
                className="form-control update-order-amount"
                id="update-order-amount"
                placeholder="Total Amount"
                required
                readOnly
                name="totalAmount"
                value={orderDetails.totalAmount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-status">Order Status</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderStatus"
                  value="delivered"
                  id="delivered-status"
                  checked={orderDetails.orderStatus === "delivered"}
                  onChange={changeHandler}
                />
                <label className="form-check-label" htmlFor="delivered-status">
                  Delivered
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderStatus"
                  value="pending"
                  id="pending-status"
                  checked={orderDetails.orderStatus === "pending"}
                  onChange={changeHandler}
                />
                <label className="form-check-label" htmlFor="pending-status">
                  Not Delivered
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="orderStatus"
                  value="cancel"
                  onChange={changeHandler}
                  checked={orderDetails.orderStatus === "cancel"}
                  id="cancel-status"
                />
                <label className="form-check-label" htmlFor="cancel-status">
                  Cancel
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading === true}
            >
              Update Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateOrder;
