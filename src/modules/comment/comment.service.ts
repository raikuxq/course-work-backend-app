import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CommentCreateInput } from './dto/commentCreateInput';
import { CommentUpdateInput } from './dto/commentUpdateInput';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async get(commentId: string) {
    return await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async create(userId: string, data: CommentCreateInput) {
    const issueReport = await this.prisma.issueReport.findFirst({
      where: {
        id: data.issueReportId,
      },
    });

    const member = await this.prisma.issueTrackerMember.findFirst({
      where: {
        trackerId: issueReport.trackerId,
        userId: userId,
      },
    });

    return await this.prisma.comment.create({
      data: {
        authorId: member.id,
        content: data.content,
        reportId: data.issueReportId,
      },
    });
  }

  async update(userId: string, commentId: string, data: CommentUpdateInput) {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: data.content,
      },
    });
  }

  async delete(userId: string, commentId: string) {
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }

  async authorResolver(commentId: string) {
    return await this.prisma.comment
      .findUnique({ where: { id: commentId } })
      .author();
  }

  async reportResolver(commentId: string) {
    return await this.prisma.comment
      .findUnique({ where: { id: commentId } })
      .report();
  }
}
