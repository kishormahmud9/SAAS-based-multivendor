import { prisma } from '../src/app/db_connection';

async function main() {
  try {
    const categories = await (prisma as any).category.findMany({
      select: { id: true, name: true, image: true }
    });
    console.log(JSON.stringify(categories, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
