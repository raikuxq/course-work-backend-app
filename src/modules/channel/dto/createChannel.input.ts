import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field()
  description: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
