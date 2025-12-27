import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SignInResponse {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  accessToken: string;
}
