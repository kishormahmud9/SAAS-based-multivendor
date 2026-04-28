import { prisma } from '../../db_connection';

const createTicket = async (userId: string, data: any) => {
  return await (prisma as any).ticket.create({
    data: { ...data, userId },
  });
};

const getUserTickets = async (userId: string) => {
  return await (prisma as any).ticket.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
};

export const ticketRepository = {
  createTicket,
  getUserTickets,
};
