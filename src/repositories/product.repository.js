export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(product) {
    return this.dao.create(product);
  }

  async getAll(filters = {}) {
    return this.dao.getAll(filters);
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
}
