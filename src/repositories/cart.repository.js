export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(cart) {
    return this.dao.create(cart);
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }

  async addProduct(cartId, productId, quantity) {
    return this.dao.addProduct(cartId, productId, quantity);
  }

  async clear(cartId) {
    return this.dao.clear(cartId);
  }
}
