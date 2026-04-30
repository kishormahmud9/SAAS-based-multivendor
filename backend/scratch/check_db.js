const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const addresses = await prisma.address.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  console.log(JSON.stringify(addresses, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
