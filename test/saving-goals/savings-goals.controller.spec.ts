import { Test, TestingModule } from '@nestjs/testing';
import { SavingsGoalsController } from 'src/savings-goals/savings-goals.controller';
import { SavingsGoalsService } from 'src/savings-goals/savings-goals.service';
import { CreateSavingsGoalDto } from 'src/savings-goals/dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from 'src/savings-goals/dto/update-savings-goal.dto';

/**
 * Test suite for SavingsGoalsController
 *
 * @group unit
 * @group savings-goals
 * @description Tests all endpoints of the savings goals controller
 */
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

  /**
   * Test controller initialization
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Tests for the create endpoint
   *
   * @description Verifies savings goal creation endpoint functionality
   */
  describe('create', () => {
    /**
     * Verify that the create endpoint calls service method with correct parameters
     */
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

  /**
   * Tests for the findAll endpoint
   *
   * @description Verifies retrieval of savings goals for a user
   */
  describe('findAll', () => {
    /**
     * Verify that the findAll endpoint calls service method with correct parameters
     */
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

  /**
   * Tests for the findOne endpoint
   *
   * @description Verifies retrieval of a specific savings goal by ID
   */
  describe('findOne', () => {
    /**
     * Verify that the findOne endpoint calls service method with correct parameters
     */
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

  /**
   * Tests for the update endpoint
   *
   * @description Verifies savings goal update endpoint functionality
   */
  describe('update', () => {
    /**
     * Verify that the update endpoint calls service method with correct parameters
     */
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

  /**
   * Tests for the remove endpoint
   *
   * @description Verifies savings goal deletion endpoint functionality
   */
  describe('remove', () => {
    /**
     * Verify that the remove endpoint calls service method with correct parameters
     */
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
