import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from 'src/expenses/expenses.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from 'src/expenses/dto/create-expense.dto';
import { UpdateExpenseDto } from 'src/expenses/dto/update-expense.dto';
import { AppError } from 'src/shared/app.error';
import { Errors } from 'src/shared/errors';

describe('ExpensesService', () => {
  let service: ExpensesService;

  const mockPrismaService = {
    expense: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
    expenseType: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockPrismaService.expense.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.expense.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all expenses for a user with their types', async () => {
      const userId = 1;
      const expectedExpenses = [
        {
          id: 1,
          description: 'Groceries',
          value: 100,
          typeId: 1,
          status: true,
          date: new Date(),
          userId,
          type: { id: 1, name: 'Food', isGlobal: false, userId },
        },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(expectedExpenses);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedExpenses);
      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { type: true },
      });
    });
  });

  describe('getExpenseByUserId', () => {
    it('should return the total expenses for a user in a given month', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 1);

      mockPrismaService.expense.aggregate.mockResolvedValue({
        _sum: { value: 350 },
      });

      const result = await service.getExpenseByUserId(year, userId, month);

      expect(result).toEqual({ total: 350 });
      expect(mockPrismaService.expense.aggregate).toHaveBeenCalledWith({
        _sum: { value: true },
        where: {
          userId,
          date: {
            gte: expect.any(Date),
            lt: expect.any(Date),
          },
        },
      });

      const call = mockPrismaService.expense.aggregate.mock.calls[0][0];
      expect(call.where.date.gte.getTime()).toBe(startOfMonth.getTime());
      expect(call.where.date.lt.getTime()).toBe(endOfMonth.getTime());
    });

    it('should return 0 when no expenses are found', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockPrismaService.expense.aggregate.mockResolvedValue({
        _sum: { value: null },
      });

      const result = await service.getExpenseByUserId(year, userId, month);

      expect(result).toEqual({ total: 0 });
    });
  });

  describe('findOne', () => {
    it('should return an expense by id', async () => {
      const id = 1;
      const expectedExpense = {
        id,
        description: 'Groceries',
        value: 100,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(expectedExpense);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedExpense);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const id = 1;
      const updateDto: UpdateExpenseDto = {
        description: 'Updated groceries',
        value: 150,
      };

      const expectedResult = {
        id,
        description: 'Updated groceries',
        value: 150,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockPrismaService.expense.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete an expense', async () => {
      const id = 1;
      const expectedResult = {
        id,
        description: 'Groceries',
        value: 100,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(expectedResult);
      mockPrismaService.expense.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.expense.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error if expense is not found', async () => {
      const id = 999;

      mockPrismaService.expense.findUnique.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        new AppError('Expense not found', Errors.NOT_FOUND),
      );
      expect(mockPrismaService.expense.delete).not.toHaveBeenCalled();
    });
  });

  describe('getReportByCategory', () => {
    it('should return expenses grouped by category', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      const groupedExpenses = [
        { typeId: 1, _sum: { value: 200 } },
        { typeId: 2, _sum: { value: 150 } },
      ];

      const expenseTypes = [
        { id: 1, name: 'Food', isGlobal: false, userId: 1 },
        { id: 2, name: 'Transport', isGlobal: true, userId: null },
      ];

      const expectedReport = [
        {
          type: expenseTypes[0],
          total: 200,
        },
        {
          type: expenseTypes[1],
          total: 150,
        },
      ];

      mockPrismaService.expense.groupBy.mockResolvedValue(groupedExpenses);
      mockPrismaService.expenseType.findMany.mockResolvedValue(expenseTypes);

      const result = await service.getReportByCategory(year, userId, month);

      expect(result).toEqual(expectedReport);
      expect(mockPrismaService.expense.groupBy).toHaveBeenCalledWith({
        by: ['typeId'],
        _sum: { value: true },
        where: {
          userId,
          date: {
            gte: expect.any(Date),
            lt: expect.any(Date),
          },
        },
      });

      expect(mockPrismaService.expenseType.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: [1, 2],
          },
        },
      });
    });

    it('should handle null values in the sum', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      const groupedExpenses = [{ typeId: 1, _sum: { value: null } }];

      const expenseTypes = [
        { id: 1, name: 'Food', isGlobal: false, userId: 1 },
      ];

      const expectedReport = [
        {
          type: expenseTypes[0],
          total: 0,
        },
      ];

      mockPrismaService.expense.groupBy.mockResolvedValue(groupedExpenses);
      mockPrismaService.expenseType.findMany.mockResolvedValue(expenseTypes);

      const result = await service.getReportByCategory(year, userId, month);

      expect(result).toEqual(expectedReport);
    });
  });
});
