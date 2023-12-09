import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'db';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        this.duplicateInputError(exception, response);
        break;
      case 'P2025':
        response.status(404).json({
          message: 'nor found',
        });
        break;
    }
  }

  private duplicateInputError(
    err: Prisma.PrismaClientKnownRequestError,
    res: Response,
  ) {
    const message =
      (err.meta.target as string[]).join(', ') + ' needs to be unique.';
    res.status(HttpStatus.CONFLICT).json({
      status: 'fail',
      message,
    });
  }
}
