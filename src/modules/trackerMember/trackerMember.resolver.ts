import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { TrackerMember } from './models/trackerMember.model';
import { TrackerMemberService } from './trackerMember.service';

@Resolver(() => TrackerMember)
export class TrackerMemberResolver {
  constructor(private trackerMemberService: TrackerMemberService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField('user')
  async user(@Parent() member: TrackerMember) {
    return this.trackerMemberService.userResolver(member.id);
  }
}
