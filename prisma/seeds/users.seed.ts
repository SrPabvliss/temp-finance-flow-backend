import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding usuarios...');

  const hashPassword = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex');
  };

  const users = [
    {
      name: 'Usuario',
      lastname: 'Demo',
      email: 'demo@example.com',
      password: hashPassword('Password123!'),
    },
    {
      name: 'Admin',
      lastname: 'Sistema',
      email: 'admin@example.com',
      password: hashPassword('Admin123!'),
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: user,
      });
      console.log(`Usuario creado: ${user.email}`);
    } else {
      console.log(`El usuario ${user.email} ya existe. Omitiendo.`);
    }
  }
}
