import { makeAutoObservable } from "mobx";

class CartStore {
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  constructor() {
    makeAutoObservable(this);
  }

  get totalItems() {
    return this.cartItems.length;
  }

  get totalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  addItem(product) {
    this.cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem("cartItems");
  }
}

const cartStore = new CartStore();
export default cartStore;
