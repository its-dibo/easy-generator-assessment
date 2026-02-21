import { JwtUser } from '#api/auth/auth.service.js';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

/**
 * extract the user object or a specific user's property from the request
 * @example
 * ```
 * @Get('me')
 *  findCurrentUser(@User('id') userId: string){ ... }
 * ```
 */
export const User = createParamDecorator(
  (property: keyof JwtUser, ctx: ExecutionContext) => {
    let req = ctx.switchToHttp().getRequest() as FastifyRequest;
    return property ? req.user?.[property] : req.user;
  },
);
