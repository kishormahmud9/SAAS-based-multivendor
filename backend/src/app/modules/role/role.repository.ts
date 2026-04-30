import { prisma } from '../../db_connection';
import { IPaginationOptions } from '../../interfaces/pagination';

const createRole = async (data: { name: string; description?: string }, permissionIds: string[] = []) => {
  return await (prisma as any).role.create({
    data: {
      ...data,
      permissions: {
        create: permissionIds.map(id => ({ permissionId: id }))
      }
    },
    include: {
      permissions: {
        include: { permission: true }
      }
    }
  });
};

const findByName = async (name: string) => {
  return await (prisma as any).role.findUnique({ where: { name } });
};

const getPaginated = async (query: any) => {
  const { page = 1, limit = 10, search = '' } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    name: { contains: search, mode: 'insensitive' }
  };

  const [data, total] = await Promise.all([
    (prisma as any).role.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        permissions: {
          include: { permission: true }
        },
        _count: { select: { userRoles: true, permissions: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    (prisma as any).role.count({ where })
  ]);

  return {
    data,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage: Math.ceil(total / Number(limit))
    }
  };
};

const getRoleById = async (id: string) => {
  return await (prisma as any).role.findUnique({
    where: { id },
    include: {
      permissions: {
        include: { permission: true }
      },
      _count: { select: { userRoles: true } }
    }
  });
};

const updateRole = async (id: string, data: { name?: string; description?: string }, permissionIds?: string[]) => {
  const updateData: any = { ...data };

  if (permissionIds) {
    updateData.permissions = {
      deleteMany: {},
      create: permissionIds.map(pid => ({ permissionId: pid }))
    };
  }

  return await (prisma as any).role.update({
    where: { id },
    data: updateData,
    include: {
      permissions: {
        include: { permission: true }
      }
    }
  });
};

const deleteRole = async (id: string) => {
  return await (prisma as any).role.delete({ where: { id } });
};

const getAllPermissions = async () => {
  return await (prisma as any).permission.findMany({
    orderBy: [
      { module: 'asc' },
      { name: 'asc' }
    ]
  });
};

export const roleRepository = {
  createRole,
  findByName,
  getPaginated,
  getRoleById,
  updateRole,
  deleteRole,
  getAllPermissions
};
