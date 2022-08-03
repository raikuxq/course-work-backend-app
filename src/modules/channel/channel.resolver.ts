import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Channel } from './models/channel.model';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { CreateChannelInput } from './dto/createChannel.input';
import { UserIdArgs } from '../../common/args/user-id.args';

@Resolver()
export class ChannelResolver {
  constructor(private channelService: ChannelService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Channel)
  async createChannel(
    @UserEntity() user: User,
    @Args('data') data: CreateChannelInput
  ) {
    return this.channelService.createChannel(user.id, data);
  }

  @Query(() => [Channel])
  userChannels(@Args() id: UserIdArgs) {
    return this.channelService.userChannels(id);
  }
}
