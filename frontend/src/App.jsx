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
      <div className="min-h-screen bg-gray-100 p-6">
        {!showCheckout ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
            <div>
              <Menu />
            </div>

            <div>
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