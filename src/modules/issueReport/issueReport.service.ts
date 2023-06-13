import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IssueReportCreateInput } from './dto/issueReportCreate.input';
import { IssueReportUpdateInput } from './dto/issueReportUpdate.input';

@Injectable()
export class IssueReportService {
  constructor(private prisma: PrismaService) {}

  async get(issueReportId: string) {
    return await this.prisma.issueReport.findUnique({
      where: {
        id: issueReportId,
      },
    });
  }

  async create(userId: string, data: IssueReportCreateInput) {
    const author = await this.prisma.issueTrackerMember.findFirst({
      where: {
        userId: userId,
      },
    });

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
    const comments = await this.prisma.issueReport
      .findUnique({ where: { id: issueReportId } })
      .comments();

    console.log(comments);

    return comments;
  }
}
