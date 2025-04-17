import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseTypeDto } from 'src/expense-type/dto/create-expense-type.dto';
import { ExpenseTypeController } from 'src/expense-type/expense-type.controller';
import { ExpenseTypeService } from 'src/expense-type/expense-type.service';

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockExpenseTypeService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockExpenseTypeService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
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
