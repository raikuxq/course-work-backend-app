import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { EnumIssueReportType } from '../enums/EnumIssueReportType';
import { EnumIssueReportStatus } from '../enums/EnumIssueReportStatus';
import { EnumIssueReportPriority } from '../enums/EnumIssueReportPriority';

@InputType()
export class IssueReportCreateInput {
  @Field()
  @IsNotEmpty()
  responsiblePersonId: string;

  @Field()
  @IsNotEmpty()
  trackerId: string;

  @Field(() => EnumIssueReportType)
  @IsNotEmpty()
  type: EnumIssueReportType;

  @Field(() => EnumIssueReportStatus)
  @IsNotEmpty()
  status: EnumIssueReportStatus;

  @Field(() => EnumIssueReportPriority)
  @IsNotEmpty()
  priority: EnumIssueReportPriority;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;
}
