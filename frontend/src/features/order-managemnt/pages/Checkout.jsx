
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      items: cartItems,
      total: getCartTotal(),
    };

    console.log("Order Placed:", orderData);
    alert("Order placed successfully!");
  };

  return (
    <div style={{ padding: "20px", marginTop: "30px" }}>
      <h2>Checkout</h2>

      <form onSubmit={handlePlaceOrder} style={{ maxWidth: "500px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option>Cash on Delivery</option>
            <option>Card Payment</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Special Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <h3>Total: Rs. {getCartTotal()}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;