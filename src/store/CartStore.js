import { makeAutoObservable } from "mobx";

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
  }

  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
  }
}

const cartStore = new CartStore();
export default cartStore;
