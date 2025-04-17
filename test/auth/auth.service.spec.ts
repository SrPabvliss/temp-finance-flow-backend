import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto';

/**
 * Test suite for AuthService
 *
 * @group unit
 * @group auth
 * @description Tests all functionality of the authentication service
 */
describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Tests for the login method
   *
   * @description Verifies login functionality with various inputs
   */
  describe('login', () => {
    /**
     * Verify successful login with valid credentials
     */
    it('should return token and user when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        name: 'Test',
        lastname: 'User',
      };

      const loginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        token: 'test-token',
        user: mockUser,
      });
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
    });

    /**
     * Verify error is thrown when user is not found
     */
    it('should throw an error when user is not found', async () => {
      const loginDto: AuthLoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow('User not found');
    });

    /**
     * Verify error is thrown when password is incorrect
     */
    it('should throw an error when password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'correctpassword',
        name: 'Test',
        lastname: 'User',
      };

      const loginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.login(loginDto)).rejects.toThrow('Invalid password');
    });
  });

  /**
   * Tests for the signUp method
   *
   * @description Verifies user registration functionality
   */
  describe('signUp', () => {
    /**
     * Verify successful user creation
     */
    it('should create a new user and return token and user', async () => {
      const signUpDto: SignUpDto = {
        email: 'new@example.com',
        password: 'password123',
        name: 'New',
        lastname: 'User',
      };

      const createdUser = {
        id: 1,
        ...signUpDto,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        token: 'test-token',
        user: createdUser,
      });
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: signUpDto.email },
      });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: signUpDto,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: createdUser.email,
        sub: createdUser.id,
      });
    });

    /**
     * Verify error is thrown when user already exists
     */
    it('should throw an error when user already exists', async () => {
      const signUpDto = {
        email: 'new@example.com',
        name: 'New',
        lastname: 'User',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'new@example.com',
      });

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        'User already exists',
      );

      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });
});
