import React, { Component, createContext } from "react";

const CartContext = createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    const saved = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.state = {
      cartItems: saved,
    };
  }

  addToCart = (product) => {
    this.setState(
      (prev) => {
        const updated = [...prev.cartItems, product];
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return { cartItems: updated };
      },
      () => console.log("Cart now:", this.state.cartItems.length)
    );
  };

  removeFromCart = (id) => {
    this.setState(
      (prev) => {
        const idx = prev.cartItems.findIndex((i) => i.id === id);
        if (idx === -1) return null;
        const updated = [...prev.cartItems.slice(0, idx), ...prev.cartItems.slice(idx + 1)];
        localStorage.setItem("cartItems", JSON.stringify(updated));
        return { cartItems: updated };
      },
      () => console.log("Removed. Count now:", this.state.cartItems.length)
    );
  };

  clearCart = () => {
    localStorage.removeItem("cartItems");
    this.setState({ cartItems: [] });
  };

  getTotal = () => {
    return this.state.cartItems.reduce((sum, it) => sum + (it.price || 0), 0);
  };

  render() {
    const { cartItems } = this.state;
    const total = this.getTotal();

    return (
      <CartContext.Provider
        value={{
          cartItems,
          total,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
