import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IssueReport } from './models/issueReport';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { IssueReportCreateInput } from './dto/issueReportCreate.input';
import { IssueReportUpdateInput } from './dto/issueReportUpdate.input';
import { IssueReportService } from './issueReport.service';

@Resolver(() => IssueReport)
export class IssueReportResolver {
  constructor(private issueReportService: IssueReportService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => IssueReport)
  async issueReport(@UserEntity() user: User, @Args('id') id: string) {
    return await this.issueReportService.get(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => IssueReport)
  async issueReportCreate(
    @UserEntity() user: User,
    @Args('data') data: IssueReportCreateInput
  ) {
    return await this.issueReportService.create(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => IssueReport)
  async issueReportUpdate(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: IssueReportUpdateInput
  ) {
    return await this.issueReportService.update(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async issueReportDelete(@UserEntity() user: User, @Args('id') id: string) {
    await this.issueReportService.delete(user.id, id);

    return id;
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('tracker')
  async tracker(@Parent() issueReport: IssueReport) {
    return this.issueReportService.trackerResolver(issueReport.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('author')
  async author(@Parent() issueReport: IssueReport) {
    return this.issueReportService.authorResolver(issueReport.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('responsiblePerson')
  async responsiblePerson(@Parent() issueReport: IssueReport) {
    return this.issueReportService.responsiblePersonResolver(issueReport.id);
  }
}
