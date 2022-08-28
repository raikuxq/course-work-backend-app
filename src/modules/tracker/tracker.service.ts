import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TrackerCreateInput } from './dto/trackerCreate.input';
import { TrackerUpdateInput } from './dto/trackerUpdate.input';

@Injectable()
export class TrackerService {
  constructor(private prisma: PrismaService) {}

  async get(trackerId: string) {
    return this.prisma.issueTracker.findUnique({
      where: {
        id: trackerId,
      },
    });
  }

  async create(userId: string, data: TrackerCreateInput) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: data.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new Error('Only author have access to create trackers');
    }

    return this.prisma.issueTracker.create({
      data: {
        title: data.title,
        description: data.description,
        channelId: data.channelId,
        categoryId: data.channelCategoryId,
      },
    });
  }

  async update(userId: string, trackerId: string, data: TrackerUpdateInput) {
    const tracker = await this.prisma.issueTracker.findUnique({
      where: {
        id: trackerId,
      },
    });

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: tracker.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new Error('Only author have access to update trackers');
    }

    return await this.prisma.issueTracker.update({
      where: {
        id: trackerId,
      },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.channelCategoryId,
      },
    });
  }

  async delete(userId: string, trackerId: string) {
    const tracker = await this.prisma.issueTracker.findUnique({
      where: {
        id: trackerId,
      },
    });

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: tracker.channelId,
      },
    });

    if (channel.authorId !== userId) {
      throw new Error('Only author have access to delete tracker');
    }

    return await this.prisma.issueTracker.delete({
      where: {
        id: trackerId,
      },
    });
  }

  async channelResolver(trackerId: string) {
    return await this.prisma.issueTracker
      .findUnique({ where: { id: trackerId } })
      .channel();
  }

  async categoryResolver(trackerId: string) {
    return await this.prisma.issueTracker
      .findUnique({ where: { id: trackerId } })
      .category();
  }
}
