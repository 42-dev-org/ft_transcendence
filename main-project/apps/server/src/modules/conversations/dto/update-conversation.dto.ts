import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {}

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
  until: Date;
}

export class ProtectChannel {
  password: string;
  conversation: string;
}

export class UnProtectChannel {
  conversation: string;
}
