import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ArticleEntity } from './entities/article.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => ArticleEntity)
export class ArticleResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ArticleEntity], { name: 'articles' })
  findAll(@Context() context) {
    console.log(context.req.user);
    return this.prisma.article.findMany();
  }
}
