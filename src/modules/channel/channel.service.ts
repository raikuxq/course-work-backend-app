import { Injectable } from '@nestjs/common';
import { CreateChannelInput } from './dto/createChannel.input';
import { PrismaService } from 'nestjs-prisma';
import { INVITE_LINK_LENGTH } from '../../common/settings/constants';
import { UserIdArgs } from '../../common/args/user-id.args';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async createChannel(userId: string, data: CreateChannelInput) {
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

  async userChannels(id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .channelsAuthor();
  }
}
