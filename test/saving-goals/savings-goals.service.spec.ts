import { Test, TestingModule } from '@nestjs/testing';
import { SavingsGoalsService } from 'src/savings-goals/savings-goals.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSavingsGoalDto } from 'src/savings-goals/dto/create-savings-goal.dto';
import { UpdateSavingsGoalDto } from 'src/savings-goals/dto/update-savings-goal.dto';

/**
 * Test suite for SavingsGoalsService
 *
 * @group unit
 * @group savings-goals
 * @description Tests all functionality of the savings goals service
 */
describe('SavingsGoalsService', () => {
  let service: SavingsGoalsService;

  const mockPrismaService = {
    savingGoal: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavingsGoalsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SavingsGoalsService>(SavingsGoalsService);

    jest.clearAllMocks();
  });

  /**
   * Test service initialization
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Tests for the create method
   *
   * @description Verifies savings goal creation functionality including validation logic
   */
  describe('create', () => {
    /**
     * Verify successful savings goal creation when all conditions are met
     */
    it('should create a savings goal when valid and not exists in the month', async () => {
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

      mockPrismaService.savingGoal.findFirst.mockResolvedValue(null);
      mockPrismaService.savingGoal.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);

      expect(mockPrismaService.savingGoal.findFirst).toHaveBeenCalledWith({
        where: {
          AND: [
            { userId: createDto.userId },
            {
              date: {
                gte: expect.any(Date),
                lt: expect.any(Date),
              },
            },
          ],
        },
      });

      expect(mockPrismaService.savingGoal.create).toHaveBeenCalledWith({
        data: {
          ...createDto,
          date: expect.any(Date),
        },
      });
    });

    /**
     * Verify validation for invalid date input
     */
    it('should throw an error if date is invalid', async () => {
      const createDto: CreateSavingsGoalDto = {
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('invalid date'),
        userId: 1,
      };

      await expect(service.create(createDto)).rejects.toThrow('Fecha inválida');
      expect(mockPrismaService.savingGoal.create).not.toHaveBeenCalled();
    });

    /**
     * Verify month uniqueness constraint validation
     */
    it('should throw an error if a goal already exists for the month', async () => {
      const date = new Date('2023-01-15');
      const createDto: CreateSavingsGoalDto = {
        value: 1000,
        percentaje: 20,
        status: false,
        date,
        userId: 1,
      };

      const existingGoal = {
        id: 2,
        value: 500,
        percentaje: 10,
        status: false,
        date: new Date('2023-01-05'),
        userId: 1,
      };

      mockPrismaService.savingGoal.findFirst.mockResolvedValue(existingGoal);

      await expect(service.create(createDto)).rejects.toThrow(
        'Ya existe un objetivo de ahorro para este mes',
      );
      expect(mockPrismaService.savingGoal.create).not.toHaveBeenCalled();
    });

    /**
     * Verify general error handling
     */
    it('should handle other errors gracefully', async () => {
      const date = new Date('2023-01-15');
      const createDto: CreateSavingsGoalDto = {
        value: 1000,
        percentaje: 20,
        status: false,
        date,
        userId: 1,
      };

      mockPrismaService.savingGoal.findFirst.mockResolvedValue(null);
      mockPrismaService.savingGoal.create.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.create(createDto)).rejects.toThrow(
        'Error al crear el objetivo de ahorro: Database error',
      );
    });
  });

  /**
   * Tests for the findAll method
   *
   * @description Verifies retrieval of savings goals for a user
   */
  describe('findAll', () => {
    /**
     * Verify retrieval of all savings goals for a user
     */
    it('should return all savings goals for a user', async () => {
      const userId = 1;
      const expectedGoals = [
        {
          id: 1,
          value: 1000,
          percentaje: 20,
          status: false,
          date: new Date('2023-01-15'),
          userId,
        },
      ];

      mockPrismaService.savingGoal.findMany.mockResolvedValue(expectedGoals);

      const result = await service.findAll(userId);

      expect(result).toEqual(expectedGoals);
      expect(mockPrismaService.savingGoal.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });

  /**
   * Tests for the findOne method
   *
   * @description Verifies retrieval of a specific savings goal by ID
   */
  describe('findOne', () => {
    /**
     * Verify successful retrieval of a savings goal by ID
     */
    it('should return a savings goal by id', async () => {
      const id = 1;
      const expectedGoal = {
        id,
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(expectedGoal);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedGoal);
      expect(mockPrismaService.savingGoal.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    /**
     * Verify error handling for non-existent savings goal
     */
    it('should throw an error if goal is not found', async () => {
      const id = 999;

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        'No se encontró el objetivo de ahorro',
      );
    });
  });

  /**
   * Tests for the update method
   *
   * @description Verifies savings goal update functionality
   */
  describe('update', () => {
    /**
     * Verify successful update of a savings goal
     */
    it('should update a savings goal', async () => {
      const id = 1;
      const updateDto: UpdateSavingsGoalDto = {
        value: 1500,
        status: true,
      };

      const existingGoal = {
        id,
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      const expectedResult = {
        ...existingGoal,
        ...updateDto,
      };

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(existingGoal);
      mockPrismaService.savingGoal.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.savingGoal.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.savingGoal.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });

    /**
     * Verify error handling for updating non-existent savings goal
     */
    it('should throw an error if goal is not found', async () => {
      const id = 999;
      const updateDto: UpdateSavingsGoalDto = {
        value: 1500,
      };

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(null);

      await expect(service.update(id, updateDto)).rejects.toThrow(
        'No se encontró el objetivo de ahorro',
      );
      expect(mockPrismaService.savingGoal.update).not.toHaveBeenCalled();
    });
  });

  /**
   * Tests for the remove method
   *
   * @description Verifies savings goal deletion functionality
   */
  describe('remove', () => {
    /**
     * Verify successful deletion of a savings goal
     */
    it('should delete a savings goal', async () => {
      const id = 1;
      const expectedResult = {
        id,
        value: 1000,
        percentaje: 20,
        status: false,
        date: new Date('2023-01-15'),
        userId: 1,
      };

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(expectedResult);
      mockPrismaService.savingGoal.delete.mockResolvedValue(expectedResult);

      const result = await service.remove(id);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.savingGoal.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockPrismaService.savingGoal.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    /**
     * Verify error handling for deleting non-existent savings goal
     */
    it('should throw an error if goal is not found', async () => {
      const id = 999;

      mockPrismaService.savingGoal.findUnique.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        'No se encontró el objetivo de ahorro',
      );
      expect(mockPrismaService.savingGoal.delete).not.toHaveBeenCalled();
    });
  });
});
