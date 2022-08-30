import { Module } from '@nestjs/common';
import { TrackerMemberResolver } from './trackerMember.resolver';
import { TrackerMemberService } from './trackerMember.service';

@Module({
  providers: [TrackerMemberResolver, TrackerMemberService],
  exports: [TrackerMemberResolver, TrackerMemberService],
})
export class TrackerMemberModule {}
