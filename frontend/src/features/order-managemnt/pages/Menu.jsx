import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const dummyItems = [
  {
    id: 1,
    name: "Bucket / 6PC",
    price: 3750,
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=800&q=80",
    description: "Hot and crispy chicken bucket for sharing.",
  },
  {
    id: 2,
    name: "Quarter / 2Pc",
    price: 1400,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    description: "2 pieces of signature crispy chicken.",
  },
  {
    id: 3,
    name: "Half / 4Pc",
    price: 2600,
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=80",
    description: "4 pieces of crispy chicken for a small meal.",
  },
  {
    id: 4,
    name: "Full / 8Pc",
    price: 4950,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    description: "8 pieces of signature crispy chicken.",
  },
];

const Menu = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#222" }}>Food Menu</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {dummyItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "16px" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#222" }}>{item.name}</h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  minHeight: "40px",
                  marginBottom: "12px",
                }}
              >
                {item.description}
              </p>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#48b222",
                  marginBottom: "14px",
                }}
              >
                Rs. {item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#48b222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add to Bucket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;