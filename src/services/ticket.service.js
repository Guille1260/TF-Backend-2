import { v4 as uuidv4 } from 'uuid';

export default class TicketService {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async createTicket({ amount, purchaser }) {
    const ticket = {
      code: uuidv4(),
      amount,
      purchaser
    };
    return this.ticketRepository.create(ticket);
  }
}
