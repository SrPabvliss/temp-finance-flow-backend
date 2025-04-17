import { Test, TestingModule } from '@nestjs/testing';
import { SavingsGoalsController } from 'src/savings-goals/savings-goals.controller';
import { SavingsGoalsService } from 'src/savings-goals/savings-goals.service';
import { CreateSavingsGoalDto } from 'src/savings-goals/dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from 'src/savings-goals/dto/update-savings-goal.dto';

describe('SavingsGoalsController', () => {
  let controller: SavingsGoalsController;

  const mockSavingsGoalsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingsGoalsController],
      providers: [
        {
          provide: SavingsGoalsService,
          useValue: mockSavingsGoalsService,
        },
      ],
    }).compile();

    controller = module.get<SavingsGoalsController>(SavingsGoalsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a savings goal', async () => {
      const date = new Date('2023-01-15');
      const createDto: CreateSavingsGoalDto = {
        value: 1000,
        percentaje: 20,
        status: false,
        date,
        userId: 1,
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockSavingsGoalsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockSavingsGoalsService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all savings goals for a user', async () => {
      const userId = '1';
      const expectedGoals = [
        {
          id: 1,
          value: 1000,
          percentaje: 20,
          status: false,
          date: new Date('2023-01-15'),
          userId: 1,
        },
      ];

      mockSavingsGoalsService.findAll.mockResolvedValue(expectedGoals);

      const result = await controller.findAll(userId);

      expect(result).toEqual(expectedGoals);
      expect(mockSavingsGoalsService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should return a savings goal by id', async () => {
      const id = '1';
      const expectedGoal = {
        id: 1,
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      mockSavingsGoalsService.findOne.mockResolvedValue(expectedGoal);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedGoal);
      expect(mockSavingsGoalsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a savings goal', async () => {
      const id = '1';
      const updateDto: UpdateSavingsGoalDto = {
        value: 1500,
        status: true,
      };

      const expectedResult = {
        id: 1,
        value: 1500,
        percentaje: 20,
        status: true,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      mockSavingsGoalsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockSavingsGoalsService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a savings goal', async () => {
      const id = '1';
      const expectedResult = {
        id: 1,
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      mockSavingsGoalsService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockSavingsGoalsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
