import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import { Pool } from "pg";
import bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  console.log('Seeding database with Driver Adapter...');

  // 1. Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Super Admin',
      password: passwordHash,
      systemRole: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });
  console.log(`Created Super Admin: ${admin.email}`);

  // 2. Customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Demo Customer',
      password: passwordHash,
      systemRole: 'CUSTOMER',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });
  console.log(`Created Customer: ${customer.email}`);

  // 3. Vendor
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@example.com' },
    update: {},
    create: {
      email: 'vendor@example.com',
      name: 'Demo Vendor',
      password: passwordHash,
      systemRole: 'VENDOR',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });
  console.log(`Created Vendor User: ${vendorUser.email}`);

  // 4. Store for Vendor
  const store = await prisma.store.upsert({
    where: { vendorId: vendorUser.id },
    update: {},
    create: {
      vendorId: vendorUser.id,
      name: 'Demo Store',
      slug: 'demo-store',
      description: 'Your one-stop shop for everything demo.',
      status: 'ACTIVE',
      isActive: true,
      approvedAt: new Date(),
      commissionRate: 10.00,
    },
  });
  console.log(`Created Store: ${store.name} (${store.slug})`);

  // 5. UI Settings
  const uiSettings = [
    { key: 'lookbook', value: { title: 'Spring Lookbook', image: '/images/lookbook.jpg' } },
    { key: 'feature_highlight', value: { title: 'Premium Quality', description: 'Best materials used.' } },
    { key: 'ugc', value: { title: 'Community Photos', items: [] } },
  ];

  for (const setting of uiSettings) {
    await prisma.uiSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value as any },
      create: {
        key: setting.key,
        value: setting.value as any,
      },
    });
  }
  console.log('Created UI Settings');

  console.log('Seed completed successfully!');
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
