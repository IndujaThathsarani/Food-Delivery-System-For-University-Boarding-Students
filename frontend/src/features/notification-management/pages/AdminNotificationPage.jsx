import { useEffect, useState } from "react";
import { getAllNotifications } from "../api/notificationApi";
import NotificationList from "../components/NotificationList";
import { generateNotificationReport } from "../reports/generateNotificationReport";

function AdminNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Admin Notifications</h1>
          <p className="mt-2 text-sm text-slate-200">
            Monitor all system notifications including delivery updates.
          </p>
        </div>

        {/* Info */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            All Notifications
          </h2>
          <p className="text-sm text-gray-500">
            Overview of all notifications generated in the system.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold">{notifications.length}</p>
          </div>

          <div className="rounded-xl bg-orange-50 p-4 shadow text-center">
            <p className="text-sm text-gray-500">Unread</p>
            <p className="text-xl font-bold text-orange-600">
              {notifications.filter(n => !n.isRead).length}
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-4 shadow text-center">
            <p className="text-sm text-gray-500">Read</p>
            <p className="text-xl font-bold text-green-600">
              {notifications.filter(n => n.isRead).length}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 shadow text-center">
            <p className="text-sm text-gray-500">Delivery Type</p>
            <p className="text-xl font-bold text-blue-600">
              {notifications.filter(n => n.type === "delivery").length}
            </p>
          </div>
        </div>
            <button
            onClick={() => generateNotificationReport(notifications)}
            className="mb-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
            Download Notification Report
            </button>
        {/* List */}
        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center shadow">
            Loading notifications...
          </div>
        ) : (
          <NotificationList notifications={notifications} />
        )}
      </div>
    </div>
  );
}

export default AdminNotificationPage;