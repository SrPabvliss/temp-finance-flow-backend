import { Test, TestingModule } from '@nestjs/testing';
import { TotalController } from 'src/total/total.controller';
import { TotalService } from 'src/total/total.service';

describe('TotalController', () => {
  let controller: TotalController;

  const mockTotalService = {
    getTotal: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalController],
      providers: [
        {
          provide: TotalService,
          useValue: mockTotalService,
        },
      ],
    }).compile();

    controller = module.get<TotalController>(TotalController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTotal', () => {
    it('should return the total balance for a user in a specific month and year', async () => {
      const userId = '1';
      const year = '2023';
      const month = '1';

      const expectedResult = {
        total: 1500,
        month: 1,
        year: 2023,
      };

      mockTotalService.getTotal.mockResolvedValue(expectedResult);

      const result = await controller.getTotal(userId, year, month);

      expect(result).toEqual(expectedResult);
      expect(mockTotalService.getTotal).toHaveBeenCalledWith(1, 2023, 1);
    });

    it('should correctly convert string parameters to numbers', async () => {
      const userId = '12';
      const year = '2024';
      const month = '6';

      await controller.getTotal(userId, year, month);

      expect(mockTotalService.getTotal).toHaveBeenCalledWith(12, 2024, 6);
    });
  });
});
