import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { UserRoleEnum } from '../enums/user-role.enum';

@InputType()
export class TrackerAddMemberInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  trackerId: string;

  @Field(() => UserRoleEnum)
  role: UserRoleEnum;
}
