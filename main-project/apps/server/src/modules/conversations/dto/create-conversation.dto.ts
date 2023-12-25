import { ConversationTypes, $Enums } from 'db';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsArray()
  participants: string[];

  @IsEnum(ConversationTypes)
  type: ConversationTypes;

  @IsEnum($Enums.ChatVisibility)
  visibility: $Enums.ChatVisibility
}
