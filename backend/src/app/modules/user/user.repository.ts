import { prisma } from '../../db_connection';

const getProfile = async (userId: string) => {
  return await (prisma as any).user.findUnique({
    where: { id: userId },
    include: {
      addresses: true,
      _count: {
        select: { orders: true, reviews: true, wishlist: true },
      },
    },
  });
};

const updateProfile = async (userId: string, data: any) => {
  return await (prisma as any).user.update({
    where: { id: userId },
    data,
  });
};

const createAddress = async (userId: string, data: any) => {
  if (data.isDefault) {
    await (prisma as any).address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }
  return await (prisma as any).address.create({
    data: { ...data, userId },
  });
};

const getAddresses = async (userId: string) => {
  return await (prisma as any).address.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

const updateAddress = async (addressId: string, userId: string, data: any) => {
  if (data.isDefault) {
    await (prisma as any).address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }
  return await (prisma as any).address.update({
    where: { id: addressId, userId },
    data,
  });
};

const deleteAddress = async (addressId: string, userId: string) => {
  return await (prisma as any).address.delete({
    where: { id: addressId, userId },
  });
};

const getUsers = async (query: any) => {
  const { page = 1, limit = 10, search = '', status, roleId, systemRole } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    isDeleted: false,
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } }
    ]
  };

  if (status) where.status = status;
  if (systemRole) where.systemRole = systemRole;
  if (roleId) {
    where.roleAssignments = {
      some: { roleId }
    };
  }

  const [data, total] = await Promise.all([
    (prisma as any).user.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        roleAssignments: {
          include: { role: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    (prisma as any).user.count({ where })
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

const findByEmail = async (email: string) => {
  return await (prisma as any).user.findUnique({ 
    where: { email, isDeleted: false },
    include: { roleAssignments: true }
  });
};

const getUserById = async (id: string) => {
  return await (prisma as any).user.findUnique({
    where: { id, isDeleted: false },
    include: {
      roleAssignments: {
        include: { role: true }
      },
      addresses: true,
      orders: {
        take: 5,
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: { orders: true, reviews: true, wishlist: true },
      },
    }
  });
};

const createUser = async (data: any, roleId: string) => {
  const { addresses, ...userData } = data;
  const createData: any = {
    ...userData,
    status: 'ACTIVE',
    emailVerified: new Date(),
    roleAssignments: {
      create: {
        roleId
      }
    }
  };

  if (addresses && addresses.length > 0) {
    const sanitizedAddresses = addresses.map(({ id, ...addr }: any) => addr);
    createData.addresses = {
      create: sanitizedAddresses
    };
  }

  return await (prisma as any).user.create({
    data: createData,
    include: {
      roleAssignments: {
        include: { role: true }
      },
      addresses: true
    }
  });
};

const updateUser = async (id: string, data: any, roleId?: string) => {
  const { addresses, ...userData } = data;
  const updateData: any = { ...userData };

  if (roleId) {
    updateData.roleAssignments = {
      deleteMany: {},
      create: { roleId }
    };
  }

  if (addresses) {
    // Remove temporary IDs from frontend before saving
    const sanitizedAddresses = addresses.map(({ id, ...addr }: any) => addr);
    updateData.addresses = {
      deleteMany: {},
      create: sanitizedAddresses
    };
  }

  return await (prisma as any).user.update({
    where: { id },
    data: updateData,
    include: {
      roleAssignments: {
        include: { role: true }
      },
      addresses: true
    }
  });
};

export const userRepository = {
  getProfile,
  updateProfile,
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getUsers,
  findByEmail,
  getUserById,
  createUser,
  updateUser,
};
