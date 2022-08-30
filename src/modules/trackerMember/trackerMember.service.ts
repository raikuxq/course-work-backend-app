import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserRoleEnum } from './enums/user-role.enum';

@Injectable()
export class TrackerMemberService {
  constructor(private prisma: PrismaService) {}

  async addMember(
    currentUserId: string,
    userToAddId: string,
    trackerId: string,
    role: UserRoleEnum = UserRoleEnum.GUEST
  ) {
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
