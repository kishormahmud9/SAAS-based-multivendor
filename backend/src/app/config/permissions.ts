// =============================================================================
// PERMISSION REGISTRY — Single source of truth for all RBAC permission keys
// Format: "module:action"
// =============================================================================

export type PermissionKey = string;

export interface PermissionDefinition {
  name: PermissionKey;   // e.g. "products:view"
  module: string;        // e.g. "products"
  action: string;        // e.g. "view"
  description: string;
}

// ── Actions available per module ─────────────────────────────────────────────
const ACTIONS = ['view', 'create', 'edit', 'delete'] as const;
type Action = typeof ACTIONS[number];

// Helper to generate standard CRUD permissions for a module
const crudPermissions = (
  module: string,
  label: string
): PermissionDefinition[] =>
  ACTIONS.map((action) => ({
    name: `${module}:${action}`,
    module,
    action,
    description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${label}`,
  }));

// =============================================================================
// ALL PERMISSIONS — Grouped by module
// =============================================================================

export const PERMISSIONS: PermissionDefinition[] = [

  // ── Dashboard ────────────────────────────────────────────────────────────
  ...crudPermissions('dashboard', 'dashboard & analytics'),

  // ── Products ─────────────────────────────────────────────────────────────
  ...crudPermissions('products', 'products'),

  // ── Categories ───────────────────────────────────────────────────────────
  ...crudPermissions('categories', 'product categories'),

  // ── Brands ───────────────────────────────────────────────────────────────
  ...crudPermissions('brands', 'brands'),

  // ── Attributes ───────────────────────────────────────────────────────────
  ...crudPermissions('attributes', 'product attributes'),

  // ── Orders ───────────────────────────────────────────────────────────────
  ...crudPermissions('orders', 'orders'),
  { name: 'orders:refund',  module: 'orders', action: 'refund',  description: 'Process order refunds' },
  { name: 'orders:cancel',  module: 'orders', action: 'cancel',  description: 'Cancel orders' },

  // ── Users ─────────────────────────────────────────────────────────────────
  ...crudPermissions('users', 'users'),
  { name: 'users:suspend',  module: 'users', action: 'suspend', description: 'Suspend or activate user accounts' },

  // ── Vendors ───────────────────────────────────────────────────────────────
  ...crudPermissions('vendors', 'vendors'),
  { name: 'vendors:approve',  module: 'vendors', action: 'approve',  description: 'Approve or reject vendor applications' },
  { name: 'vendors:suspend',  module: 'vendors', action: 'suspend',  description: 'Suspend vendor accounts' },

  // ── Marketing ─────────────────────────────────────────────────────────────
  ...crudPermissions('marketing', 'marketing campaigns & banners'),
  ...crudPermissions('coupons', 'coupons & discount codes'),

  // ── Finance ───────────────────────────────────────────────────────────────
  { name: 'finance:view',       module: 'finance', action: 'view',     description: 'View financial reports & summaries' },
  { name: 'finance:withdrawals',module: 'finance', action: 'withdrawals', description: 'Process vendor withdrawal requests' },
  { name: 'finance:subscriptions', module: 'finance', action: 'subscriptions', description: 'Manage subscription plans' },

  // ── Support ───────────────────────────────────────────────────────────────
  ...crudPermissions('support', 'support tickets'),
  { name: 'support:assign',  module: 'support', action: 'assign',  description: 'Assign tickets to agents' },
  { name: 'support:close',   module: 'support', action: 'close',   description: 'Close support tickets' },

  // ── Inventory ─────────────────────────────────────────────────────────────
  ...crudPermissions('inventory', 'inventory & stock levels'),

  // ── Reviews ───────────────────────────────────────────────────────────────
  { name: 'reviews:view',    module: 'reviews', action: 'view',    description: 'View product reviews' },
  { name: 'reviews:approve', module: 'reviews', action: 'approve', description: 'Approve or reject reviews' },
  { name: 'reviews:delete',  module: 'reviews', action: 'delete',  description: 'Delete reviews' },

  // ── Content ───────────────────────────────────────────────────────────────
  ...crudPermissions('content', 'blogs, pages & content'),

  // ── Settings ──────────────────────────────────────────────────────────────
  { name: 'settings:view',   module: 'settings', action: 'view',   description: 'View system settings' },
  { name: 'settings:edit',   module: 'settings', action: 'edit',   description: 'Edit system settings & UI configuration' },

  // ── Roles ─────────────────────────────────────────────────────────────────
  ...crudPermissions('roles', 'roles & permissions'),

  // ── Profile ───────────────────────────────────────────────────────────────
  { name: 'profile:view', module: 'profile', action: 'view', description: 'View own profile' },
  { name: 'profile:edit', module: 'profile', action: 'edit', description: 'Edit own profile' },
];

// =============================================================================
// PERMISSION KEYS — Flat list of all permission name strings (for type safety)
// =============================================================================

export const PERMISSION_KEYS = PERMISSIONS.map((p) => p.name);

// =============================================================================
// ROLE PRESETS — Default permission sets for seeding system roles
// =============================================================================

export const ROLE_PRESETS = {
  // Super Admin: Full access (handled automatically in seeder)
  SUPER_ADMIN: PERMISSION_KEYS,

  // Vendor Admin: products (full), categories (view/create/edit), brands (view), orders (view/manage), inventory
  VENDOR_ADMIN: [
    ...PERMISSION_KEYS.filter((k) => k.startsWith('products:')),
    'categories:view',
    'categories:create',
    'categories:edit',
    'brands:view',
    ...PERMISSION_KEYS.filter((k) => k.startsWith('orders:')),
    ...PERMISSION_KEYS.filter((k) => k.startsWith('inventory:')),
  ],

  // User: Minimal permissions
  USER: ['profile:view', 'profile:edit', 'orders:view'],
};
