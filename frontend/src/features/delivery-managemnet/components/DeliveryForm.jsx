import { useState } from "react";
import { createDelivery } from "../api/deliveryApi";
import { validateDeliveryForm } from "../utils/deliveryValidation";

const initialFormState = {
  orderId: "",
  deliveryPersonName: "",
  deliveryPersonPhone: "",
  status: "Assigned",
  currentLocation: "",
  notes: "",
};

function DeliveryForm({ onDeliveryCreated }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateDeliveryForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      await createDelivery({
        ...formData,
        orderId: formData.orderId.trim(),
        deliveryPersonName: formData.deliveryPersonName.trim(),
        deliveryPersonPhone: formData.deliveryPersonPhone.trim(),
        currentLocation: formData.currentLocation.trim(),
        notes: formData.notes.trim(),
      });

      alert("Delivery created successfully");
      setFormData(initialFormState);

      if (onDeliveryCreated) {
        onDeliveryCreated();
      }
    } catch (error) {
      console.error("Failed to create delivery:", error);
      alert(error?.response?.data?.message || "Failed to create delivery");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Create Delivery</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add a new delivery assignment and track its progress.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Order ID
          </label>
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            placeholder="Enter order ID"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          {errors.orderId && (
            <p className="mt-2 text-sm text-red-500">{errors.orderId}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Delivery Person Name
          </label>
          <input
            type="text"
            name="deliveryPersonName"
            value={formData.deliveryPersonName}
            onChange={handleChange}
            placeholder="Enter delivery person name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          {errors.deliveryPersonName && (
            <p className="mt-2 text-sm text-red-500">{errors.deliveryPersonName}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Delivery Person Phone
          </label>
          <input
            type="text"
            name="deliveryPersonPhone"
            value={formData.deliveryPersonPhone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          {errors.deliveryPersonPhone && (
            <p className="mt-2 text-sm text-red-500">{errors.deliveryPersonPhone}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          >
            <option value="Assigned">Assigned</option>
            <option value="Picked Up">Picked Up</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="mt-2 text-sm text-red-500">{errors.status}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Current Location
          </label>
          <input
            type="text"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            placeholder="Enter current location"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          {errors.currentLocation && (
            <p className="mt-2 text-sm text-red-500">{errors.currentLocation}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Optional notes"
            rows="4"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          {errors.notes && (
            <p className="mt-2 text-sm text-red-500">{errors.notes}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating..." : "Create Delivery"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;