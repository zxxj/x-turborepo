import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ArticleEntity } from './entities/article.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleEntity)
  async createArticle(
    @Context() context,
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    console.log('context.req.id', context.req.id);
    const userId = context.req.user.id;
    return await this.articleService.create(createArticleInput, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleEntity)
  async updateArticle(
    @Context() context,
    @Args('articleId', { type: () => Int }) articleId: number,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    const userId = context.req.user.id;

    return this.articleService.update(articleId, updateArticleInput, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleEntity)
  async deleteArticle(
    @Args('articleId', { type: () => Int }) articleId: number,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    console.log('delete', userId, articleId);
    return this.articleService.delete(articleId, userId);
  }
}
