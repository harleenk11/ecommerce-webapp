import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CartFooter from "./components/CartFooter";
import { CartProvider } from "./context/CartContext";

class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <header style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
            <div>
              <Link to="/" style={{ textDecoration: "none", color: "#222", fontWeight: 700 }}>Product Store</Link>
            </div>
            <nav>
              <Link to="/cart" style={{ marginRight: 12, color: "#1976d2", textDecoration: "underline" }}> See Cart</Link>
            </nav>
          </header>

          <div style={{ paddingBottom: 80 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id/details" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>

          <CartFooter />
        </Router>
      </CartProvider>
    );
  }
}

export default App;
