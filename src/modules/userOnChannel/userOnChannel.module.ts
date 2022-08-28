import { Module } from '@nestjs/common';
import { UserOnChannelService } from './userOnChannel.service';

@Module({
  providers: [UserOnChannelService],
  exports: [UserOnChannelService],
})
export class UserOnChannelModule {}
