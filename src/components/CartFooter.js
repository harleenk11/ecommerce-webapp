import React, { Component } from "react";
import CartContext from "../context/CartContext";

class CartFooter extends Component {
  static contextType = CartContext;

  render() {
    const { cartItems = [], total = 0 } = this.context || {};
    const count = cartItems.length || 0;

    return (
      <footer
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#FFC107",
          borderTop: "1px solid #eee",
          padding: "10px 16px",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        {count > 0 ? `${count} item(s) | Total: ₹${total.toFixed(2)}` : "Cart is empty"}
      </footer>
    );
  }
}

export default CartFooter;
