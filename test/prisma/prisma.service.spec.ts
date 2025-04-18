import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Test suite for PrismaService
 *
 * @group unit
 * @group prisma
 * @description Tests functionality of the prisma service including lifecycle hooks
 */
describe('PrismaService', () => {
  let service: PrismaService;

  // Mock para los métodos de Prisma
  const mockPrismaClient = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    // Reemplazar los métodos reales con los mocks
    service.$connect = mockPrismaClient.$connect;
    service.$disconnect = mockPrismaClient.$disconnect;

    jest.clearAllMocks();
  });

  /**
   * Test service initialization
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Tests for the onModuleInit method
   *
   * @description Verifies database connection is established during module initialization
   */
  describe('onModuleInit', () => {
    /**
     * Verify that the database connection is established on module init
     */
    it('should connect to the database on module init', async () => {
      await service.onModuleInit();
      expect(mockPrismaClient.$connect).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Tests for the onModuleDestroy method
   *
   * @description Verifies database connection is properly closed during module destruction
   */
  describe('onModuleDestroy', () => {
    /**
     * Verify that the database connection is closed on module destroy
     */
    it('should disconnect from the database on module destroy', async () => {
      await service.onModuleDestroy();
      expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
