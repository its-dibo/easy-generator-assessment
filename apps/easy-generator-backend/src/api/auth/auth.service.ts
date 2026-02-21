import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '#api/users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserEntity } from '#api/users/entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity.js';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';

export interface JwtUser {
  sub: string;
  tokenId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Token)
    protected tokenRepo: Repository<Token>,
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    let user = await this.usersService.getUserWithPassword({ email });

    if (!user)
      throw new UnauthorizedException(
        `no account found for the entry ${email}, register a new account`,
      );

    let isAuthorized = await bcrypt.compare(password, user.password);

    if (!isAuthorized) throw new UnauthorizedException('wrong password');

    let { password: pass, ...data } = user,
      auth_token = await this.sign(user);

    return {
      ...data,
      auth_token,
    };
  }

  async register(data: UserEntity) {
    let user = await this.usersService.post(data),
      auth_token = await this.sign(user);
    return {
      ...user,
      auth_token,
    };
  }

  async sign(user: UserEntity) {
    if (!user.id) throw new Error(`[Auth] user.id is empty!`);
    let tokenId = randomUUID();
    let token = this.jwtService.sign(<JwtUser>{ sub: user.id, tokenId }, {
      // algorithm: 'RS256',
    });
    await this.tokenRepo.insert({ tokenId });
    return token;
  }

  /**
   * check if the jwt token is not revoked
   * @param token
   */
  async validateToken(tokenId: string) {
    if (!tokenId || !(await this.tokenRepo.findOneBy({ tokenId }))) {
      throw `the access token is revoked, please login again`;
    }
  }

  getTokens() {
    return this.tokenRepo
      .findAndCount()
      .then((res) => ({ count: res[1], data: res[0] }));
  }

  getToken(tokenId: string) {
    return this.tokenRepo.findOneBy({ tokenId });
  }
}
