import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/like/entities/like.entity';

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createTime: Date;

  @Field()
  updateTime: Date;

  @Field(() => [CommentEntity])
  comments?: CommentEntity[];

  @Field(() => [ArticleEntity])
  articles?: ArticleEntity[];

  @Field(() => [LikeEntity])
  likes?: LikeEntity[];
}
