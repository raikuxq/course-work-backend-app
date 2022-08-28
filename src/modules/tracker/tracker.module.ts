import { Module } from '@nestjs/common';
import { TrackerResolver } from './tracker.resolver';
import { TrackerService } from './tracker.service';

@Module({
  providers: [TrackerResolver, TrackerService],
})
export class TrackerModule {}
