import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
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
