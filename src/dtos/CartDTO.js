export default class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products.map(item => ({
      product: item.product._id,
      title: item.product.title,
      quantity: item.quantity
    }));
  }
}
