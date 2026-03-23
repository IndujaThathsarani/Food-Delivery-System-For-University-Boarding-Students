import { useEffect, useState } from "react";
import {
  getDeliveriesByRider,
  updateDeliveryLocation,
  updateDeliveryStatus,
} from "../api/deliveryApi";
import DeliveryStatusBadge from "../components/DeliveryStatusBadge";

function RiderAssignedDeliveriesPage() {
  const riderId = "RIDER001";
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationInputs, setLocationInputs] = useState({});

  const fetchDeliveries = async () => {
    try {
      const res = await getDeliveriesByRider(riderId);
      setDeliveries(res.data);
    } catch (error) {
      console.error("Failed to fetch rider deliveries:", error);
      alert("Failed to load assigned deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleStatusChange = async (deliveryId, status, studentId) => {
    try {
      await updateDeliveryStatus(deliveryId, {
        status,
        userId: studentId || "",
      });
      fetchDeliveries();
    } catch (error) {
      console.error("Failed to update delivery status:", error);
      alert("Failed to update delivery status");
    }
  };

  const handleLocationChange = (deliveryId, value) => {
    setLocationInputs((prev) => ({
      ...prev,
      [deliveryId]: value,
    }));
  };

  const handleLocationUpdate = async (deliveryId) => {
    try {
      await updateDeliveryLocation(deliveryId, {
        currentLocation: locationInputs[deliveryId] || "",
      });
      fetchDeliveries();
    } catch (error) {
      console.error("Failed to update location:", error);
      alert("Failed to update delivery location");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Assigned Deliveries</h1>
          <p className="mt-2 text-sm text-emerald-50">
            View your assigned orders, update delivery progress, and manage location updates.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Loading assigned deliveries...
          </div>
        ) : deliveries.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm text-gray-500">
            No deliveries assigned to this rider.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {deliveries.map((delivery) => (
              <div
                key={delivery._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Order ID: {delivery.orderId}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Student ID: {delivery.studentId || "Not available"}
                    </p>
                  </div>
                  <DeliveryStatusBadge status={delivery.status} />
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2">
                  <p>
                    <span className="font-semibold text-gray-900">Rider:</span>{" "}
                    {delivery.deliveryPersonName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Phone:</span>{" "}
                    {delivery.deliveryPersonPhone}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Current Location:</span>{" "}
                    {delivery.currentLocation}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">ETA:</span>{" "}
                    {delivery.estimatedDeliveryTime
                      ? new Date(delivery.estimatedDeliveryTime).toLocaleString()
                      : "Not available"}
                  </p>
                  <p className="md:col-span-2">
                    <span className="font-semibold text-gray-900">Notes:</span>{" "}
                    {delivery.notes || "No notes"}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Update Status
                    </label>
                    <select
                      defaultValue=""
                      onChange={(e) =>
                        handleStatusChange(
                          delivery._id,
                          e.target.value,
                          delivery.studentId
                        )
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="Assigned">Assigned</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="On the Way">On the Way</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Update Location
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={locationInputs[delivery._id] || ""}
                        onChange={(e) =>
                          handleLocationChange(delivery._id, e.target.value)
                        }
                        placeholder="Enter new location"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                      <button
                        onClick={() => handleLocationUpdate(delivery._id)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RiderAssignedDeliveriesPage;