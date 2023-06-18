import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserRoleEnum } from './enums/user-role.enum';

@Injectable()
export class TrackerMemberService {
  constructor(private prisma: PrismaService) {}

  async get(trackerId: string, userId: string) {
    return await this.prisma.issueTrackerMember.findFirst({
      where: {
        trackerId,
        userId,
      },
    });
  }

  async getMemberRole(
    trackerId: string,
    userId: string
  ): Promise<UserRoleEnum | null> {
    try {
      const member = await this.get(trackerId, userId);

      return member.role as UserRoleEnum;
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  async addMember(
    currentUserId: string,
    userToAddId: string,
    trackerId: string,
    role: UserRoleEnum = UserRoleEnum.GUEST
  ) {
    const currentMemberRole = await this.getMemberRole(
      trackerId,
      currentUserId
    );

    const tracker = await this.prisma.issueTracker.findUnique({
      where: { id: trackerId },
    });

    const channel = await this.prisma.channel.findUnique({
      where: { id: tracker.channelId },
    });

    const isAuthor = channel.authorId === currentUserId;

    if (currentMemberRole !== UserRoleEnum.QA && !isAuthor) {
      throw new Error('Only QAs and author have access to add members');
    }

    await this.prisma.issueTrackerMember.create({
      data: {
        userId: userToAddId,
        trackerId: trackerId,
        role: role,
      },
    });

    return await this.prisma.issueTracker.findUnique({
      where: {
        id: trackerId,
      },
    });
  }

  async updateMemberRole(
    currentUserId: string,
    userToUpdateId: string,
    trackerId: string,
    memberRole: UserRoleEnum
  ) {
    const member = await this.prisma.issueTrackerMember.findFirst({
      where: {
        trackerId: trackerId,
        userId: userToUpdateId,
      },
    });

    const currentMemberRole = await this.getMemberRole(
      trackerId,
      currentUserId
    );

    if (currentMemberRole !== UserRoleEnum.QA) {
      throw new Error('Only QAs have access to update members');
    }

    return await this.prisma.issueTrackerMember.update({
      where: {
        id: member.id,
      },
      data: {
        role: memberRole,
      },
    });
  }

  async removeMember(
    currentUserId: string,
    userToRemoveId: string,
    trackerId: string
  ) {
    const member = await this.prisma.issueTrackerMember.findFirst({
      where: {
        trackerId: trackerId,
        userId: userToRemoveId,
      },
    });

    return await this.prisma.issueTrackerMember.delete({
      where: {
        id: member.id,
      },
    });
  }

  async userResolver(memberId: string) {
    return await this.prisma.issueTrackerMember
      .findUnique({ where: { id: memberId } })
      .user();
  }
}
