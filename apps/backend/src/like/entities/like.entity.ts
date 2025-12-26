import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class LikeEntity {
  @Field(() => Int)
  id: number;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => ArticleEntity)
  article: ArticleEntity;

  @Field()
  createTime: Date;
}
