import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { Tracker } from './models/tracker.model';
import { TrackerService } from './tracker.service';
import { TrackerCreateInput } from './dto/trackerCreate.input';
import { TrackerUpdateInput } from './dto/trackerUpdate.input';

@Resolver(() => Tracker)
export class TrackerResolver {
  constructor(private trackerService: TrackerService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tracker)
  async trackerCreate(
    @UserEntity() user: User,
    @Args('data') data: TrackerCreateInput
  ) {
    return await this.trackerService.create(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tracker)
  async trackerUpdate(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: TrackerUpdateInput
  ) {
    return await this.trackerService.update(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async trackerDelete(@UserEntity() user: User, @Args('id') id: string) {
    await this.trackerService.delete(user.id, id);

    return id;
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('channel')
  async channel(@Parent() tracker: Tracker) {
    return this.trackerService.channelResolver(tracker.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('category')
  async category(@Parent() tracker: Tracker) {
    return this.trackerService.categoryResolver(tracker.id);
  }
}
