import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';
import { $Enums } from 'db';

export class UpdateConversationDto {
  name: string;
}

export class UpdateUserMembershipInRoomDto {
  user: string;
  conversation: string;
}

export class MutUserDto {
  user: string;
  conversation: string;
  until: Date;
}

export class UnMutUserDto {
  user: string;
  conversation: string;
}

export class ProtectChannel {
  password: string;
  conversation: string;
}

export class UnProtectChannel {
  conversation: string;
  visibility: $Enums.ChatVisibility
}
