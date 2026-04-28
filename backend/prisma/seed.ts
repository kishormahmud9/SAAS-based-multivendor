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

  // 1.5 Official Store for Admin
  const adminStore = await prisma.store.upsert({
    where: { vendorId: admin.id },
    update: {},
    create: {
      vendorId: admin.id,
      name: 'ReadyMart Official',
      slug: 'readymart-official',
      description: 'Official store for ReadyMart products.',
      status: 'ACTIVE',
      isActive: true,
      approvedAt: new Date(),
      commissionRate: 0.00,
    },
  });
  console.log(`Created Admin Store: ${adminStore.name}`);

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

  // 5. Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80', isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?w=500&q=80', isActive: true },
    }),
    prisma.category.upsert({
      where: { slug: 'home-living' },
      update: {},
      create: { name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80', isActive: true },
    }),
  ]);
  console.log('Created Categories');

  // 6. Brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'apple' },
      update: {},
      create: { name: 'Apple', slug: 'apple', isActive: true },
    }),
    prisma.brand.upsert({
      where: { slug: 'nike' },
      update: {},
      create: { name: 'Nike', slug: 'nike', isActive: true },
    }),
  ]);
  console.log('Created Brands');

  // 7. Products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'iphone-15-pro' },
      update: {},
      create: {
        storeId: store.id,
        categoryId: categories[0].id,
        brandId: brands[0].id,
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'The latest iPhone with titanium design.',
        price: 999.99,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80'],
        status: 'ACTIVE',
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'nike-air-max' },
      update: {},
      create: {
        storeId: store.id,
        categoryId: categories[1].id,
        brandId: brands[1].id,
        name: 'Nike Air Max',
        slug: 'nike-air-max',
        description: 'Comfortable running shoes.',
        price: 120.00,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
        status: 'ACTIVE',
        isFeatured: true,
      },
    }),
  ]);
  console.log('Created Products');

  // 8. Banners
  const banners = await Promise.all([
    prisma.banner.upsert({
      where: { id: 'banner-1' },
      update: {},
      create: {
        id: 'banner-1',
        title: 'Summer Collection 2024',
        subtitle: 'Experience the warmth with our vibrant new arrivals.',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        link: '/shop?category=fashion',
        type: 'CAROUSEL',
        background: 'IMAGE',
        isActive: true,
      },
    }),
    prisma.banner.upsert({
      where: { id: 'banner-2' },
      update: {},
      create: {
        id: 'banner-2',
        title: 'Tech Revolution',
        subtitle: 'Upgrade your lifestyle with our latest gadgets.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
        link: '/shop?category=electronics',
        type: 'CAROUSEL',
        background: 'IMAGE',
        isActive: true,
      },
    }),
  ]);
  console.log('Created Banners');

  // 9. UI Settings
  const uiSettings = [
    { key: 'lookbook', value: { title: 'Spring Lookbook', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' } },
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
