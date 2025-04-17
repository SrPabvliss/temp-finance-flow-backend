import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

/**
 * Test suite for UsersService
 *
 * @group unit
 * @group users
 * @description Tests all functionality of the users service
 */
describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

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
   * @description Verifies user creation functionality
   */
  describe('create', () => {
    /**
     * Verify successful user creation when email is unique
     */
    it('should create a user when email does not exist', async () => {
      const createDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test',
        lastname: 'User',
        password: 'password123',
      };

      const expectedResult = {
        id: 1,
        ...createDto,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: createDto.email },
      });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    /**
     * Verify error handling when email already exists
     */
    it('should throw an error when email already exists', async () => {
      const createDto: CreateUserDto = {
        email: 'existing@example.com',
        name: 'Existing',
        lastname: 'User',
        password: 'password123',
      };

      const existingUser = {
        id: 1,
        ...createDto,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);

      await expect(service.create(createDto)).rejects.toThrow(
        'Email already exists',
      );
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });

  /**
   * Tests for the findOne method
   *
   * @description Verifies user retrieval functionality
   */
  describe('findOne', () => {
    /**
     * Verify successful user retrieval by ID
     */
    it('should return a user by id when user exists', async () => {
      const id = 1;
      const expectedUser = {
        id,
        email: 'test@example.com',
        name: 'Test',
        lastname: 'User',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    /**
     * Verify error handling when user is not found
     */
    it('should throw an error when user is not found', async () => {
      const id = 999;

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow('User not found');
    });
  });

  /**
   * Tests for the update method
   *
   * @description Verifies user update functionality
   */
  describe('update', () => {
    /**
     * Verify successful user update
     */
    it('should update a user', async () => {
      const id = 1;
      const updateDto: UpdateUserDto = {
        name: 'Updated',
        lastname: 'Name',
      };

      const existingUser = {
        id,
        email: 'test@example.com',
        name: 'Test',
        lastname: 'User',
        password: 'password123',
      };

      const expectedResult = {
        id,
        email: 'test@example.com',
        name: 'Updated',
        lastname: 'Name',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });
  });
});
