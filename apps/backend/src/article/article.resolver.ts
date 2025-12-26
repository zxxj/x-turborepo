import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => ArticleEntity)
export class ArticleResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ArticleEntity], { name: 'articles' })
  findAll() {
    return this.prisma.article.findMany();
  }
}
