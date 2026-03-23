import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Food Delivery System</h1>

        <div className="flex gap-4 text-sm">
          {/* Admin */}
          <Link to="/admin/deliveries" className="hover:text-orange-400">
            Admin Deliveries
          </Link>
          <Link to="/admin/notifications" className="hover:text-orange-400">
            Admin Notifications
          </Link>

          {/* Rider */}
          <Link to="/rider/dashboard" className="hover:text-emerald-400">
            Rider Dashboard
          </Link>
          <Link to="/rider/deliveries" className="hover:text-emerald-400">
            Rider Deliveries
          </Link>

          {/* Customer */}
          <Link to="/customer/delivery" className="hover:text-blue-400">
            Customer Delivery
          </Link>
          <Link to="/customer/notifications" className="hover:text-blue-400">
            Customer Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;