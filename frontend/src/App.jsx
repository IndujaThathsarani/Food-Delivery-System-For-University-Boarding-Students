import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Admin
import AdminDeliveryPage from "./features/delivery-managemnet/pages/AdminDeliveryPage";
import AdminNotificationPage from "./features/notification-management/pages/AdminNotificationPage";

// Rider
import RiderDashboardPage from "./features/delivery-managemnet/pages/RiderDashboardPage";
import RiderAssignedDeliveriesPage from "./features/delivery-managemnet/pages/RiderAssignedDeliveriesPage";

// Customer
import CustomerDeliveryPage from "./features/delivery-managemnet/pages/CustomerDeliveryPage";
import CustomerNotificationPage from "./features/notification-management/pages/CustomerNotificationPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Admin */}
        <Route path="/admin/deliveries" element={<AdminDeliveryPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationPage />} />

        {/* Rider */}
        <Route path="/rider/dashboard" element={<RiderDashboardPage />} />
        <Route path="/rider/deliveries" element={<RiderAssignedDeliveriesPage />} />

        {/* Customer */}
        <Route path="/customer/delivery" element={<CustomerDeliveryPage />} />
        <Route path="/customer/notifications" element={<CustomerNotificationPage />} />

        {/* Default */}
        <Route path="/" element={<AdminDeliveryPage />} />
      </Routes>
    </div>
  );
}

export default App;