import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
export class CreateMessageDto {
  @IsString()
  @MinLength(3)
  @MaxLength(3500)
  content: string;

  @IsUUID()
  conversation: string;
}
