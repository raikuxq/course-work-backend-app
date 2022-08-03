import { Module } from '@nestjs/common';
import { ChannelCategoryResolver } from './channel-category.resolver';

@Module({
  providers: [ChannelCategoryResolver],
})
export class ChannelCategoryModule {}
