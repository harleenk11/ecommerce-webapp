import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartFooter from "./components/CartFooter";
import CartContext from "./context/CartContext";
import cartStore from "./store/CartStore";

class App extends Component {
  render() {
    const cartContextValue = {
      cart: cartStore,
      addToCart: (product) => cartStore.addItem(product),
    };

    return (
      <CartContext.Provider value={cartContextValue}>
        <Router>
          <div style={{ paddingBottom: "60px" }}> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id/details" element={<ProductDetail />} />
            </Routes>
          </div>
          <CartFooter />
        </Router>
      </CartContext.Provider>
    );
  }
}

export default App;
