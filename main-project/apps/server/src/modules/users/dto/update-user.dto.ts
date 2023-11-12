import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { User } from "db";

export class UpdateUserDto {
  @IsString()
  lastName: string;
  @IsString()
  firstName: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  login: string;
  @IsString()
  status: string;
}
