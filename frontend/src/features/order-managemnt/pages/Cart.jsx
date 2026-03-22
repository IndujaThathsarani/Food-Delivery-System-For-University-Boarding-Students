import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        position: "sticky",
        top: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: "#666" }}>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", color: "#222" }}>{item.name}</h4>

              <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                Price: Rs. {item.price}
              </p>

              <p style={{ margin: "0 0 12px 0", color: "#666" }}>
                Quantity: {item.qty}
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#48b222",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>

                <button
                  onClick={() => decreaseQty(item.id)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  -
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#e5e7eb",
                    color: "#111",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "20px",
              paddingTop: "15px",
              borderTop: "2px solid #eee",
            }}
          >
            <h3 style={{ color: "#48b222", margin: 0 }}>
              Total: Rs. {getCartTotal()}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;