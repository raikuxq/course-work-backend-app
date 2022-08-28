import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { PrismaService } from 'nestjs-prisma';
import { UserOnChannel } from './models/userOnChannel.model';

@Resolver(() => UserOnChannel)
export class UserOnChannelResolver {
  constructor(private prismaService: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField('user')
  async user(@Parent() userOnChannel: UserOnChannel) {
    return this.prismaService.userOnChannel
      .findUnique({ where: { id: userOnChannel.id } })
      .user();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('channel')
  async channel(@Parent() userOnChannel: UserOnChannel) {
    return this.prismaService.userOnChannel
      .findUnique({ where: { id: userOnChannel.id } })
      .channel();
  }
}
