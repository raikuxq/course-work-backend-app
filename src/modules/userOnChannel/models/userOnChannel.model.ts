import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import { Channel } from '../../channel/models/channel.model';

@ObjectType()
export class UserOnChannel extends BaseModel {
  user: User;
  channel: Channel;
}
