import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { TrackerMember } from './tracker-member.model';

@ObjectType()
export class Tracker extends BaseModel {
  title: string;
  description: string;
  members: TrackerMember[];
  inviteLink: string;
}
