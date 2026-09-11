import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Prisma Client works!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
