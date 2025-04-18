import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service for database operations using Prisma ORM
 *
 * @class
 * @description Handles database connection lifecycle and provides access to Prisma client
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 * @implements {OnModuleDestroy}
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Create a new PrismaService instance
   *
   * @constructor
   * @description Initializes PrismaClient with logging configuration
   */
  constructor() {
    super({ log: ['warn', 'error'] });
  }

  /**
   * Connect to the database when the module initializes
   *
   * @returns {Promise<void>}
   * @description Establishes database connection when the NestJS module initializes
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Disconnect from the database when the module is destroyed
   *
   * @returns {Promise<void>}
   * @description Closes database connection when the NestJS module is destroyed
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
