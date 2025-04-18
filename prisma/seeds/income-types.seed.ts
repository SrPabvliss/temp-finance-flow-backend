import { PrismaClient } from '@prisma/client';

export async function seedIncomeTypes(prisma: PrismaClient) {
  console.log('Seeding income types...');

  const incomeTypes = [
    { name: 'Salario', isGlobal: true },
    { name: 'Freelance', isGlobal: true },
    { name: 'Inversiones', isGlobal: true },
    { name: 'Alquileres', isGlobal: true },
    { name: 'Bonos', isGlobal: true },
    { name: 'Regalo', isGlobal: true },
    { name: 'Otros', isGlobal: true },
  ];

  const count = await prisma.incomeType.count();

  if (count === 0) {
    await prisma.incomeType.createMany({
      data: incomeTypes,
      skipDuplicates: true,
    });
    console.log(`Se crearon ${incomeTypes.length} tipos de ingresos.`);
  } else {
    console.log(`Ya existen tipos de ingresos. Omitiendo seeding.`);
  }
}
