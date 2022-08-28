import { Module } from '@nestjs/common';
import { IssueReportResolver } from './IssueReport.resolver';

@Module({
  providers: [IssueReportResolver],
})
export class IssueReportModule {}
