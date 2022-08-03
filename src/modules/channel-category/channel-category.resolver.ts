import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChannelService } from '../channel/channel.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Channel } from '../channel/models/channel.model';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { CreateChannelInput } from '../channel/dto/createChannel.input';

@Resolver()
export class ChannelCategoryResolver {
  constructor(private channelService: ChannelService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Channel)
  async createChannel(
    @UserEntity() user: User,
    @Args('data') data: CreateChannelInput
  ) {
    return this.channelService.createChannel(user.id, data);
  }
}
