import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { ProductsContext } from "../store/Store";
import { nullErrors } from "../utils/utils";
import moment from "moment";
const AdminLastOneMonthOrders = () => {
  let [lastMonthOrders, setLastMonthOrders] = useState([]);
  let { dispatch, error, loading } = useContext(ProductsContext);
  let fetchLastMonthOrder = async () => {
    try {
      dispatch({ type: "DATA_LOADING", payload: { loading: true } });
      let res = await fetch("/order/lastmonth");
      let response = await res.json();
      if (res.status === 200) {
        let { orders } = response;
        setLastMonthOrders(orders);
        console.log(orders);
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      } else {
        let { error } = response;
        dispatch({ type: "SET_ERROR", payload: { error } });
        dispatch({ type: "DATA_LOADING", payload: { loading: false } });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: { error } });
      dispatch({ type: "DATA_LOADING", payload: { loading: false } });
    }
  };
  useEffect(() => {
    fetchLastMonthOrder();
    nullErrors(dispatch);
  }, []);
  return (
    <div className="last-month-orders">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3>Recent Orders</h3>
          {error && <Error error={error} />}
          <div className="last-month-orders-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th>Transaction Id</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {lastMonthOrders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{moment(order.date).format("DD/MM/YYYY")}</td>
                      <td>{order.transactionId}</td>
                      <td>{order.userEmail}</td>
                      <td>${order.totalAmount}</td>
                      <td>
                        {order.orderStatus === "pending" ? (
                          <span className="badge text-bg-primary">
                            Not Delivered
                          </span>
                        ) : order.orderStatus === "delivered" ? (
                          <span className="badge text-bg-success">
                            Delivered
                          </span>
                        ) : (
                          <span className="badge text-bg-danger">Cancel</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLastOneMonthOrders;
