import { Module } from '@nestjs/common';
import { ChannelCategoryResolver } from './channelCategory.resolver';
import { ChannelCategoryService } from './channelCategory.service';

@Module({
  providers: [ChannelCategoryResolver, ChannelCategoryService],
  exports: [ChannelCategoryResolver, ChannelCategoryService],
})
export class ChannelCategoryModule {}
