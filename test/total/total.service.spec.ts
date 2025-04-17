import { Test, TestingModule } from '@nestjs/testing';
import { TotalService } from 'src/total/total.service';
import { IncomesService } from 'src/incomes/incomes.service';
import { ExpensesService } from 'src/expenses/expenses.service';

describe('TotalService', () => {
  let service: TotalService;

  const mockIncomesService = {
    getIncomeByUserId: jest.fn(),
  };

  const mockExpensesService = {
    getExpenseByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TotalService,
        { provide: IncomesService, useValue: mockIncomesService },
        { provide: ExpensesService, useValue: mockExpensesService },
      ],
    }).compile();

    service = module.get<TotalService>(TotalService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTotal', () => {
    it('should calculate the total balance correctly (income - expense)', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockIncomesService.getIncomeByUserId.mockResolvedValue({ total: 3000 });
      mockExpensesService.getExpenseByUserId.mockResolvedValue({ total: 1500 });

      const result = await service.getTotal(userId, year, month);

      expect(result).toEqual({
        total: 1500,
        month,
        year,
      });

      expect(mockIncomesService.getIncomeByUserId).toHaveBeenCalledWith(
        year,
        userId,
        month,
      );
      expect(mockExpensesService.getExpenseByUserId).toHaveBeenCalledWith(
        year,
        userId,
        month,
      );
    });

    it('should handle case when there is no income', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockIncomesService.getIncomeByUserId.mockResolvedValue({ total: 0 });
      mockExpensesService.getExpenseByUserId.mockResolvedValue({ total: 1500 });

      const result = await service.getTotal(userId, year, month);

      expect(result).toEqual({
        total: -1500,
        month,
        year,
      });
    });

    it('should handle case when there are no expenses', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockIncomesService.getIncomeByUserId.mockResolvedValue({ total: 3000 });
      mockExpensesService.getExpenseByUserId.mockResolvedValue({ total: 0 });

      const result = await service.getTotal(userId, year, month);

      expect(result).toEqual({
        total: 3000,
        month,
        year,
      });
    });

    it('should handle case when both income and expenses are zero', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockIncomesService.getIncomeByUserId.mockResolvedValue({ total: 0 });
      mockExpensesService.getExpenseByUserId.mockResolvedValue({ total: 0 });

      const result = await service.getTotal(userId, year, month);

      expect(result).toEqual({
        total: 0,
        month,
        year,
      });
    });

    it('should handle null values and default to zero', async () => {
      const userId = 1;
      const year = 2023;
      const month = 1;

      mockIncomesService.getIncomeByUserId.mockResolvedValue({ total: null });
      mockExpensesService.getExpenseByUserId.mockResolvedValue({ total: null });

      const result = await service.getTotal(userId, year, month);

      expect(result).toEqual({
        total: 0,
        month,
        year,
      });
    });
  });
});
