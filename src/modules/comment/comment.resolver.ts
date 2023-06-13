import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Comment } from './models/comment.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserEntity } from '../../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { CommentCreateInput } from './dto/commentCreateInput';
import { CommentUpdateInput } from './dto/commentUpdateInput';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Comment)
  async comment(@UserEntity() user: User, @Args('id') id: string) {
    return await this.commentService.get(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async commentCreate(
    @UserEntity() user: User,
    @Args('data') data: CommentCreateInput
  ) {
    return await this.commentService.create(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async commentUpdate(
    @UserEntity() user: User,
    @Args('id') id: string,
    @Args('data') data: CommentUpdateInput
  ) {
    return await this.commentService.update(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ID)
  async commentDelete(@UserEntity() user: User, @Args('id') id: string) {
    await this.commentService.delete(user.id, id);

    return id;
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('author')
  async author(@Parent() comment: Comment) {
    return this.commentService.authorResolver(comment.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('report')
  async report(@Parent() comment: Comment) {
    return this.commentService.reportResolver(comment.id);
  }
}
