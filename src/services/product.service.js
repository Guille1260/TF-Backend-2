import Product from '../models/Product.js';

export default class ProductService {
  async getAll() {
    return Product.find();
  }

  async getById(id) {
    return Product.findById(id);
  }

  async create(data) {
    const product = new Product(data);
    return product.save();
  }

  async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  }
}