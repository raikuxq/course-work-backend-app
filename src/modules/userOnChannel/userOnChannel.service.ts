import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserOnChannelService {
  constructor(private prisma: PrismaService) {}

  async createUserOnChannel(userId: string, channelId: string) {
    return this.prisma.userOnChannel.create({
      data: {
        userId,
        channelId,
      },
    });
  }

  async removeUserFromChannel(userId: string, channelId: string) {
    const pairToDelete = await this.prisma.userOnChannel.findFirst({
      where: {
        userId: userId,
        channelId: channelId,
      },
    });

    await this.prisma.userOnChannel.delete({
      where: {
        id: pairToDelete.id,
      },
    });
  }
}
