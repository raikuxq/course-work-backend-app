import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TrackerCreateInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  channelId: string;

  @Field()
  channelCategoryId?: string;

  @Field()
  @IsNotEmpty()
  description?: string;
}
