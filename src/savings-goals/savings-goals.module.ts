import { Module } from '@nestjs/common';
import { SavingsGoalsService } from './savings-goals.service';
import { SavingsGoalsController } from './savings-goals.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Savings Goals Module
 *
 * @module
 * @description Configures and integrates savings goals components
 */
@Module({
  controllers: [SavingsGoalsController],
  providers: [SavingsGoalsService, PrismaService],
})
export class SavingsGoalsModule {}
