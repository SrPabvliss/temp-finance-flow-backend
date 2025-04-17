import { Test, TestingModule } from '@nestjs/testing';
import { IncomesController } from 'src/incomes/incomes.controller';
import { IncomesService } from 'src/incomes/incomes.service';
import { CreateIncomeDto } from 'src/incomes/dto/create-income.dto';
import { UpdateIncomeDto } from 'src/incomes/dto/update-income.dto';

/**
 * Test suite for IncomesController
 *
 * @group unit
 * @group incomes
 * @description Tests all endpoints of the incomes controller
 */
describe('IncomesController', () => {
  let controller: IncomesController;

  const mockIncomesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getIncomeByUserId: jest.fn(),
    getReportByCtegory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomesController],
      providers: [
        {
          provide: IncomesService,
          useValue: mockIncomesService,
        },
      ],
    }).compile();

    controller = module.get<IncomesController>(IncomesController);

    jest.clearAllMocks();
  });

  /**
   * Test controller initialization
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Tests for the create endpoint
   *
   * @description Verifies income creation endpoint functionality
   */
  describe('create', () => {
    /**
     * Verify that the create endpoint calls service method with correct parameters
     */
    it('should create an income', async () => {
      const date = new Date();
      const createDto: CreateIncomeDto = {
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date,
        userId: 1,
        observation: 'Monthly salary',
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockIncomesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockIncomesService.create).toHaveBeenCalledWith(createDto);
    });
  });

  /**
   * Tests for the findAll endpoint
   *
   * @description Verifies income retrieval endpoint functionality
   */
  describe('findAll', () => {
    /**
     * Verify that the findAll endpoint calls service method with correct parameters
     */
    it('should return all incomes for a user', async () => {
      const userId = '1';
      const expectedIncomes = [
        {
          id: 1,
          description: 'Salary',
          value: 3000,
          typeId: 1,
          status: true,
          date: new Date(),
          userId: 1,
        },
      ];

      mockIncomesService.findAll.mockResolvedValue(expectedIncomes);

      const result = await controller.findAll(userId);

      expect(result).toEqual(expectedIncomes);
      expect(mockIncomesService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('getIncomeByUserId', () => {
    it('should return incomes for a user in a given month', async () => {
      const userId = '1';
      const year = '2023';
      const month = '1';

      const expectedResult = {
        total: 3000,
      };

      mockIncomesService.getIncomeByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getIncomeByUserId(year, userId, month);

      expect(result).toEqual(expectedResult);
      expect(mockIncomesService.getIncomeByUserId).toHaveBeenCalledWith(
        2023,
        1,
        1,
      );
    });
  });

  describe('findOne', () => {
    it('should return an income by id', async () => {
      const id = '1';
      const expectedIncome = {
        id: 1,
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockIncomesService.findOne.mockResolvedValue(expectedIncome);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedIncome);
      expect(mockIncomesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an income', async () => {
      const id = '1';
      const updateDto: UpdateIncomeDto = {
        description: 'Updated salary',
        value: 3500,
      };

      const expectedResult = {
        id: 1,
        description: 'Updated salary',
        value: 3500,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockIncomesService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockIncomesService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an income', async () => {
      const id = '1';
      const expectedResult = {
        id: 1,
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockIncomesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockIncomesService.remove).toHaveBeenCalledWith(1);
    });
  });

  /**
   * Tests for the getReportByCategory endpoint
   *
   * @description Verifies category-based income report endpoint functionality
   */
  describe('getReportByCategory', () => {
    /**
     * Verify that the getReportByCategory endpoint calls service method with correct parameters
     */
    it('should return incomes grouped by category', async () => {
      const userId = '1';
      const year = '2023';
      const month = '1';

      const expectedReport = [
        {
          type: { id: 1, name: 'Salary', isGlobal: false, userId: 1 },
          total: 3000,
        },
        {
          type: { id: 2, name: 'Investments', isGlobal: true, userId: null },
          total: 500,
        },
      ];

      mockIncomesService.getReportByCtegory.mockResolvedValue(expectedReport);

      const result = await controller.getReportByCategory(year, userId, month);

      expect(result).toEqual(expectedReport);
      expect(mockIncomesService.getReportByCtegory).toHaveBeenCalledWith(
        2023,
        1,
        1,
      );
    });
  });
});
