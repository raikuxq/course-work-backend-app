import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChannelCategoryCreateInput {
  @Field()
  channelId: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
