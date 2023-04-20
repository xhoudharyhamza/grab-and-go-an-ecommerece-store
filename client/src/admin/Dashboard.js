import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import DashboardAnalytic from "./DashboardAnalytic";
import { fetchDashboardAnalytics } from "../api/api";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { nullErrors } from "../utils/utils";
import DashboardPageTitle from "./DashboardPageTitle";
import AdminLastOneMonthOrders from "./AdminLastOneMonthOrders";
const Dashboard = () => {
  let { error, loading, dispatch } = useContext(ProductsContext);
  let [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    totalEarnings: 0,
    canceledOrders:0,
  });
  useEffect(() => {
    fetchDashboardAnalytics(dispatch, setDashboardData);
    nullErrors(dispatch);
  }, []);
  return (
    <div className="dashboard">
      <DashboardPageTitle title="Dashboard"/>
      <div className="dashboard-analytics">
        {error && <Error error={error} />}
        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            <DashboardAnalytic
              title="Total Users"
              background="#65A900"
              analytic={dashboardData.totalUsers}
            />
            <DashboardAnalytic
              title="Total Products"
              background="#F47E12"
              analytic={dashboardData.totalProducts}
            />
            <DashboardAnalytic
              title="Total Categories"
              background="#3176B1"
              analytic={dashboardData.totalCategories}
            />
            <DashboardAnalytic
              title="Total Orders"
              background="#1CD091"
              analytic={dashboardData.totalOrders}
            />
            <DashboardAnalytic
              title="Cancel Orders"
              background="#F70000"
              analytic={dashboardData.canceledOrders}
            />
            <DashboardAnalytic
              title="Delivered Orders"
              background="#f1c40f"
              analytic={`${dashboardData.deliveredOrders}`}
            />
            <DashboardAnalytic
              title="Total Earnings"
              background="#75357A"
              analytic={`$${dashboardData.totalEarnings}`}
            />
          </div>
        )}
      </div>
      <AdminLastOneMonthOrders/>
    </div>
  );
};

export default Dashboard;
