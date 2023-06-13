import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CommentUpdateInput {
  @Field()
  @IsNotEmpty()
  content: string;
}
