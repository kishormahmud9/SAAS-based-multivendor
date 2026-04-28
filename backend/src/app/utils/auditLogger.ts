import { Request } from 'express';
import { prisma } from '../db_connection';

type TAuditLog = {
  actorId: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
};

export const logAudit = async (req: Request, data: Omit<TAuditLog, 'actorId' | 'actorRole' | 'ipAddress' | 'userAgent'>) => {
  try {
    await (prisma as any).auditLog.create({
      data: {
        ...data,
        actorId: req.user?.id,
        actorRole: req.user?.role,
        ipAddress: req.ip || req.headers['x-forwarded-for']?.toString(),
        userAgent: req.headers['user-agent'],
      },
    });
  } catch (error) {
    // We don't want to fail the main request if audit logging fails, but we should log it
    console.error('Failed to log audit:', error);
  }
};
