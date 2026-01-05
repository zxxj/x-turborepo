import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return this.prisma.article.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
  }

  // 查询文章总条数
  findAllCount() {
    return this.prisma.article.count();
  }
}
