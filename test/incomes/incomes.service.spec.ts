import { Test, TestingModule } from '@nestjs/testing';
import { IncomesService } from 'src/incomes/incomes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIncomeDto } from 'src/incomes/dto/create-income.dto';
import { UpdateIncomeDto } from 'src/incomes/dto/update-income.dto';

describe('IncomesService', () => {
  let service: IncomesService;

  const mockPrismaService = {
    income: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
    incomeType: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<IncomesService>(IncomesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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

      mockPrismaService.income.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.income.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all incomes for a user with their types', async () => {
      const userId = 1;
      const expectedIncomes = [
        {
          id: 1,
          description: 'Salary',
          value: 3000,
          typeId: 1,
          status: true,
          date: new Date(),
          userId,
          type: { id: 1, name: 'Salary', isGlobal: false, userId },
        },
      ];

      mockPrismaService.income.findMany.mockResolvedValue(expectedIncomes);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedIncomes);
      expect(mockPrismaService.income.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { type: true },
      });
    });
  });

  describe('getIncomeByUserId', () => {
    it('should return the total incomes for a user in a given month', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1; // January

      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 1);

      mockPrismaService.income.aggregate.mockResolvedValue({
        _sum: { value: 3000 },
      });

      const result = await service.getIncomeByUserId(year, userId, month);

      expect(result).toEqual({ total: 3000 });
      expect(mockPrismaService.income.aggregate).toHaveBeenCalledWith({
        _sum: { value: true },
        where: {
          userId,
          date: {
            gte: expect.any(Date),
            lt: expect.any(Date),
          },
          status: true,
        },
      });

      const call = mockPrismaService.income.aggregate.mock.calls[0][0];
      expect(call.where.date.gte.getTime()).toBe(startOfMonth.getTime());
      expect(call.where.date.lt.getTime()).toBe(endOfMonth.getTime());
    });

    it('should return 0 when no incomes are found', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockPrismaService.income.aggregate.mockResolvedValue({
        _sum: { value: null },
      });

      const result = await service.getIncomeByUserId(year, userId, month);

      expect(result).toEqual({ total: 0 });
    });
  });

  describe('findOne', () => {
    it('should return an income by id', async () => {
      const id = 1;
      const expectedIncome = {
        id,
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockPrismaService.income.findUnique.mockResolvedValue(expectedIncome);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedIncome);
      expect(mockPrismaService.income.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error if income not found', async () => {
      const id = 999;

      mockPrismaService.income.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow('Income not found');
    });
  });

  describe('update', () => {
    it('should update an income', async () => {
      const id = 1;
      const updateDto: UpdateIncomeDto = {
        description: 'Updated salary',
        value: 3500,
      };

      const existingIncome = {
        id,
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      const expectedResult = {
        ...existingIncome,
        ...updateDto,
      };

      mockPrismaService.income.findUnique.mockResolvedValue(existingIncome);
      mockPrismaService.income.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.income.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.income.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });

    it('should throw an error if income not found', async () => {
      const id = 999;
      const updateDto: UpdateIncomeDto = {
        description: 'Updated salary',
      };

      mockPrismaService.income.findUnique.mockResolvedValue(null);

      await expect(service.update(id, updateDto)).rejects.toThrow(
        'Income not found',
      );
      expect(mockPrismaService.income.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete an income', async () => {
      const id = 1;
      const expectedResult = {
        id,
        description: 'Salary',
        value: 3000,
        typeId: 1,
        status: true,
        date: new Date(),
        userId: 1,
      };

      mockPrismaService.income.findUnique.mockResolvedValue(expectedResult);
      mockPrismaService.income.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.income.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.income.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error if income is not found', async () => {
      const id = 999;

      mockPrismaService.income.findUnique.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow('Income not found');
      expect(mockPrismaService.income.delete).not.toHaveBeenCalled();
    });
  });

  describe('getReportByCtegory', () => {
    it('should return incomes grouped by category', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      const groupedIncomes = [
        { typeId: 1, _sum: { value: 3000 } },
        { typeId: 2, _sum: { value: 500 } },
      ];

      const incomeTypes = [
        { id: 1, name: 'Salary', isGlobal: false, userId: 1 },
        { id: 2, name: 'Investments', isGlobal: true, userId: null },
      ];

      const expectedReport = [
        {
          type: incomeTypes[0],
          total: 3000,
        },
        {
          type: incomeTypes[1],
          total: 500,
        },
      ];

      mockPrismaService.income.groupBy.mockResolvedValue(groupedIncomes);
      mockPrismaService.incomeType.findMany.mockResolvedValue(incomeTypes);

      const result = await service.getReportByCtegory(year, userId, month);

      expect(result).toEqual(expectedReport);
      expect(mockPrismaService.income.groupBy).toHaveBeenCalledWith({
        by: ['typeId'],
        _sum: { value: true },
        where: {
          userId,
          date: {
            gte: expect.any(Date),
            lt: expect.any(Date),
          },
          status: true,
        },
      });

      expect(mockPrismaService.incomeType.findMany).toHaveBeenCalledWith({
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

      const groupedIncomes = [{ typeId: 1, _sum: { value: null } }];

      const incomeTypes = [
        { id: 1, name: 'Salary', isGlobal: false, userId: 1 },
      ];

      const expectedReport = [
        {
          type: incomeTypes[0],
          total: 0,
        },
      ];

      mockPrismaService.income.groupBy.mockResolvedValue(groupedIncomes);
      mockPrismaService.incomeType.findMany.mockResolvedValue(incomeTypes);

      const result = await service.getReportByCtegory(year, userId, month);

      expect(result).toEqual(expectedReport);
    });
  });
});
