import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

/**
 * Test suite for UsersController
 *
 * @group unit
 * @group users
 * @description Tests all endpoints of the users controller
 */
describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

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
   * @description Verifies user creation endpoint functionality
   */
  describe('create', () => {
    /**
     * Verify that the create endpoint calls service method with correct parameters
     */
    it('should create a user', async () => {
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

      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.create).toHaveBeenCalledWith(createDto);
    });
  });

  /**
   * Tests for the findOne endpoint
   *
   * @description Verifies user retrieval endpoint functionality
   */
  describe('findOne', () => {
    /**
     * Verify that the findOne endpoint calls service method with correct parameters
     */
    it('should return a user by id', async () => {
      const id = '1';
      const expectedUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
        lastname: 'User',
        password: 'password123',
      };

      mockUsersService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedUser);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  /**
   * Tests for the update endpoint
   *
   * @description Verifies user update endpoint functionality
   */
  describe('update', () => {
    /**
     * Verify that the update endpoint calls service method with correct parameters
     */
    it('should update a user', async () => {
      const id = '1';
      const updateDto: UpdateUserDto = {
        name: 'Updated',
        lastname: 'Name',
      };

      const expectedResult = {
        id: 1,
        email: 'test@example.com',
        name: 'Updated',
        lastname: 'Name',
        password: 'password123',
      };

      mockUsersService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });
});
