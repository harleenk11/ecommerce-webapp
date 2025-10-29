import React, { Component } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

class CartPage extends Component {
  static contextType = CartContext;

  render() {
    const { cartItems, total, removeFromCart, clearCart } = this.context;

    return (
      <main style={{ padding: 20 }}>
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {cartItems.map((it, idx) => (
              <div
                key={`${it.id}-${idx}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #eee" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={it.image} alt={it.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.title}</div>
                    <small style={{ color: "#666" }}>{it.category}</small>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div>₹{it.price}</div>
                  <div style={{ marginTop: 6 }}>
                    <button
                      onClick={() => removeFromCart(it.id)}
                      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ textAlign: "right", marginTop: 16 }}>
              <h3>Total: ₹{total.toFixed(2)}</h3>
              <div style={{ marginTop: 8 }}>
                <button onClick={clearCart} style={{ padding: "8px 12px", cursor: "pointer" }}>Clear Cart</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <Link to="/"> Continue Shopping</Link>
        </div>
      </main>
    );
  }
}

export default CartPage;
