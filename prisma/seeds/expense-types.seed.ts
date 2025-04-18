import { PrismaClient } from '@prisma/client';

export async function seedExpenseTypes(prisma: PrismaClient) {
  console.log('Seeding expense types...');

  const expenseTypes = [
    { name: 'Alimentación', isGlobal: true },
    { name: 'Transporte', isGlobal: true },
    { name: 'Vivienda', isGlobal: true },
    { name: 'Servicios', isGlobal: true },
    { name: 'Salud', isGlobal: true },
    { name: 'Educación', isGlobal: true },
    { name: 'Entretenimiento', isGlobal: true },
    { name: 'Ropa', isGlobal: true },
    { name: 'Otros', isGlobal: true },
  ];

  const count = await prisma.expenseType.count();

  if (count === 0) {
    await prisma.expenseType.createMany({
      data: expenseTypes,
      skipDuplicates: true,
    });
    console.log(`Se crearon ${expenseTypes.length} tipos de gastos.`);
  } else {
    console.log(`Ya existen tipos de gastos. Omitiendo seeding.`);
  }
}
