import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
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
import { TrackerAddMemberInput } from '../trackerMember/dto/trackerAddMember.input';
import { TrackerRemoveMemberInput } from '../trackerMember/dto/trackerRemoveMember.input';
import { TrackerMemberService } from '../trackerMember/trackerMember.service';

@Resolver(() => Tracker)
export class TrackerResolver {
  constructor(
    private trackerService: TrackerService,
    private trackerMemberService: TrackerMemberService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Tracker)
  async tracker(@UserEntity() user: User, @Args('id') id: string) {
    return await this.trackerService.get(user.id, id);
  }

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
  @Mutation(() => Tracker)
  async trackerAddMember(
    @UserEntity() user: User,
    @Args('data') data: TrackerAddMemberInput
  ) {
    await this.trackerMemberService.addMember(
      user.id,
      data.userId,
      data.trackerId,
      data.role
    );

    return await this.trackerService.get(user.id, data.trackerId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tracker)
  async trackerUpdateMemberRole(
    @UserEntity() user: User,
    @Args('data') data: TrackerAddMemberInput
  ) {
    await this.trackerMemberService.updateMemberRole(
      user.id,
      data.userId,
      data.trackerId,
      data.role
    );

    return await this.trackerService.get(user.id, data.trackerId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tracker)
  async trackerRemoveMember(
    @UserEntity() user: User,
    @Args('data') data: TrackerRemoveMemberInput
  ) {
    await this.trackerMemberService.removeMember(
      user.id,
      data.userId,
      data.trackerId
    );

    return await this.trackerService.get(user.id, data.trackerId);
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

  @UseGuards(GqlAuthGuard)
  @ResolveField('members')
  async members(@Parent() tracker: Tracker) {
    return this.trackerService.membersResolver(tracker.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('reports')
  async reports(@Parent() tracker: Tracker) {
    return this.trackerService.reportsResolver(tracker.id);
  }
}
