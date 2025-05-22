import TicketModel from '../models/Ticket.js';

export default class TicketDao {
  async create(ticketData) {
    return await TicketModel.create(ticketData);
  }

  async getByCode(code) {
    return await TicketModel.findOne({ code });
  }
}
