import React from "react";
import cartStore from "../store/CartStore";

const CartContext = React.createContext({
  cart: cartStore,
  addToCart: (p) => cartStore.addItem(p),
});

export default CartContext;
