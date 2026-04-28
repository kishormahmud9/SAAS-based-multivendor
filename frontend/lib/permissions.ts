/**
 * Frontend permission definitions for Vendor RBAC UI.
 * These are UI-level definitions only. Real authorization is enforced on the backend.
 */

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  permissions: Permission[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: 'products',
    name: 'Products',
    permissions: [
      { id: 'products.view', name: 'View Products', description: 'Can view product listings' },
      { id: 'products.create', name: 'Create Products', description: 'Can add new products' },
      { id: 'products.edit', name: 'Edit Products', description: 'Can update product details' },
      { id: 'products.delete', name: 'Delete Products', description: 'Can remove products' },
    ],
  },
  {
    id: 'orders',
    name: 'Orders',
    permissions: [
      { id: 'orders.view', name: 'View Orders', description: 'Can view order list and details' },
      { id: 'orders.manage', name: 'Manage Orders', description: 'Can update order status' },
      { id: 'orders.refund', name: 'Process Refunds', description: 'Can initiate refund requests' },
    ],
  },
  {
    id: 'inventory',
    name: 'Inventory',
    permissions: [
      { id: 'inventory.view', name: 'View Inventory', description: 'Can view stock levels' },
      { id: 'inventory.update', name: 'Update Inventory', description: 'Can adjust stock quantities' },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    permissions: [
      { id: 'reports.view', name: 'View Reports', description: 'Can access analytics and reports' },
      { id: 'reports.export', name: 'Export Reports', description: 'Can export data to CSV/Excel' },
    ],
  },
  {
    id: 'staff',
    name: 'Staff',
    permissions: [
      { id: 'staff.view', name: 'View Staff', description: 'Can view team members' },
      { id: 'staff.manage', name: 'Manage Staff', description: 'Can invite and manage staff roles' },
    ],
  },
  {
    id: 'settings',
    name: 'Store Settings',
    permissions: [
      { id: 'settings.view', name: 'View Settings', description: 'Can view store configuration' },
      { id: 'settings.edit', name: 'Edit Settings', description: 'Can update store configuration' },
    ],
  },
];

export const ALL_PERMISSION_IDS: string[] = PERMISSION_GROUPS.flatMap(
  (group) => group.permissions.map((p) => p.id)
);
