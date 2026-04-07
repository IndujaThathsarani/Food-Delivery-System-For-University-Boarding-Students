import React from "react";
import AdminOrders from "./features/order-managemnt/pages/AdminOrders";
import AdminGroupOrders from "./features/order-managemnt/pages/AdminGroupOrders";
import "./App.css";

function AdminApp() {
  return (
    <div className="uni-theme min-h-screen p-6 space-y-6">
      <AdminOrders />
      <AdminGroupOrders />
    </div>
  );
}

export default AdminApp;