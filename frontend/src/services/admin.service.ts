import { apiClient } from '../lib/api-client';

export const adminService = {
  getStats: async (): Promise<any> => {
    return apiClient('/admin/dashboard/stats', { method: 'GET' });
  },

  getAuditLogs: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/audit-logs${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  // ── Users ──────────────────────────────────────────────────────────────────
  getUsers: async (params: string = ''): Promise<any> => {
    return apiClient(`/admin/users${params ? `?${params}` : ''}`, { method: 'GET' });
  },

  getUserById: async (id: string): Promise<any> => {
    return apiClient(`/admin/users/${id}`, { method: 'GET' });
  },

  updateUserStatus: async (userId: string, status: string): Promise<any> => {
    return apiClient(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: { status },
    });
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

  updateRefundStatus: async (id: string, status: string, note?: string): Promise<any> => {
    return apiClient(`/admin/refunds/${id}/status`, {
      method: 'PATCH',
      body: { status, note },
    });
  },
};
