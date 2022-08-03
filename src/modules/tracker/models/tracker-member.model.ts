import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { UserRoleEnum } from '../enums/user-role.enum';

registerEnumType(UserRoleEnum, {
  name: 'UserRole',
  description: 'Tracker member role',
});

@ObjectType()
export class TrackerMember {
  @Field(() => UserRoleEnum)
  role: UserRoleEnum;

  @Field(() => User)
  user: User;
}
