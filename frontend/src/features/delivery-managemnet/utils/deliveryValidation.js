export const validateDeliveryForm = (values) => {
  const errors = {};

  if (!values.orderId || values.orderId.trim() === "") {
    errors.orderId = "Order ID is required";
  }

  if (!values.studentId || values.studentId.trim() === "") {
    errors.studentId = "Student ID is required";
  }

  if (!values.deliveryPersonName || values.deliveryPersonName.trim() === "") {
    errors.deliveryPersonName = "Delivery person name is required";
  } else if (values.deliveryPersonName.trim().length < 3) {
    errors.deliveryPersonName = "Name must be at least 3 characters";
  }

  if (!values.deliveryPersonPhone || values.deliveryPersonPhone.trim() === "") {
    errors.deliveryPersonPhone = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.deliveryPersonPhone.trim())) {
    errors.deliveryPersonPhone = "Phone number must be exactly 10 digits";
  }

  if (!values.status || values.status.trim() === "") {
    errors.status = "Status is required";
  }

  if (!values.currentLocation || values.currentLocation.trim() === "") {
    errors.currentLocation = "Current location is required";
  }

  if (
    values.notes &&
    values.notes.trim().length > 200
  ) {
    errors.notes = "Notes cannot exceed 200 characters";
  }

  return errors;
};