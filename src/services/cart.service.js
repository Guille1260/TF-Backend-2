import Cart from '../models/Cart.js';

export default class CartService {
  async getById(id) {
    return Cart.findById(id).populate('products.product');
  }

  async addProduct(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const index = cart.products.findIndex(p => p.product.toString() === productId);
    if (index >= 0) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    return this.getById(cartId);
  }

  async removeProduct(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    return this.getById(cartId);
  }
}