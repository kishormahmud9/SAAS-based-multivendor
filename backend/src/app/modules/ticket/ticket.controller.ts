import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ticketRepository } from './ticket.repository';

const createTicket = catchAsync(async (req: Request, res: Response) => {
  const result = await ticketRepository.createTicket(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Support ticket created successfully',
    data: result,
  });
});

const getMyTickets = catchAsync(async (req: Request, res: Response) => {
  const result = await ticketRepository.getUserTickets(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tickets fetched successfully',
    data: result,
  });
});

export const ticketControllers = {
  createTicket,
  getMyTickets,
};
