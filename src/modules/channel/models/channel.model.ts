import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Channel extends BaseModel {
  title: string;
  description: string;
  author: User;
  members: User[];
  inviteLink: string;
}
