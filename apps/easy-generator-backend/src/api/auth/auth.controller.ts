import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './guards/auth.guard.js';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto.js';
import { UserEntity } from '#api/users/entities/user.entity.js';
import { User } from '#decorators/user.decorator.js';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ type: AuthResponseDto })
  login(
    @User() user: Omit<UserEntity, 'password'> & { auth_token: string },
    @Body() _data: LoginDto,
  ) {
    return user;
  }

  @Post('register')
  @Public()
  @ApiCreatedResponse({ type: AuthResponseDto })
  register(@Body() data: UserEntity) {
    return this.authService.register(data);
  }
}
