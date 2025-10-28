import React, { Component } from "react";
import { observer } from "mobx-react";
import CartContext from "../context/CartContext";

class CartFooter extends Component {
  static contextType = CartContext;

  render() {
    const { cart } = this.context;

    return (
      <div style={{
        background: "#f8f8f8",
        padding: "12px",
        textAlign: "center",
        borderTop: "1px solid #ccc",
        position: "fixed",
        bottom: 0,
        width: "100%"
      }}>
        <p style={{ margin: 0, fontSize: "14px" }}>
        {cart.totalItems} item(s) | Total: ₹{cart.totalPrice}
        </p>
      </div>
    );
  }
}

export default observer(CartFooter);
