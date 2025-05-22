export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(ticket) {
    return this.dao.create(ticket);
  }

  async getByCode(code) {
    return this.dao.getByCode(code);
  }

  async getAll() {
    return this.dao.getAll();
  }
}
