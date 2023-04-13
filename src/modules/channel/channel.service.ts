import { ForbiddenException, Injectable } from '@nestjs/common';
import { ChannelCreateInput } from './dto/channelCreateInput';
import { PrismaService } from 'nestjs-prisma';
import { INVITE_LINK_LENGTH } from '../../common/settings/constants';
import { UserOnChannelService } from '../userOnChannel/userOnChannel.service';
import { ChannelUpdateInput } from './dto/channelUpdate.input';

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    private userOnChannelService: UserOnChannelService
  ) {}

  async get(id: string) {
    return this.prisma.channel.findUnique({
      where: { id },
    });
  }

  async getByAuthor(userId: string) {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .channelsAuthor();
  }

  async getByMember(userId: string) {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .channelsMember();
  }

  async create(userId: string, data: ChannelCreateInput) {
    const crypto = await import('crypto');
    const inviteLink = crypto.randomBytes(INVITE_LINK_LENGTH).toString('hex');

    return this.prisma.channel.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: userId,
        inviteLink: inviteLink,
      },
    });
  }

  async update(userId: string, channelId: string, data: ChannelUpdateInput) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new ForbiddenException(
        'Only author have access to update channels'
      );
    }

    return await this.prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  async delete(userId: string, channelId: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new ForbiddenException(
        'Only author have access to create categories'
      );
    }

    return await this.prisma.channel.delete({
      where: {
        id: channelId,
      },
    });
  }

  async join(userId: string, inviteLink: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        inviteLink,
      },
    });

    const channelId = channel.id;

    await this.userOnChannelService.createUserOnChannel(userId, channelId);

    return channel;
  }

  async leave(userId: string, channelId) {
    return await this.userOnChannelService.removeUserFromChannel(
      userId,
      channelId
    );
  }

  async authorResolver(channelId: string) {
    return this.prisma.channel
      .findUnique({ where: { id: channelId } })
      .author();
  }

  async membersResolver(channelId: string) {
    const userOnChannels = await this.prisma.channel
      .findUnique({ where: { id: channelId } })
      .members();

    const userIds = userOnChannels.map((userOnChannel) => userOnChannel.userId);

    return this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });
  }

  async categoriesResolver(channelId: string) {
    return this.prisma.channel
      .findUnique({ where: { id: channelId } })
      .categories();
  }
}
