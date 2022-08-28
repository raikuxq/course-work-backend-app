import { Module } from '@nestjs/common';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { UserOnChannelModule } from '../userOnChannel/userOnChannel.module';
import { ChannelCategoryModule } from '../channelCategory/channelCategory.module';

@Module({
  providers: [ChannelResolver, ChannelService],
  imports: [UserOnChannelModule, ChannelCategoryModule],
})
export class ChannelModule {}
