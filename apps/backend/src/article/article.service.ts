import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

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

  // 创建文章
  async create(createArticleInput: CreateArticleInput, userId: number) {
    return await this.prisma.article.create({
      data: {
        ...createArticleInput,
        authorId: userId,
      },
    });
  }

  // 更新文航
  async update(
    articleId: number,
    updateArticleInput: UpdateArticleInput,
    userId: number,
  ) {
    return await this.prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        ...updateArticleInput,
        authorId: userId,
      },
    });
  }

  // 删除文章
  async delete(articleId: number, userId: number) {
    return this.prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }
}
