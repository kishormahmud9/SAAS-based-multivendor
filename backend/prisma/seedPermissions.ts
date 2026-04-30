/**
 * Permission Seeder
 * -----------------
 * Syncs all permission definitions from the registry into the database.
 * Also creates default system roles and assigns their permissions.
 *
 * Run with: npm run seed:permissions
 *
 * SAFE TO RE-RUN: All operations use upsert — no duplicates created.
 */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma';
import { Pool } from 'pg';
import { PERMISSIONS, ROLE_PRESETS } from '../src/app/config/permissions';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// System roles to seed
const SYSTEM_ROLES = [
  {
    name: 'Super Admin',
    description: 'Full system access with all permissions enabled.',
    isSystem: true,
    presetKey: 'SUPER_ADMIN' as keyof typeof ROLE_PRESETS,
  },
  {
    name: 'Inventory Manager',
    description: 'Can manage products, categories, brands, attributes and stock levels.',
    isSystem: false,
    presetKey: 'INVENTORY_MANAGER' as keyof typeof ROLE_PRESETS,
  },
  {
    name: 'Support Agent',
    description: 'Limited access to support tickets and customer directory.',
    isSystem: false,
    presetKey: 'SUPPORT_AGENT' as keyof typeof ROLE_PRESETS,
  },
];

async function seedPermissions() {
  console.log('\n🔐 Starting Permission Seeder...\n');

  // ── Step 1: Upsert all permissions ────────────────────────────────────────
  console.log(`📋 Upserting ${PERMISSIONS.length} permissions...`);

  const permissionRecords: Record<string, any> = {};

  for (const perm of PERMISSIONS) {
    const record = await (prisma as any).permission.upsert({
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
    permissionRecords[perm.name] = record;
  }

  console.log(`   ✅ ${PERMISSIONS.length} permissions synced\n`);

  // ── Step 2: Upsert system roles + assign permissions ──────────────────────
  console.log(`🎭 Creating ${SYSTEM_ROLES.length} system roles...\n`);

  for (const roleDef of SYSTEM_ROLES) {
    // Upsert the role
    const role = await (prisma as any).role.upsert({
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

    console.log(`   🎭 Role: "${role.name}"`);

    // Get the permissions for this role preset
    const permissionKeys = ROLE_PRESETS[roleDef.presetKey];
    let assigned = 0;

    for (const permKey of permissionKeys) {
      const permRecord = permissionRecords[permKey];
      if (!permRecord) {
        console.warn(`      ⚠️  Permission not found: ${permKey}`);
        continue;
      }

      // Upsert the role-permission link
      await (prisma as any).roleByPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permRecord.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permRecord.id,
        },
      });

      assigned++;
    }

    console.log(`      ✅ Assigned ${assigned} permissions\n`);
  }

  // ── Step 3: Auto-assign ALL permissions to Super Admin role ──────────────
  console.log('👑 Syncing all permissions to Super Admin role...');

  const superAdminRole = await (prisma as any).role.findUnique({
    where: { name: 'Super Admin' },
  });

  if (superAdminRole) {
    let newlyAssigned = 0;
    for (const permRecord of Object.values(permissionRecords) as any[]) {
      await (prisma as any).roleByPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: superAdminRole.id,
            permissionId: permRecord.id,
          },
        },
        update: {},
        create: {
          roleId: superAdminRole.id,
          permissionId: permRecord.id,
        },
      });
      newlyAssigned++;
    }
    console.log(`   ✅ Super Admin now has all ${newlyAssigned} permissions\n`);
  }

  console.log('✨ Permission seeding completed successfully!\n');
}

seedPermissions()
  .catch((e) => {
    console.error('❌ Permission seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
