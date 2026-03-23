import { useEffect, useState } from "react";
import { getAllDeliveries, updateDeliveryStatus } from "../api/deliveryApi";
import DeliveryForm from "../components/DeliveryForm";
import DeliveryList from "../components/DeliveryList";

function AdminDeliveryPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await getAllDeliveries();
      setDeliveries(response.data);
    } catch (error) {
      console.error("Failed to fetch deliveries:", error);
      alert("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDeliveryStatus(id, {
        status: newStatus,
        currentLocation: "Updated by Admin",
        userId: "USER001",
      });

      alert("Delivery status updated successfully");
      fetchDeliveries();
    } catch (error) {
      console.error("Failed to update delivery status:", error);
      alert("Failed to update delivery status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Admin Delivery Management</h1>
          <p className="mt-2 text-sm text-slate-200">
            Create deliveries, monitor status updates, and manage delivery operations.
          </p>
        </div>

        <div className="mb-8">
          <DeliveryForm onDeliveryCreated={fetchDeliveries} />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Deliveries</h2>
              <p className="mt-1 text-sm text-gray-500">
                Review all delivery records and update their statuses.
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              Total: {deliveries.length}
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              Loading deliveries...
            </div>
          ) : (
            <DeliveryList
              deliveries={deliveries}
              onStatusChange={handleStatusChange}
              isAdmin={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDeliveryPage;