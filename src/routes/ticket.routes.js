import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import TicketService from '../services/ticket.service.js';
import TicketRepository from '../repositories/ticket.repository.js';
import TicketDAO from '../dao/ticket.dao.js';
import { authorize } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new TicketController(new TicketService(new TicketRepository(new TicketDAO())));

router.get('/', authorize(['admin']), controller.getAll);

export default router;
