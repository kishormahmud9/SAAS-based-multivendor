import { Prisma } from "@prisma/client";
import { prisma } from "../../db_connection";

const create = async (data: Prisma.HomeBannerCreateInput) => {
  return await prisma.homeBanner.create({
    data,
  });
};

const getAll = async (filters: { isActive?: boolean }) => {
  return await prisma.homeBanner.findMany({
    where: filters,
    orderBy: {
      order: 'asc',
    },
  });
};

const getById = async (id: string) => {
  return await prisma.homeBanner.findUnique({
    where: { id },
  });
};

const update = async (id: string, data: Prisma.HomeBannerUpdateInput) => {
  return await prisma.homeBanner.update({
    where: { id },
    data,
  });
};

const deleteById = async (id: string) => {
  return await prisma.homeBanner.delete({
    where: { id },
  });
};

export const homeBannerRepository = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
