import { Module } from '@nestjs/common';
import { UserOnChannelService } from './userOnChannel.service';
import { UserOnChannelResolver } from './userOnChannel.resolver';

@Module({
  providers: [UserOnChannelResolver, UserOnChannelService],
  exports: [UserOnChannelResolver, UserOnChannelService],
})
export class UserOnChannelModule {}
