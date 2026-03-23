
import React from "react";
import AdminOrders from "./features/order-managemnt/pages/AdminOrders";
import "./App.css";

function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminOrders />
    </div>
  );
}

export default AdminApp;