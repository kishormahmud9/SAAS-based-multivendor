import { apiClient } from '../lib/api-client';

export const adminService = {
  getStats: async (): Promise<any> => {
    return apiClient('/admin/stats', { method: 'GET' });
  },

  getAuditLogs: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/audit-logs${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  // ── Users ──────────────────────────────────────────────────────────────────
  getUsers: async (params: string = ''): Promise<any> => {
    return apiClient(`/users${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getUserById: async (id: string): Promise<any> => {
    return apiClient(`/users/${id}`, { method: 'GET' });
  },

  updateUserStatus: async (userId: string, status: string): Promise<any> => {
    return apiClient(`/users/${userId}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },

  resetUserPassword: async (userId: string, password?: string): Promise<any> => {
    return apiClient(`/users/${userId}/reset-password`, {
      method: 'POST',
      body: { password }
    });
  },

  assignUserRoles: async (userId: string, roleIds: string[]): Promise<any> => {
    return apiClient(`/admin/users/${userId}/roles`, {
      method: 'PATCH',
      body: { roleIds },
    });
  },

  createUser: async (data: any): Promise<any> => {
    return apiClient('/users', { method: 'POST', body: data });
  },

  updateUser: async (id: string, data: any): Promise<any> => {
    return apiClient(`/users/${id}`, { method: 'PATCH', body: data });
  },

  // ── Vendors ────────────────────────────────────────────────────────────────
  getVendors: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/vendors${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  updateVendorStatus: async (vendorId: string, status: string): Promise<any> => {
    return apiClient(`/admin/vendors/${vendorId}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },

  // ── Products ───────────────────────────────────────────────────────────────
  getProducts: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/products${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getProductById: async (id: string): Promise<any> => {
    return apiClient(`/admin/products/${id}`, { method: 'GET' });
  },

  createProduct: async (data: any): Promise<any> => {
    return apiClient('/admin/products', { method: 'POST', body: data });
  },

  updateProduct: async (id: string, data: any): Promise<any> => {
    return apiClient(`/admin/products/${id}`, { method: 'PATCH', body: data });
  },

  deleteProduct: async (id: string): Promise<any> => {
    return apiClient(`/admin/products/${id}`, { method: 'DELETE' });
  },

  // ── Orders ─────────────────────────────────────────────────────────────────
  getOrders: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/orders${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  // ── Banners ────────────────────────────────────────────────────────────────
  getBanners: async (): Promise<any> => {
    return apiClient('/admin/banners', { method: 'GET' });
  },

  deleteBanner: async (id: string): Promise<any> => {
    return apiClient(`/admin/banners/${id}`, { method: 'DELETE' });
  },

  // ── Refunds ────────────────────────────────────────────────────────────────
  getRefunds: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/refunds${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  // ── Categories ─────────────────────────────────────────────────────────────
  getCategories: async (params: string = ''): Promise<any> => {
    return apiClient(`/categories${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getCategoryTree: async (): Promise<any> => {
    return apiClient('/categories/tree', { method: 'GET' });
  },

  getCategoryFlat: async (): Promise<any> => {
    return apiClient('/categories/flat', { method: 'GET' });
  },

  getCategoryById: async (id: string): Promise<any> => {
    return apiClient(`/categories/${id}`, { method: 'GET' });
  },

  createCategory: async (data: any): Promise<any> => {
    const isFormData = data instanceof FormData;
    return apiClient('/categories', { 
      method: 'POST', 
      body: data,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' }
    });
  },

  updateCategory: async (id: string, data: any): Promise<any> => {
    const isFormData = data instanceof FormData;
    return apiClient(`/categories/${id}`, { 
      method: 'PATCH', 
      body: data,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' }
    });
  },

  deleteCategory: async (id: string): Promise<any> => {
    return apiClient(`/categories/${id}`, { method: 'DELETE' });
  },

  bulkUpdateCategoryStatus: async (ids: string[], isActive: boolean): Promise<any> => {
    return apiClient('/categories/bulk-status', { 
      method: 'PATCH', 
      body: { ids, isActive } 
    });
  },

  bulkDeleteCategories: async (ids: string[]): Promise<any> => {
    return apiClient('/categories/bulk-delete', { 
      method: 'POST', 
      body: { ids } 
    });
  },

  updateCategorySortOrder: async (items: { id: string, sortOrder: number }[]): Promise<any> => {
    return apiClient('/categories/sort-order', { 
      method: 'PATCH', 
      body: { items } 
    });
  },

  getCategoryNextOrder: async (): Promise<any> => {
    return apiClient('/categories/next-order', { method: 'GET' });
  },

  checkCategoryName: async (name: string): Promise<any> => {
    return apiClient(`/categories/check-name?name=${encodeURIComponent(name)}`, { method: 'GET' });
  },

  // ── Brands ─────────────────────────────────────────────────────────────────
  getBrands: async (params: string = ''): Promise<any> => {
    return apiClient(`/brands${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getBrandsFlat: async (): Promise<any> => {
    return apiClient('/brands/flat', { method: 'GET' });
  },

  getBrandById: async (id: string): Promise<any> => {
    return apiClient(`/brands/${id}`, { method: 'GET' });
  },

  createBrand: async (data: any): Promise<any> => {
    const isFormData = data instanceof FormData;
    return apiClient('/brands', { 
      method: 'POST', 
      body: data,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' }
    });
  },

  updateBrand: async (id: string, data: any): Promise<any> => {
    const isFormData = data instanceof FormData;
    return apiClient(`/brands/${id}`, { 
      method: 'PATCH', 
      body: data,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' }
    });
  },

  deleteBrand: async (id: string): Promise<any> => {
    return apiClient(`/brands/${id}`, { method: 'DELETE' });
  },

  bulkUpdateBrandStatus: async (ids: string[], isActive: boolean): Promise<any> => {
    return apiClient('/brands/bulk-status', { 
      method: 'PATCH', 
      body: { ids, isActive } 
    });
  },

  bulkDeleteBrands: async (ids: string[]): Promise<any> => {
    return apiClient('/brands/bulk-delete', { 
      method: 'POST', 
      body: { ids } 
    });
  },

  checkBrandName: async (name: string): Promise<any> => {
    return apiClient(`/brands/check-name?name=${encodeURIComponent(name)}`, { method: 'GET' });
  },

  updateRefundStatus: async (id: string, status: string, note?: string): Promise<any> => {
    return apiClient(`/admin/refunds/${id}/status`, {
      method: 'PATCH',
      body: { status, note },
    });
  },

  // ── Attributes ─────────────────────────────────────────────────────────────
  getAttributes: async (params: string = ''): Promise<any> => {
    return apiClient(`/attributes${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getAttributeById: async (id: string): Promise<any> => {
    return apiClient(`/attributes/${id}`, { method: 'GET' });
  },

  createAttribute: async (data: any): Promise<any> => {
    return apiClient('/attributes', { method: 'POST', body: data });
  },

  updateAttribute: async (id: string, data: any): Promise<any> => {
    return apiClient(`/attributes/${id}`, { method: 'PATCH', body: data });
  },

  deleteAttribute: async (id: string): Promise<any> => {
    return apiClient(`/attributes/${id}`, { method: 'DELETE' });
  },

  checkAttributeName: async (name: string): Promise<any> => {
    return apiClient(`/attributes/check-name?name=${encodeURIComponent(name)}`, { method: 'GET' });
  },

  // ── Roles ──────────────────────────────────────────────────────────────────
  getRoles: async (params: string = ''): Promise<any> => {
    return apiClient(`/roles${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getRoleById: async (id: string): Promise<any> => {
    return apiClient(`/roles/${id}`, { method: 'GET' });
  },

  createRole: async (data: any): Promise<any> => {
    return apiClient('/roles', { method: 'POST', body: data });
  },

  updateRole: async (id: string, data: any): Promise<any> => {
    return apiClient(`/roles/${id}`, { method: 'PATCH', body: data });
  },

  deleteRole: async (id: string): Promise<any> => {
    return apiClient(`/roles/${id}`, { method: 'DELETE' });
  },

  getPermissions: async (): Promise<any> => {
    return apiClient('/roles/permissions', { method: 'GET' });
  },

  getRolePermissions: async (id: string): Promise<any> => {
    return apiClient(`/roles/${id}/permissions`, { method: 'GET' });
  },

  updateRolePermissions: async (id: string, permissionIds: string[]): Promise<any> => {
    return apiClient(`/roles/${id}/permissions`, { method: 'PUT', body: { permissionIds } });
  },
};
