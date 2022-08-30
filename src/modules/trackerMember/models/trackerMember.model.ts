import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { UserRoleEnum } from '../enums/user-role.enum';
import { BaseModel } from '../../../common/models/base.model';

registerEnumType(UserRoleEnum, {
  name: 'TrackerMemberRole',
  description: 'Tracker member role',
});

@ObjectType()
export class TrackerMember extends BaseModel {
  @Field(() => UserRoleEnum)
  role: UserRoleEnum;

  @Field(() => User)
  user: User;
}
