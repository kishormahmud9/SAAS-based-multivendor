const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    select: {
      name: true,
      sortOrder: true,
      createdAt: true
    }
  });
  console.log(JSON.stringify(categories, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
