import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
export const Public = () => SetMetadata('isPublic', true);
export const Private = () => SetMetadata('isPublic', false);
export const Roles = (...roles: any[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch {
      let isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      return isPublic;
    }

    let roles = this.reflector.getAllAndOverride('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roles?.length) {
      return true;
    }

    let req = context.switchToHttp().getRequest(),
      user = req.user;
    return roles.includes(user?.role);
  }

  handleRequest<UserEntity>(err: Error, user: UserEntity, _info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
