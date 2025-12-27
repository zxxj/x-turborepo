import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/signIn.response';
import { SignInInput } from './dto/signIn.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.userLogin(user);
  }
}
