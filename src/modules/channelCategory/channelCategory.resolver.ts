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
import { ChannelCategoryService } from './channelCategory.service';
import { ChannelCategoryCreateInput } from './dto/channelCategoryCreateInput';
import { ChannelCategoryUpdateInput } from './dto/channelCategoryUpdateInput';
import { ChannelCategory } from './models/channelCategory.model';

@Resolver(() => ChannelCategory)
export class ChannelCategoryResolver {
  constructor(private channelCategoryService: ChannelCategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChannelCategory)
  async channelCategoryCreate(
    @UserEntity() user: User,
    @Args('data') data: ChannelCategoryCreateInput
  ) {
    return await this.channelCategoryService.create(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChannelCategory)
  async channelCategoryUpdate(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: ChannelCategoryUpdateInput
  ) {
    return await this.channelCategoryService.update(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async channelCategoryDelete(
    @UserEntity() user: User,
    @Args('id') id: string
  ) {
    await this.channelCategoryService.delete(user.id, id);

    return id;
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('channel')
  async channel(@Parent() channelCategory: ChannelCategory) {
    return this.channelCategoryService.channelResolver(channelCategory.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('trackers')
  async trackers(
    @UserEntity() user: User,
    @Parent() channelCategory: ChannelCategory
  ) {
    return this.channelCategoryService.trackersResolver(
      user.id,
      channelCategory.id
    );
  }
}
