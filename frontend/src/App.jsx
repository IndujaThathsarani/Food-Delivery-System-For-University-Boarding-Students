import React from "react";
import { CartProvider } from "./features/order-managemnt/context/CartContext";
import Menu from "./features/order-managemnt/pages/Menu";
import Cart from "./features/order-managemnt/pages/Cart";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <h1 className="app-title">
          
        </h1>

        <div className="layout">
          <div className="menu-section">
            <Menu />
          </div>

          <div className="cart-section">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;