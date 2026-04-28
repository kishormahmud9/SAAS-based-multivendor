import { prisma } from '../../db_connection';

const getActiveBanners = async () => {
  return await (prisma as any).banner.findMany({
    where: {
      isActive: true,
      OR: [
        { startsAt: null },
        { startsAt: { lte: new Date() } },
      ],
      AND: [
        { OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] },
      ],
    },
    orderBy: { position: 'asc' },
  });
};

const getActiveOffers = async () => {
  // Logic for offers, maybe using Coupon or a specific Offer model if it exists
  // For now, let's assume offers are banners with a specific type or we just return active banners
  return await (prisma as any).banner.findMany({
    where: {
      isActive: true,
      type: 'OFFER', // Based on BannerType enum
    },
  });
};

const getUiSettings = async () => {
  return await (prisma as any).uiSetting.findMany();
};

export const marketingRepository = {
  getActiveBanners,
  getActiveOffers,
  getUiSettings,
};
