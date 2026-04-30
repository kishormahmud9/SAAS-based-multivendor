import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { roleRepository } from './role.repository';

const createRole = async (payload: { name: string; description?: string; permissionIds?: string[] }) => {
  const { permissionIds, ...roleData } = payload;

  const existingRole = await roleRepository.findByName(roleData.name);
  if (existingRole) {
    throw new ApiError(httpStatus.CONFLICT, 'Role name already exists', [{ field: 'name', message: 'Role name already exists' }]);
  }

  return await roleRepository.createRole(roleData, permissionIds || []);
};

const getRoles = async (query: any) => {
  return await roleRepository.getPaginated(query);
};

const getRoleById = async (id: string) => {
  const role = await roleRepository.getRoleById(id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return role;
};

const updateRole = async (id: string, payload: { name?: string; description?: string; permissionIds?: string[] }) => {
  const { permissionIds, ...roleData } = payload;

  const role = await roleRepository.getRoleById(id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  if (role.isSystem) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cannot modify a system role');
  }

  if (roleData.name && roleData.name !== role.name) {
    const existingRole = await roleRepository.findByName(roleData.name);
    if (existingRole && existingRole.id !== id) {
      throw new ApiError(httpStatus.CONFLICT, 'Role name already exists', [{ field: 'name', message: 'Role name already exists' }]);
    }
  }

  return await roleRepository.updateRole(id, roleData, permissionIds);
};

const deleteRole = async (id: string) => {
  const role = await roleRepository.getRoleById(id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  if (role.isSystem) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cannot delete a system role');
  }

  if (role._count.userRoles > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete role assigned to users. Remove users first.');
  }

  return await roleRepository.deleteRole(id);
};

const getAllPermissions = async () => {
  return await roleRepository.getAllPermissions();
};

const getRolePermissions = async (roleId: string) => {
  const role = await roleRepository.getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return role.permissions.map((rp: any) => rp.permissionId);
};

const updateRolePermissions = async (roleId: string, permissionIds: string[]) => {
  const role = await roleRepository.getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  if (role.isSystem) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cannot modify permissions of a system role');
  }

  return await roleRepository.updateRole(roleId, {}, permissionIds);
};

export const roleServices = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getAllPermissions,
  getRolePermissions,
  updateRolePermissions
};
