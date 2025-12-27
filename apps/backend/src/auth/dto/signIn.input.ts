import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
