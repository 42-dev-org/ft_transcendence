import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {}

export class UpdateUserMembershipInRoomDto {
  user: string;
  uid: string;
}
