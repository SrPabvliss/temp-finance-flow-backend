import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseTypeDto } from 'src/expense-type/dto/create-expense-type.dto';
import { ExpenseTypeController } from 'src/expense-type/expense-type.controller';
import { ExpenseTypeService } from 'src/expense-type/expense-type.service';

/**
 * Test suite for ExpenseTypeController
 *
 * @group unit
 * @group expense-type
 * @description Tests all endpoints of the expense type controller
 */
describe('ExpenseTypeController', () => {
  let controller: ExpenseTypeController;

  const mockExpenseTypeService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseTypeController],
      providers: [
        {
          provide: ExpenseTypeService,
          useValue: mockExpenseTypeService,
        },
      ],
    }).compile();

    controller = module.get<ExpenseTypeController>(ExpenseTypeController);
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
   * @description Verifies expense type creation endpoint functionality
   */
  describe('create', () => {
    /**
     * Verify that the create endpoint calls service method with correct parameters
     */
    it('should create an expense type', async () => {
      const createDto: CreateExpenseTypeDto = {
        name: 'Food',
        isGlobal: false,
        userId: 1,
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockExpenseTypeService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockExpenseTypeService.create).toHaveBeenCalledWith(createDto);
    });
  });

  /**
   * Tests for the findAll endpoint
   *
   * @description Verifies expense type retrieval endpoint functionality
   */
  describe('findAll', () => {
    /**
     * Verify that the findAll endpoint calls service method with correct parameters
     */
    it('should return all expense types for a user', async () => {
      const userId = '1';
      const expectedTypes = [
        { id: 1, name: 'Food', isGlobal: false, userId: 1 },
        { id: 2, name: 'Transport', isGlobal: true, userId: null },
      ];

      mockExpenseTypeService.findAll.mockResolvedValue(expectedTypes);

      const result = await controller.findAll(userId);

      expect(result).toEqual(expectedTypes);
      expect(mockExpenseTypeService.findAll).toHaveBeenCalledWith(1);
    });
  });
});
