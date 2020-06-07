import {Catch, ExceptionFilter, ArgumentsHost, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

export interface ServerError {
  message: {
    statusCode: number;
    error: string;
    message: string;
  };
}

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(_exception: ServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let resultCode = 'SERVER_ERROR';
    let message = 'Server Error';

    response.status(400).json({
      statusCode,
      resultCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
