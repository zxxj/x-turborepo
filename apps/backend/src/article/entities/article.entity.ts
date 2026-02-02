import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/like/entities/like.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class ArticleEntity {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;

  @Field()
  content: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createTime: Date;

  @Field()
  updateTime: Date;

  @Field(() => UserEntity)
  author: UserEntity;

  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @Field(() => [TagEntity])
  tags: TagEntity[];

  @Field(() => [LikeEntity])
  likes: LikeEntity[];
}
