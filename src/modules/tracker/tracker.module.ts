import { Module } from '@nestjs/common';
import { TrackerResolver } from './tracker.resolver';
import { TrackerService } from './tracker.service';
import { TrackerMemberModule } from '../trackerMember/trackerMember.module';

@Module({
  providers: [TrackerResolver, TrackerService],
  exports: [TrackerService],
  imports: [TrackerMemberModule],
})
export class TrackerModule {}
