import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = ({ onBack }) => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
    note: "",
  });

  const deliveryFee = cartItems.length > 0 ? 400 : 0;
  const finalTotal = getCartTotal() + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
  e.preventDefault();

  const orderData = {
    customer: formData,
    items: cartItems,
    subTotal: getCartTotal(),
    deliveryFee,
    total: finalTotal,
  };

  console.log("Order Placed:", orderData);

  clearCart(); // ✅ clear cart

  alert("🎉 Order placed successfully!");
};

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginTop: "20px",


      }}
      

      
    >
      <button
  onClick={onBack}
  style={{
    marginBottom: "20px",
    padding: "10px 16px",
    backgroundColor: "#e5e7eb",
    color: "#111",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Back to Menu
</button>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>Checkout</h2>

      <form onSubmit={handlePlaceOrder} style={{ maxWidth: "700px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          >
            <option>Cash on Delivery</option>
            <option>Card Payment</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Special Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            background: "#f9fafb",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0 0 8px 0", color: "#555" }}>
            Sub Total: Rs. {getCartTotal()}
          </p>
          <p style={{ margin: "0 0 8px 0", color: "#555" }}>
            Delivery Fee: Rs. {deliveryFee}
          </p>
          <h3 style={{ margin: 0, color: "#000000" }}>
            Final Total: Rs. {finalTotal}
          </h3>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#48b222",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;