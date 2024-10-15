class CartModel {
  constructor() {
    this.arrCart = [];
  }

  addProduct(product) {
    this.arrCart.push(product);
  }
}

export { CartModel };
