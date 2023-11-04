import { ConversationTypes } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsOptional()
  @IsString()
  name: string;

  participants: string[];

  admins: string[];

  description: string;

  tags: string[];

  type: ConversationTypes;
}
