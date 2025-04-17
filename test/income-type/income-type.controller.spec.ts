import { Test, TestingModule } from '@nestjs/testing';
import { IncomeTypeController } from 'src/income-type/income-type.controller';
import { IncomeTypeService } from 'src/income-type/income-type.service';
import { CreateIncomeTypeDto } from 'src/income-type/dto/create-income-type.dto';

describe('IncomeTypeController', () => {
  let controller: IncomeTypeController;

  const mockIncomeTypeService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeTypeController],
      providers: [
        {
          provide: IncomeTypeService,
          useValue: mockIncomeTypeService,
        },
      ],
    }).compile();

    controller = module.get<IncomeTypeController>(IncomeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
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

      mockIncomeTypeService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockIncomeTypeService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all income types for a user', async () => {
      const userId = '1';
      const expectedTypes = [
        { id: 1, name: 'Salary', isGlobal: false, userId: 1 },
        { id: 2, name: 'Investments', isGlobal: true, userId: null },
      ];

      mockIncomeTypeService.findAll.mockResolvedValue(expectedTypes);

      const result = await controller.findAll(userId);

      expect(result).toEqual(expectedTypes);
      expect(mockIncomeTypeService.findAll).toHaveBeenCalledWith(1);
    });
  });
});
