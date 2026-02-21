import { Get } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity.js';
import { User } from '#decorators/user.decorator.js';
import { Private } from '#api/auth/guards/auth.guard.js';
import { Controller } from '@impactor/nest/decorators/controller/controller.decorator.js';
import { crudOptions } from '#utils/crud-options.js';

@Controller((opts) =>
  crudOptions(UserEntity, {
    ...opts,
    routes: opts.routes?.map((route) => {
      if (route.httpMethod === 'GET' && route.many) {
        route.decorators.push(Private());
      }
      return route;
    }),
  }),
)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /**
   * get the current loggedIn user
   */
  @Get('me')
  @ApiOkResponse({ type: UserEntity })
  me(@User('sub') userId: string) {
    return this.service.getOne(userId);
  }
}
