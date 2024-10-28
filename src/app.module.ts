import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { TotalModule } from './total/total.module';
import { IncomeTypeModule } from './income-type/income-type.module';
import { ExpenseTypeModule } from './expense-type/expense-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    ExpensesModule,
    IncomesModule,
    TotalModule,
    IncomeTypeModule,
    ExpenseTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
