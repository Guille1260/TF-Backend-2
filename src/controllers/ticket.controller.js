export default class TicketController {
  constructor(ticketService) {
    this.ticketService = ticketService;
  }

  getAll = async (req, res) => {
    const tickets = await this.ticketService.ticketRepository.getAll();
    res.json(tickets);
  };
}
