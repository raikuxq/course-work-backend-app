import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChannelLeaveInput {
  @Field()
  @IsNotEmpty()
  channelId: string;
}
