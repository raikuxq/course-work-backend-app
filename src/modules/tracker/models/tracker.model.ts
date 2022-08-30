import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { ChannelCategory } from '../../channelCategory/models/channelCategory.model';
import { Channel } from '../../channel/models/channel.model';
import { TrackerMember } from '../../trackerMember/models/trackerMember.model';

@ObjectType()
export class Tracker extends BaseModel {
  title: string;
  description: string;
  channel: Channel;
  category: ChannelCategory;
  members: TrackerMember[];
}
