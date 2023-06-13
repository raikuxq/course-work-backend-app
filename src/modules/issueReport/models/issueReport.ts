import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Tracker } from 'src/modules/tracker/models/tracker.model';
import { BaseModel } from '../../../common/models/base.model';
import { EnumIssueReportPriority } from '../enums/EnumIssueReportPriority';
import { EnumIssueReportStatus } from '../enums/EnumIssueReportStatus';
import { EnumIssueReportType } from '../enums/EnumIssueReportType';
import { TrackerMember } from '../../trackerMember/models/trackerMember.model';
import { IsNotEmpty } from 'class-validator';
import { Comment } from '../../comment/models/comment.model';

registerEnumType(EnumIssueReportPriority, {
  name: 'IssueReportPriority',
  description: 'Issue report priority',
});

registerEnumType(EnumIssueReportStatus, {
  name: 'IssueReportStatus',
  description: 'Issue report status',
});

registerEnumType(EnumIssueReportType, {
  name: 'IssueReportType',
  description: 'Issue report type',
});

@ObjectType()
export class IssueReport extends BaseModel {
  @Field(() => TrackerMember)
  author: TrackerMember;

  @Field(() => TrackerMember)
  responsiblePerson: TrackerMember;

  @Field(() => Tracker)
  tracker: Tracker;

  @Field(() => EnumIssueReportType)
  type: EnumIssueReportType;

  @Field(() => EnumIssueReportStatus)
  status: EnumIssueReportStatus;

  @Field(() => EnumIssueReportPriority)
  priority: EnumIssueReportPriority;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;

  @Field(() => [Comment])
  comments: Comment[];
}
