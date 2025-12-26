import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class CommentEntity {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  createTime: Date;

  @Field(() => ArticleEntity)
  article: ArticleEntity;

  @Field(() => UserEntity)
  author: UserEntity;
}
