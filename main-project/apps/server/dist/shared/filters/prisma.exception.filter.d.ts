import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Prisma } from 'db';
export declare class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
    private duplicateInputError;
}
