import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import { Pool } from "pg";
import bcrypt from 'bcrypt';
import { PERMISSIONS, ROLE_PRESETS } from '../src/app/config/permissions';

// ── Setup ───────────────────────────────────────────────────────────────────

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Unified Seed System
 * -------------------
 * This script handles all core RBAC (Permissions, Roles, and Users) setup.
 * It is fully idempotent and safe to re-run.
 */

// ── 1. Permission Seeder ─────────────────────────────────────────────────────

async function seedPermissions() {
  console.log('\n🔐 [1/3] Syncing Permissions...');
  const permissionIds: Record<string, string> = {};

  for (const perm of PERMISSIONS) {
    const record = await prisma.permission.upsert({
      where: { name: perm.name },
      update: {
        module: perm.module,
        action: perm.action,
        description: perm.description,
      },
      create: {
        name: perm.name,
        module: perm.module,
        action: perm.action,
        description: perm.description,
      },
    });
    permissionIds[perm.name] = record.id;
  }
  
  console.log(`   ✅ ${PERMISSIONS.length} permissions synced.`);
  return permissionIds;
}

// ── 2. Role Seeder ───────────────────────────────────────────────────────────

async function seedRoles(permissionIds: Record<string, string>) {
  console.log('\n🎭 [2/3] Syncing Roles & Permissions...');
  
  const rolesToSeed = [
    {
      name: 'Super Admin',
      description: 'Full system access. Automatically receives all permissions.',
      isSystem: true,
      presetKey: 'SUPER_ADMIN' as keyof typeof ROLE_PRESETS,
    },
    {
      name: 'Vendor Admin',
      description: 'Can manage products, orders, and inventory for their store.',
      isSystem: false,
      presetKey: 'VENDOR_ADMIN' as keyof typeof ROLE_PRESETS,
    },
    {
      name: 'User',
      description: 'Regular customer with access to profile and own orders.',
      isSystem: false,
      presetKey: 'USER' as keyof typeof ROLE_PRESETS,
    },
  ];

  const roleMap: Record<string, string> = {};

  for (const roleDef of rolesToSeed) {
    const role = await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {
        description: roleDef.description,
        isSystem: roleDef.isSystem,
      },
      create: {
        name: roleDef.name,
        description: roleDef.description,
        isSystem: roleDef.isSystem,
      },
    });

    roleMap[roleDef.name] = role.id;
    console.log(`   🎭 Role: "${role.name}"`);

    // Assign permissions
    let permissionsToAssign: string[] = [];
    if (roleDef.name === 'Super Admin') {
      // Super Admin MUST always receive ALL permissions automatically
      permissionsToAssign = Object.keys(permissionIds);
    } else {
      // Others use centralized ROLE_PRESETS
      permissionsToAssign = ROLE_PRESETS[roleDef.presetKey] || [];
    }

    for (const permName of permissionsToAssign) {
      const permId = permissionIds[permName];
      if (!permId) {
        console.warn(`      ⚠️  Permission not found: ${permName}`);
        continue;
      }

      await prisma.roleByPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permId,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permId,
        },
      });
    }
    console.log(`      ✅ Assigned ${permissionsToAssign.length} permissions.`);
  }

  return roleMap;
}

// ── 3. User Seeder ───────────────────────────────────────────────────────────

async function seedUsers(roleMap: Record<string, string>) {
  console.log('\n👤 [3/3] Syncing Default Users...');
  const passwordHash = await bcrypt.hash('password123', 10);

  const usersToSeed = [
    {
      email: 'superadmin@example.com',
      name: 'System Super Admin',
      roleName: 'Super Admin',
      systemRole: 'SUPER_ADMIN',
    },
    {
      email: 'vendor@example.com',
      name: 'Demo Vendor Admin',
      roleName: 'Vendor Admin',
      systemRole: 'VENDOR',
    },
    {
      email: 'user@example.com',
      name: 'Demo Regular User',
      roleName: 'User',
      systemRole: 'CUSTOMER',
    },
  ];

  for (const userDef of usersToSeed) {
    const user = await prisma.user.upsert({
      where: { email: userDef.email },
      update: {
        name: userDef.name,
        systemRole: userDef.systemRole as any,
      },
      create: {
        email: userDef.email,
        name: userDef.name,
        password: passwordHash,
        systemRole: userDef.systemRole as any,
        status: 'ACTIVE',
        emailVerified: new Date(),
      },
    });

    const roleId = roleMap[userDef.roleName];
    if (roleId) {
      await prisma.roleByUser.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: roleId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          roleId: roleId,
        },
      });
    }
    console.log(`   👤 User: ${user.email} -> ${userDef.roleName}`);
  }
}

// ── Main Runner ──────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 Starting Unified Seed Flow...');
  const start = Date.now();

  try {
    const permissionIds = await seedPermissions();
    const roleMap = await seedRoles(permissionIds);
    await seedUsers(roleMap);
    
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`\n✨ Unified seeding completed successfully in ${duration}s!\n`);
  } catch (error) {
    console.error('\n❌ Unified seed failed:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
