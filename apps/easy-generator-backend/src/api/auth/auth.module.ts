import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '#api/users/users.module.js';
import { LocalStrategy } from './passport-strategies/local.strategy.js';
import { JwtStrategy } from './passport-strategies/jwt.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '5m',
        algorithm: process.env.JWT_ALGORITHM || 'RS256',
      },
      secret: process.env.privateKey || process.env.publicKey,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
