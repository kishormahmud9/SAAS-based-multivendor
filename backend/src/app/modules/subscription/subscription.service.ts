import { prisma } from '../../db_connection';

const getPlans = async () => {
  return await (prisma as any).plan.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
};

const subscribe = async (storeId: string, planId: string) => {
  const plan = await (prisma as any).plan.findUnique({ where: { id: planId } });
  if (!plan) throw new Error('Plan not found');

  const startDate = new Date();
  const endDate = new Date();
  if (plan.billingCycle === 'MONTHLY') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  // Deactivate old subscriptions
  await (prisma as any).subscription.updateMany({
    where: { storeId, status: { in: ['ACTIVE', 'TRIAL'] } },
    data: { status: 'CANCELLED', cancelledAt: new Date(), cancelledBy: 'SYSTEM_UPGRADE' },
  });

  return await (prisma as any).subscription.create({
    data: {
      storeId,
      planId,
      status: 'ACTIVE',
      billingCycle: plan.billingCycle,
      currentPeriodStart: startDate,
      currentPeriodEnd: endDate,
      amount: plan.price,
      autoRenew: true,
    },
  });
};

const getMySubscription = async (storeId: string) => {
  return await (prisma as any).subscription.findFirst({
    where: { storeId },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const subscriptionServices = {
  getPlans,
  subscribe,
  getMySubscription,
};
