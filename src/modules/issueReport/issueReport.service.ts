import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IssueReportCreateInput } from './dto/issueReportCreate.input';
import { IssueReportUpdateInput } from './dto/issueReportUpdate.input';
import { TrackerService } from '../tracker/tracker.service';
import { TrackerMemberService } from '../trackerMember/trackerMember.service';
import { UserRoleEnum } from '../trackerMember/enums/user-role.enum';
import { ChannelService } from '../channel/channel.service';

@Injectable()
export class IssueReportService {
  constructor(
    private prisma: PrismaService,
    private trackerService: TrackerService,
    private trackerMemberService: TrackerMemberService,
    private channelService: ChannelService
  ) {}

  async get(userId: string, issueReportId: string) {
    const issueReport = await this.prisma.issueReport.findUnique({
      where: {
        id: issueReportId,
      },
    });

    const tracker = await this.trackerService.get(
      userId,
      issueReport.trackerId
    );
    const channel = await this.channelService.get(userId, tracker.channelId);
    const memberRole = await this.trackerMemberService.getMemberRole(
      tracker.id,
      userId
    );

    const isAuthor = channel.authorId === userId;
    const isMember = memberRole !== null;

    if (!isAuthor && !isMember) {
      throw new Error(
        'Only author and members have access to this issue report'
      );
    }

    return issueReport;
  }

  async create(userId: string, data: IssueReportCreateInput) {
    const author = await this.trackerMemberService.get(data.trackerId, userId);
    const memberRole = author.role;

    if (memberRole === UserRoleEnum.GUEST) {
      throw new Error('Guests cannot update tracker');
    }

    return await this.prisma.issueReport.create({
      data: {
        trackerId: data.trackerId,
        authorId: author.id,
        responsiblePersonId: data.responsiblePersonId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        type: data.type,
      },
    });
  }

  async update(
    userId: string,
    issueReportId: string,
    data: IssueReportUpdateInput
  ) {
    const issueReport = await this.get(userId, issueReportId);
    const tracker = await this.trackerService.get(
      userId,
      issueReport.trackerId
    );
    const memberRole = await this.trackerMemberService.getMemberRole(
      tracker.id,
      userId
    );

    if (memberRole === UserRoleEnum.GUEST) {
      throw new Error('Guests cannot update tracker');
    }

    return await this.prisma.issueReport.update({
      where: {
        id: issueReportId,
      },
      data: {
        responsiblePersonId: data.responsiblePersonId,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        type: data.type,
      },
    });
  }

  async delete(userId: string, issueReportId: string) {
    const issueReport = await this.get(userId, issueReportId);
    const tracker = await this.trackerService.get(
      userId,
      issueReport.trackerId
    );
    const member = await this.trackerMemberService.get(tracker.id, userId);
    const role = member.role;

    if (role === UserRoleEnum.GUEST || role === UserRoleEnum.DEV) {
      throw new Error('Only QAs are allowed to delete tracker');
    }

    return await this.prisma.issueReport.delete({
      where: {
        id: issueReportId,
      },
    });
  }

  async responsiblePersonResolver(issueReportId: string) {
    return await this.prisma.issueReport
      .findUnique({ where: { id: issueReportId } })
      .responsiblePerson();
  }

  async authorResolver(issueReportId: string) {
    return await this.prisma.issueReport
      .findUnique({ where: { id: issueReportId } })
      .author();
  }

  async trackerResolver(issueReportId: string) {
    return await this.prisma.issueReport
      .findUnique({ where: { id: issueReportId } })
      .tracker();
  }

  async commentsResolver(issueReportId: string) {
    return await this.prisma.issueReport
      .findUnique({ where: { id: issueReportId } })
      .comments();
  }
}
