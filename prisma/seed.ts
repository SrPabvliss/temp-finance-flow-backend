import { PrismaClient } from '@prisma/client';
import { seedExpenseTypes } from './seeds/expense-types.seed';
import { seedUsers } from './seeds/users.seed';
import { seedIncomeTypes } from './seeds/income-types.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el proceso de seeding...');

  await seedExpenseTypes(prisma);
  await seedIncomeTypes(prisma);
  await seedUsers(prisma);

  console.log('¡Seeding completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error durante el proceso de seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
