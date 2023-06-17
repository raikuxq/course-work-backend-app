import { Module } from '@nestjs/common';
import { IssueReportResolver } from './IssueReport.resolver';
import { IssueReportService } from './issueReport.service';
import { ChannelModule } from '../channel/channel.module';
import { TrackerModule } from '../tracker/tracker.module';
import { TrackerMemberModule } from '../trackerMember/trackerMember.module';

@Module({
  providers: [IssueReportResolver, IssueReportService],
  imports: [ChannelModule, TrackerModule, TrackerMemberModule],
})
export class IssueReportModule {}
