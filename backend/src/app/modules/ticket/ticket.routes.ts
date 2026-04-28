import { Router } from 'express';
import requireAuth from '../../middlewares/requireAuth';
import { ticketControllers } from './ticket.controller';

const router = Router();

router.post('/', requireAuth(), ticketControllers.createTicket);
router.get('/', requireAuth(), ticketControllers.getMyTickets);

export const ticketRoutes = router;
