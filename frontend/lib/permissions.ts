export type Permission = {
    id: string;
    name: string;
    description: string;
};

export type PermissionGroup = {
    id: string;
    name: string;
    permissions: Permission[];
};

export const PERMISSION_GROUPS: PermissionGroup[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        permissions: [
            { id: "dashboard.view", name: "View Dashboard", description: "Access to the main dashboard overview" }
        ]
    },
    {
        id: "products",
        name: "Products",
        permissions: [
            { id: "products.view", name: "View Products", description: "View list of products" },
            { id: "products.add", name: "Add Product", description: "Create new products" },
            { id: "products.edit", name: "Edit Product", description: "Modify existing products" },
            { id: "products.delete", name: "Delete Product", description: "Remove products from store" },
            { id: "products.inventory", name: "Manage Inventory", description: "Update stock levels and SKU info" }
        ]
    },
    {
        id: "orders",
        name: "Orders",
        permissions: [
            { id: "orders.view", name: "View Orders", description: "View customer orders" },
            { id: "orders.update", name: "Update Status", description: "Change order fulfillment status" },
            { id: "orders.refund", name: "Refund Requests", description: "Approve or reject refund requests" },
            { id: "orders.invoice", name: "Print Invoice", description: "Download or print order invoices" }
        ]
    },
    {
        id: "customers",
        name: "Customers",
        permissions: [
            { id: "customers.view", name: "View Customers", description: "View customer directory" },
            { id: "customers.export", name: "Export Customers", description: "Download customer data as CSV" }
        ]
    },
    {
        id: "reviews",
        name: "Reviews",
        permissions: [
            { id: "reviews.view", name: "View Reviews", description: "View product ratings and reviews" },
            { id: "reviews.reply", name: "Reply Reviews", description: "Post replies to customer reviews" }
        ]
    },
    {
        id: "marketing",
        name: "Coupons / Discounts",
        permissions: [
            { id: "marketing.view", name: "View Coupons", description: "View active offers and codes" },
            { id: "marketing.create", name: "Create Coupon", description: "Create new discount campaigns" },
            { id: "marketing.edit", name: "Edit Coupon", description: "Modify active discounts" },
            { id: "marketing.delete", name: "Delete Coupon", description: "Remove discount offers" }
        ]
    },
    {
        id: "finance",
        name: "Wallet / Finance",
        permissions: [
            { id: "finance.view_wallet", name: "View Wallet", description: "View balance and earnings" },
            { id: "finance.view_transactions", name: "View Transactions", description: "View transaction history" },
            { id: "finance.withdraw", name: "Request Withdraw", description: "Initiate payout requests" }
        ]
    },
    {
        id: "reports",
        name: "Reports",
        permissions: [
            { id: "reports.view", name: "View Reports", description: "Access performance analytics" },
            { id: "reports.export", name: "Export Reports", description: "Download analytics data" }
        ]
    },
    {
        id: "shipping",
        name: "Shipping",
        permissions: [
            { id: "shipping.manage", name: "Manage Shipping", description: "Configure zones and courier methods" }
        ]
    },
    {
        id: "staff",
        name: "Staff",
        permissions: [
            { id: "staff.view", name: "View Staff", description: "View store team members" },
            { id: "staff.add", name: "Add Staff", description: "Invite new staff members" },
            { id: "staff.edit", name: "Edit Staff", description: "Modify staff roles/details" },
            { id: "staff.delete", name: "Delete Staff", description: "Remove staff from store" }
        ]
    },
    {
        id: "roles",
        name: "Role Permissions",
        permissions: [
            { id: "roles.view", name: "View Roles", description: "View custom role definitions" },
            { id: "roles.create", name: "Create Roles", description: "Define new custom roles" },
            { id: "roles.edit", name: "Edit Roles", description: "Modify role permissions" },
            { id: "roles.delete", name: "Delete Roles", description: "Remove custom roles" }
        ]
    },
    {
        id: "settings",
        name: "Settings",
        permissions: [
            { id: "settings.store", name: "Manage Store Settings", description: "Update store branding and info" },
            { id: "settings.security", name: "Security Settings", description: "Manage 2FA and passwords" }
        ]
    },
    {
        id: "support",
        name: "Messages / Support",
        permissions: [
            { id: "support.view", name: "View Messages", description: "Access customer chat inbox" },
            { id: "support.reply", name: "Reply Messages", description: "Send messages to customers" }
        ]
    },
    {
        id: "verification",
        name: "Verification",
        permissions: [
            { id: "verification.submit", name: "Submit Verification", description: "Submit KYC documents" }
        ]
    }
];

export const ALL_PERMISSION_IDS = PERMISSION_GROUPS.flatMap(g => g.permissions.map(p => p.id));
