import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Channel } from '../../channel/models/channel.model';
import { Tracker } from '../../tracker/models/tracker.model';

@ObjectType()
export class ChannelCategory extends BaseModel {
  title: string;
  channel: Channel;
  trackers: Tracker[];
}
