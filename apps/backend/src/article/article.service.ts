import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleInput } from './dto/create-article.input';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  findAll({
    pageNumber = 1,
    pageSize = 10,
  }: {
    pageNumber?: number;
    pageSize?: number;
  }) {
    console.log(pageNumber, pageSize);
    return this.prisma.article.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: [{ createTime: 'desc' }],
    });
  }

  // 查询文章总条数
  findAllCount() {
    return this.prisma.article.count();
  }

  // 查询文章详情
  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async create(createArticleInput: CreateArticleInput, userId: number) {
    return await this.prisma.article.create({
      data: {
        ...createArticleInput,
        authorId: userId,
      },
    });
  }
}
