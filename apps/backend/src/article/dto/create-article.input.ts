import { InputType, Int, Field } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}
