import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleEntity } from 'src/article/entities/article.entity';

@ObjectType()
export class TagEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [ArticleEntity])
  articles: ArticleEntity[];
}
