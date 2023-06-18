import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ChannelCategoryCreateInput } from './dto/channelCategoryCreateInput';
import { ChannelCategoryUpdateInput } from './dto/channelCategoryUpdateInput';

@Injectable()
export class ChannelCategoryService {
  constructor(private prisma: PrismaService) {}

  async get(channelCategoryId: string) {
    return this.prisma.channelCategory.findUnique({
      where: {
        id: channelCategoryId,
      },
    });
  }

  async create(userId: string, data: ChannelCategoryCreateInput) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new ForbiddenException(
        'Only author have access to create categories'
      );
    }

    return this.prisma.channelCategory.create({
      data: {
        title: data.title,
        channelId: data.channelId,
      },
    });
  }

  async update(
    userId: string,
    channelCategoryId: string,
    data: ChannelCategoryUpdateInput
  ) {
    const channelCategory = await this.prisma.channelCategory.findUnique({
      where: {
        id: channelCategoryId,
      },
    });

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelCategory.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new ForbiddenException(
        'Only author have access to update categories'
      );
    }

    return await this.prisma.channelCategory.update({
      where: {
        id: channelCategoryId,
      },
      data: {
        title: data.title,
      },
    });
  }

  async delete(userId: string, channelCategoryId: string) {
    const channelCategory = await this.prisma.channelCategory.findUnique({
      where: {
        id: channelCategoryId,
      },
    });

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelCategory.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new ForbiddenException(
        'Only author have access to delete categories'
      );
    }

    return await this.prisma.channelCategory.delete({
      where: {
        id: channelCategoryId,
      },
    });
  }

  channelResolver(channelCategoryId: string) {
    return this.prisma.channelCategory
      .findUnique({ where: { id: channelCategoryId } })
      .channel();
  }

  async trackersResolver(userId: string, channelCategoryId: string) {
    const channelCategory = await this.get(channelCategoryId);
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelCategory.channelId },
    });

    const matchedTrackers = await this.prisma.issueTracker.findMany({
      where: { categoryId: channelCategory.id },
    });
    const matchedMember = await this.prisma.issueTrackerMember.findMany({
      where: { userId },
    });
    const memberTrackersIds = matchedMember.map(
      (matchedMemberItem) => matchedMemberItem.trackerId
    );

    return matchedTrackers.filter((tracker) => {
      const isMember = memberTrackersIds.includes(tracker.id);
      const isAuthor = channel.authorId === userId;

      return isMember || isAuthor;
    });
  }
}
