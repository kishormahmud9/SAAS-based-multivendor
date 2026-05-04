const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- ORDER BY ASC ---");
  const asc = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { name: true, sortOrder: true }
  });
  console.log(asc);

  console.log("--- ORDER BY DESC ---");
  const desc = await prisma.category.findMany({
    orderBy: { sortOrder: 'desc' },
    select: { name: true, sortOrder: true }
  });
  console.log(desc);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
