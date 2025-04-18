import { ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { AllExceptionFilter } from 'src/shared/all-exception-filter';

/**
 * Test suite for AllExceptionFilter
 *
 * @group unit
 * @group shared
 * @description Tests error handling functionality of the global exception filter
 */
describe('AllExceptionFilter', () => {
  let filter: AllExceptionFilter;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: ArgumentsHost;

  // Silenciar logs durante las pruebas
  const originalLoggerError = Logger.error;

  beforeAll(() => {
    Logger.error = jest.fn();
  });

  afterAll(() => {
    Logger.error = originalLoggerError;
  });

  beforeEach(() => {
    // Crear mocks para las respuestas HTTP
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse = {
      status: mockStatus,
    };

    mockRequest = {
      method: 'GET',
      path: '/test-path',
    };

    // Crear un mock adecuado para ArgumentsHost
    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
      getType: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    } as unknown as ArgumentsHost;

    filter = new AllExceptionFilter();
  });

  /**
   * Test filter initialization
   */
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  /**
   * Tests for exception handling with status code
   */
  describe('exception with status', () => {
    /**
     * Verify exception with status code is handled correctly
     */
    it('should handle exception with status code', () => {
      const exception = {
        status: HttpStatus.NOT_FOUND,
        message: 'Resource not found',
      };

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockJson).toHaveBeenCalledWith({
        status: HttpStatus.NOT_FOUND,
        message: 'Resource not found',
      });
    });
  });

  /**
   * Tests for exception handling without status code
   */
  describe('exception without status', () => {
    /**
     * Verify exception without status code defaults to BAD_REQUEST
     */
    it('should default to BAD_REQUEST when status is not provided', () => {
      const exception = {
        message: 'Generic error',
      };

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith({
        status: HttpStatus.BAD_REQUEST,
        message: 'Generic error',
      });
    });
  });

  /**
   * Tests for exception with nested response message
   */
  describe('exception with response object', () => {
    /**
     * Verify exception with nested response message is handled correctly
     */
    it('should extract message from response object if available', () => {
      const exception = {
        status: HttpStatus.BAD_REQUEST,
        response: {
          message: 'Validation failed',
        },
      };

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith({
        status: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
      });
    });
  });

  /**
   * Tests for exception without any message
   */
  describe('exception without message', () => {
    /**
     * Verify default message is used when no message is provided
     */
    it('should use default message when no message is provided', () => {
      const exception = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };

      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockJson).toHaveBeenCalledWith({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal error',
      });
    });
  });

  /**
   * Tests for logging functionality
   */
  describe('error logging', () => {
    /**
     * Verify error is properly logged
     */
    it('should log error details', () => {
      const loggerSpy = jest.spyOn(Logger, 'error');

      const exception = {
        message: 'Test error',
      };

      filter.catch(exception, mockHost);

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining('Test error'),
      );
    });
  });
});
