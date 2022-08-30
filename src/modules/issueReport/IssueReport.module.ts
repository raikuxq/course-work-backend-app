import { Module } from '@nestjs/common';
import { IssueReportResolver } from './IssueReport.resolver';
import { IssueReportService } from './issueReport.service';

@Module({
  providers: [IssueReportResolver, IssueReportService],
})
export class IssueReportModule {}
