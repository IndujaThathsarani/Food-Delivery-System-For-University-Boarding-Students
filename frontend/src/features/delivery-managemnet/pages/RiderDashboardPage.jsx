import { useEffect, useState } from "react";
import { getRiderStats } from "../api/deliveryApi";

function RiderDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const riderId = "RIDER001";

  const fetchStats = async () => {
    try {
      const res = await getRiderStats(riderId);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch rider stats:", error);
      alert("Failed to load rider dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow">
          Loading rider dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Rider Dashboard</h1>
          <p className="mt-2 text-sm text-emerald-50">
            Monitor assigned deliveries, active tasks, and delivery performance.
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Rider Summary
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of current workload and performance for {stats?.riderId}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Assigned</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats?.totalAssigned || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="mt-2 text-3xl font-bold text-yellow-700">
              {stats?.active || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {stats?.delivered || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="mt-2 text-3xl font-bold text-red-700">
              {stats?.cancelled || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Avg. Delivery Time</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">
              {stats?.averageDeliveryTime || 0} min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboardPage;