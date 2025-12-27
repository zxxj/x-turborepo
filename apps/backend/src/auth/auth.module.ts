import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
