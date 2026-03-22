import React, { useState } from "react";
import { CartProvider } from "./features/order-managemnt/context/CartContext";
import Menu from "./features/order-managemnt/pages/Menu";
import Cart from "./features/order-managemnt/pages/Cart";
import Checkout from "./features/order-managemnt/pages/Checkout";
import "./App.css";

function App() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <CartProvider>
      <div className="app-container">
        

        {!showCheckout ? (
          <div className="layout">
            <div className="menu-section">
              <Menu />
            </div>

            <div className="cart-section">
              <Cart onCheckout={() => setShowCheckout(true)} />
            </div>
          </div>
        ) : (
          <Checkout onBack={() => setShowCheckout(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;