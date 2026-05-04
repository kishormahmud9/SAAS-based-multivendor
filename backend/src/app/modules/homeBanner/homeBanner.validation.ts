import { z } from 'zod';
import { BannerType } from '../../../generated/prisma/client';

const createHomeBanner = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    subtitle: z.string().optional(),
    link: z.string().optional(),
    backgroundType: z.string().optional(),
    targetDate: z.string().optional(),
    type: z.enum(Object.values(BannerType) as [string, ...string[]]).optional(),
    isActive: z.union([z.boolean(), z.string()]).optional(),
    order: z.union([z.number(), z.string()]).optional(),
  }),
});

const updateHomeBanner = z.object({
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    link: z.string().optional(),
    backgroundType: z.string().optional(),
    targetDate: z.string().optional(),
    type: z.enum(Object.values(BannerType) as [string, ...string[]]).optional(),
    isActive: z.union([z.boolean(), z.string()]).optional(),
    order: z.union([z.number(), z.string()]).optional(),
  }),
});

export const homeBannerValidation = {
  createHomeBanner,
  updateHomeBanner,
};
