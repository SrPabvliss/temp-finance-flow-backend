import { Test, TestingModule } from '@nestjs/testing';
import { CreateIncomeTypeDto } from 'src/income-type/dto/create-income-type.dto';
import { IncomeTypeService } from 'src/income-type/income-type.service';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Test suite for IncomeTypeService
 *
 * @group unit
 * @group income-type
 * @description Tests all functionality of the income type service
 */
describe('IncomeTypeService', () => {
  let service: IncomeTypeService;

  const mockPrismaService = {
    incomeType: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeTypeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<IncomeTypeService>(IncomeTypeService);
  });

  /**
   * Test service initialization
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Tests for the create method
   *
   * @description Verifies income type creation functionality
   */
  describe('create', () => {
    /**
     * Verify successful income type creation
     */
    it('should create an income type', async () => {
      const createDto: CreateIncomeTypeDto = {
        name: 'Salary',
        isGlobal: false,
        userId: 1,
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockPrismaService.incomeType.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.incomeType.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  /**
   * Tests for the findAll method
   *
   * @description Verifies retrieval of income types for a user
   */
  describe('findAll', () => {
    /**
     * Verify retrieval of both global and user-specific income types
     */
    it('should return all income types for a user', async () => {
      const userId = 1;
      const expectedTypes = [
        { id: 1, name: 'Salary', isGlobal: false, userId },
        { id: 2, name: 'Investments', isGlobal: true, userId: null },
      ];

      mockPrismaService.incomeType.findMany.mockResolvedValue(expectedTypes);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedTypes);
      expect(mockPrismaService.incomeType.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ isGlobal: true }, { isGlobal: false, userId }],
        },
      });
    });
  });
});
