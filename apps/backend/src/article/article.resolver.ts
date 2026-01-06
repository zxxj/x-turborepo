import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ArticleEntity } from './entities/article.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ArticleService } from './article.service';

@Resolver(() => ArticleEntity)
export class ArticleResolver {
  constructor(private articleService: ArticleService) {}

  @Query(() => [ArticleEntity], { name: 'articles' })
  async findAll(
    @Context() context,
    @Args('pageNumber', { nullable: true }) pageNumber?: number,
    @Args('pageSize', { nullable: true }) pageSize?: number,
  ) {
    console.log(context.req.user);
    return await this.articleService.findAll({ pageNumber, pageSize });
  }

  @Query(() => Int, { name: 'totalCount' })
  async totalCount() {
    return await this.articleService.findAllCount();
  }

  @Query(() => ArticleEntity)
  async getArticleById(@Args('id', { type: () => Int }) id: number) {
    return await this.articleService.findOne(id);
  }
}
