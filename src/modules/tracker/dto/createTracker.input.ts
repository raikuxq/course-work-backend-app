import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TrackerMember } from '../models/tracker-member.model';

@InputType()
export class CreatePostInput {
  @Field()
  description: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  members: [TrackerMember];
}
