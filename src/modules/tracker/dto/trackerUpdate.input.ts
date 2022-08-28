import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TrackerUpdateInput {
  @Field()
  @IsNotEmpty()
  title?: string;

  @Field()
  @IsNotEmpty()
  description?: string;

  @Field()
  channelCategoryId?: string;
}
