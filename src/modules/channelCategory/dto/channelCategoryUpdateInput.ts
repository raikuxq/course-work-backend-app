import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChannelCategoryUpdateInput {
  @Field()
  @IsNotEmpty()
  title: string;
}
