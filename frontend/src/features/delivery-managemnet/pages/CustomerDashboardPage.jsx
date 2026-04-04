import { useEffect, useMemo, useState } from "react";
import { getAllDeliveries } from "../api/deliveryApi";
import { getUserNotifications } from "../../notification-management/api/notificationApi";
import DeliveryStatusBadge from "../components/DeliveryStatusBadge";
import LiveMap from "../../../components/LiveMap";

function CustomerDashboardPage() {
  const userId = "USER001";

  const parseCoords = (location) => {
    if (!location) return null;

    const lat = Number(location.lat);
    const lng = Number(location.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return null;
    }

    return [lat, lng];
  };

  const [deliveries, setDeliveries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const deliveriesPerPage = 5;

  const fetchDeliveries = async () => {
    try {
      const deliveryRes = await getAllDeliveries();
      const allDeliveries = Array.isArray(deliveryRes.data) ? deliveryRes.data : [];

      const userDeliveries = allDeliveries
        .filter((delivery) => delivery.studentId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setDeliveries(userDeliveries);
    } catch (error) {
      console.error("Failed to load deliveries:", error);
      setDeliveries([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const notificationRes = await getUserNotifications(userId);
      const userNotifications = Array.isArray(notificationRes.data)
        ? notificationRes.data
        : [];

      const sortedNotifications = [...userNotifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Failed to load notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await Promise.all([fetchDeliveries(), fetchNotifications()]);
      setLoading(false);
    };

    initialLoad();

    const interval = setInterval(() => {
      fetchNotifications();
      fetchDeliveries();
    }, 5000);

    const onNotificationsUpdated = () => fetchNotifications();
    window.addEventListener("notificationsUpdated", onNotificationsUpdated);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notificationsUpdated", onNotificationsUpdated);
    };
  }, []);

  const totalPages = Math.ceil(deliveries.length / deliveriesPerPage) || 1;

  const paginatedDeliveries = useMemo(() => {
    const startIndex = (currentPage - 1) * deliveriesPerPage;
    return deliveries.slice(startIndex, startIndex + deliveriesPerPage);
  }, [deliveries, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 text-black shadow-sm">
          Loading customer dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 text-black">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="mt-2 text-sm text-orange-100">
            Track your deliveries and recent updates in one place.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">My Deliveries</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{deliveries.length}</p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active Deliveries</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">
              {deliveries.filter((d) =>
                ["Assigned", "Picked Up", "On the Way"].includes(d.status)
              ).length}
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unread Notifications</p>
            <p className="mt-2 text-3xl font-bold text-orange-700">{unreadCount}</p>
          </div>
        </div>

        {/* DELIVERY LIST */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Deliveries</h2>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {paginatedDeliveries.map((delivery) => {
              const isActive = ["Assigned", "Picked Up", "On the Way"].includes(delivery.status);

              // 🔥 Extract coordinates safely
              const pickupCoords = parseCoords(delivery.pickupLocation);
              const destinationCoords = parseCoords(delivery.deliveryLocation);
              const riderCoords = parseCoords(delivery.riderLocation)
                || (Number.isFinite(Number(delivery.latitude))
                  && Number.isFinite(Number(delivery.longitude))
                  ? [Number(delivery.latitude), Number(delivery.longitude)]
                  : pickupCoords);

              return (
                <div key={delivery._id} className="rounded-2xl border p-6 shadow-sm">
                  <h2 className="text-xl font-bold">
                    Order ID: {delivery.orderId}
                  </h2>

                  <DeliveryStatusBadge status={delivery.status} />

                  {/* 🔥 MAP */}
                  {isActive && (
                    <div className="mt-4">
                      <LiveMap
                        pickup={pickupCoords}
                        destination={destinationCoords}
                        rider={riderCoords}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboardPage;