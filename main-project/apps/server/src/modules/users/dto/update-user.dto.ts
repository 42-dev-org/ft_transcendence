import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { User } from "db";

export class UpdateUserDto {
  @IsString()
  lastName: string;
  @IsString()
  firstName: string;
  @IsString()
  login: string;
}
