import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Global exception filter for handling all unhandled exceptions
 *
 * @class
 * @description Captures and processes all unhandled exceptions thrown in the application
 * @implements {ExceptionFilter}
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  /**
   * Handle exceptions by transforming them into appropriate HTTP responses
   *
   * @param {any} exception - The exception object thrown
   * @param {ArgumentsHost} host - Host context containing request and response
   * @returns {void}
   * @description Logs the error and returns a standardized error response
   */
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    Logger.error(
      `Application error (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(exception.status || HttpStatus.BAD_REQUEST).json({
      status: exception.status || HttpStatus.BAD_REQUEST,
      message:
        exception.response?.message || exception.message || 'Internal error',
    });
  }
}
