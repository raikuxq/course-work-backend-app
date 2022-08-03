import { Module } from '@nestjs/common';
import { TrackerResolver } from './tracker.resolver';

@Module({
  providers: [TrackerResolver],
})
export class TrackerModule {}
