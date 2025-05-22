import CartModel from '../models/Cart.js';

export default class CartDao {
  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async create(cartData = {}) {
    return await CartModel.create(cartData);
  }

  async update(id, updateData) {
    return await CartModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await CartModel.findByIdAndDelete(id);
  }
}
