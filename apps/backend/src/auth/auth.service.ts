import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signIn.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('邮箱不存在,请重试!');
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('密码不正确,请重新输入!');
    }

    return user;
  }

  async generateJWTToken(userId: number) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.signAsync(payload);

    return accessToken;
  }

  async userLogin(user: User) {
    const accessToken = await this.generateJWTToken(user.id);

    console.log(user);
    return {
      id: user.id,
      username: user.username,
      accessToken,
      avatar: user.avatar,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('Uesr Not Found!');

    const currentUser = { id: user.id };

    return currentUser;
  }
}
