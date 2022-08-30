import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { EnumIssueReportType } from '../enums/EnumIssueReportType';
import { EnumIssueReportStatus } from '../enums/EnumIssueReportStatus';
import { EnumIssueReportPriority } from '../enums/EnumIssueReportPriority';

@InputType()
export class IssueReportCreateInput {
  @Field()
  responsiblePersonId: string;

  @Field()
  trackerId: string;

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
}
