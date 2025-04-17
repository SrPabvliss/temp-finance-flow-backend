import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseTypeDto } from 'src/expense-type/dto/create-expense-type.dto';
import { ExpenseTypeService } from 'src/expense-type/expense-type.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ExpenseTypeService', () => {
  let service: ExpenseTypeService;

  const mockPrismaService = {
    expenseType: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseTypeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExpenseTypeService>(ExpenseTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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

      mockPrismaService.expenseType.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.expenseType.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all expense types for a user', async () => {
      const userId = 1;
      const expectedTypes = [
        { id: 1, name: 'Food', isGlobal: false, userId },
        { id: 2, name: 'Transport', isGlobal: true, userId: null },
      ];

      mockPrismaService.expenseType.findMany.mockResolvedValue(expectedTypes);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedTypes);
      expect(mockPrismaService.expenseType.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ isGlobal: true }, { isGlobal: false, userId }],
        },
      });
    });
  });
});
