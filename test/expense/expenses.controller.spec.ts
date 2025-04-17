import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from 'src/expenses/expenses.controller';
import { ExpensesService } from 'src/expenses/expenses.service';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { UpdateExpenseDto } from 'src/expenses/dto/update-expense.dto';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  const mockExpensesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getExpenseByUserId: jest.fn(),
    getReportByCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: mockExpensesService,
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      const date = new Date();
      const createDto: CreateExpenseDto = {
        description: 'Groceries',
        value: 100,
        typeId: 1,
        status: true,
        date,
        userId: 1,
        observation: 'Weekly groceries',
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockExpensesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockExpensesService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all expenses for a user', async () => {
      const userId = '1';
      const expectedExpenses = [
        {
          id: 1,
          description: 'Groceries',
          value: 100,
          typeId: 1,
          status: true,
          date: new Date(),
          userId: 1,
        },
      ];

      mockExpensesService.findAll.mockResolvedValue(expectedExpenses);

      const result = await controller.findAll(userId);

      expect(result).toEqual(expectedExpenses);
      expect(mockExpensesService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should return an expense by id', async () => {
      const id = '1';
      const expectedExpense = {
        id: 1,
        description: 'Groceries',
        value: 100,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockExpensesService.findOne.mockResolvedValue(expectedExpense);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedExpense);
      expect(mockExpensesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const id = '1';
      const updateDto: UpdateExpenseDto = {
        description: 'Updated groceries',
        value: 150,
      };

      const expectedResult = {
        id: 1,
        description: 'Updated groceries',
        value: 150,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockExpensesService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockExpensesService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an expense', async () => {
      const id = '1';
      const expectedResult = {
        id: 1,
        description: 'Groceries',
        value: 100,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockExpensesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockExpensesService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('getExpenseByUserId', () => {
    it('should return expenses for a user in a given month', async () => {
      const userId = '1';
      const year = '2023';
      const month = '1';

      const expectedResult = {
        total: 350,
      };

      mockExpensesService.getExpenseByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getExpenseByUserId(year, userId, month);

      expect(result).toEqual(expectedResult);
      expect(mockExpensesService.getExpenseByUserId).toHaveBeenCalledWith(
        2023,
        1,
        1,
      );
    });
  });

  describe('getReportByCategory', () => {
    it('should return expenses grouped by category', async () => {
      const userId = '1';
      const year = '2023';
      const month = '1';

      const expectedReport = [
        {
          type: { id: 1, name: 'Food', isGlobal: false, userId: 1 },
          total: 200,
        },
        {
          type: { id: 2, name: 'Transport', isGlobal: true, userId: null },
          total: 150,
        },
      ];

      mockExpensesService.getReportByCategory.mockResolvedValue(expectedReport);

      const result = await controller.getReportByCategory(year, userId, month);

      expect(result).toEqual(expectedReport);
      expect(mockExpensesService.getReportByCategory).toHaveBeenCalledWith(
        2023,
        1,
        1,
      );
    });
  });
});
