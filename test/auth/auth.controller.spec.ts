import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto';

/**
 * Test suite for AuthController
 *
 * @group unit
 * @group auth
 * @description Tests all endpoints of the authentication controller
 */
describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  /**
   * Test controller initialization
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Tests for the login endpoint
   *
   * @description Verifies the login endpoint functionality
   */
  describe('login', () => {
    /**
     * Verify that login endpoint calls service method with correct parameters
     */
    it('should call authService.login with login dto', async () => {
      const loginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        token: 'test-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test',
          lastname: 'User',
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  /**
   * Tests for the signUp endpoint
   *
   * @description Verifies the registration endpoint functionality
   */
  describe('signUp', () => {
    /**
     * Verify that signUp endpoint calls service method with correct parameters
     */
    it('should call authService.signUp with signup dto', async () => {
      const signUpDto: SignUpDto = {
        email: 'new@example.com',
        password: 'password123',
        name: 'New',
        lastname: 'User',
      };

      const expectedResult = {
        token: 'test-token',
        user: {
          id: 1,
          email: 'new@example.com',
          name: 'New',
          lastname: 'User',
        },
      };

      mockAuthService.signUp.mockResolvedValue(expectedResult);

      const result = await controller.signUp(signUpDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });
});
