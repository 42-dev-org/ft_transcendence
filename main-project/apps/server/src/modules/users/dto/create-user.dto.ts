import { Roles, Status } from 'db';

export class CreateUserDto {
  // login infos
  email: string;
  password: string;

  // basic infos
  firstName: string;
  lastName: string;
  country: string;
  state?: string;
  role: Roles;
  status: Status;
  phoneNumber?: string;
}
