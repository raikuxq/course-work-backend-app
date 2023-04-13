import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Channel } from './models/channel.model';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { ChannelCreateInput } from './dto/channelCreateInput';
import { ChannelJoinToInput } from './dto/channelJoinTo.input';
import { PrismaService } from 'nestjs-prisma';
import { ChannelLeaveInput } from './dto/channelLeaveInput';
import { ChannelUpdateInput } from './dto/channelUpdate.input';
import { UserOnChannel } from '../userOnChannel/models/userOnChannel.model';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(
    private prismaService: PrismaService,
    private channelService: ChannelService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Channel)
  async channelCreate(
    @UserEntity() user: User,
    @Args('data') data: ChannelCreateInput
  ) {
    return this.channelService.create(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Channel)
  async channelUpdate(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: ChannelUpdateInput
  ) {
    return await this.channelService.update(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async channelDelete(@UserEntity() user: User, @Args('id') id: string) {
    await this.channelService.delete(user.id, id);

    return id;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Channel])
  userChannelsOwn(@UserEntity() user: User) {
    return this.channelService.getByAuthor(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserOnChannel])
  userChannelsMemberOf(@UserEntity() user: User) {
    return this.channelService.getByMember(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Channel)
  channel(@Args('id') id: string) {
    return this.channelService.get(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Channel)
  async channelJoin(
    @UserEntity() user: User,
    @Args('data') data: ChannelJoinToInput
  ) {
    return this.channelService.join(user.id, data.inviteLink);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async channelLeave(
    @UserEntity() user: User,
    @Args('data') data: ChannelLeaveInput
  ) {
    await this.channelService.leave(user.id, data.channelId);

    return data.channelId;
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('author')
  async author(@Parent() channel: Channel) {
    return this.channelService.authorResolver(channel.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('members')
  async members(@Parent() channel: Channel) {
    return this.channelService.membersResolver(channel.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('categories')
  async categories(@Parent() channel: Channel) {
    return this.channelService.categoriesResolver(channel.id);
  }
}
