import DeliveryStatusBadge from "./DeliveryStatusBadge";

function DeliveryCard({ delivery, onStatusChange, isAdmin = false }) {
  const handleSelectChange = (e) => {
    const newStatus = e.target.value;
    if (!newStatus || !onStatusChange) return;
    onStatusChange(delivery._id, newStatus);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Order ID: {delivery.orderId}
          </h3>
          <p className="text-sm text-gray-500">Delivery Tracking Information</p>
        </div>

        <DeliveryStatusBadge status={delivery.status} />
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2">
        <div>
          <span className="font-semibold text-gray-900">Delivery Person:</span>{" "}
          {delivery.deliveryPersonName}
        </div>

        <div>
          <span className="font-semibold text-gray-900">Phone:</span>{" "}
          {delivery.deliveryPersonPhone}
        </div>

        <div>
          <span className="font-semibold text-gray-900">Current Location:</span>{" "}
          {delivery.currentLocation}
        </div>

        <div>
          <span className="font-semibold text-gray-900">Estimated Time:</span>{" "}
          {delivery.estimatedDeliveryTime
            ? new Date(delivery.estimatedDeliveryTime).toLocaleString()
            : "Not available"}
        </div>

        <div className="md:col-span-2">
          <span className="font-semibold text-gray-900">Notes:</span>{" "}
          {delivery.notes ? delivery.notes : "No notes available"}
        </div>
      </div>

      {isAdmin && (
        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Update Status
          </label>

          <select
            defaultValue=""
            onChange={handleSelectChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
      )}
    </div>
  );
}

export default DeliveryCard;