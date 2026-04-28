import { prisma } from '../src/app/db_connection';

async function main() {
  try {
    const categories = await (prisma as any).category.findMany();
    
    for (const category of categories) {
      if (category.image && category.image.startsWith('/category/')) {
        const newPath = `/uploads${category.image}`;
        await (prisma as any).category.update({
          where: { id: category.id },
          data: { image: newPath }
        });
        console.log(`Updated ${category.name}: ${newPath}`);
      }
    }
    console.log('Migration completed!');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
