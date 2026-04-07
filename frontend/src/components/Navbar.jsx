import { NavLink, useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const location = useLocation();

  let role = "customer";
  let userId = "USER001";

  if (location.pathname.startsWith("/admin")) {
    role = "admin";
    userId = "";
  } else if (location.pathname.startsWith("/rider")) {
    role = "rider";
    userId = "RIDER001";
  } else if (location.pathname.startsWith("/customer")) {
    role = "customer";
    userId = "USER001";
  }

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2.5 text-sm transition ${
      isActive
        ? "bg-emerald-700 font-semibold text-white shadow"
        : "text-emerald-900 hover:bg-emerald-100"
    }`;

  return (
    <div className="mx-auto mb-4 mt-5 w-full max-w-[1600px] px-4 md:px-8">
      <div className="uni-panel flex flex-col gap-3 rounded-2xl px-5 py-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-lg font-bold text-emerald-900">Food Delivery System</h1>

        <div className="flex items-center gap-2 text-sm">
          <NavLink to="/admin/deliveries" className={navClass}>
            Admin Deliveries
          </NavLink>

          <NavLink to="/admin/notifications" className={navClass}>
            Admin Notifications
          </NavLink>

          <NotificationBell role={role} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;