import { Roles, Status } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    state?: string;
    role: Roles;
    status: Status;
    phoneNumber?: string;
}
