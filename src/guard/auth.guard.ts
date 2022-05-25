import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '@decorator/public.decorator';
import { IS_PUBLIC_PRIVATE_KEY } from '@decorator/public-private.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isContainToken = this.isContainToken(context);
    const isPublicPrivate = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_PRIVATE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic || (!isContainToken && isPublicPrivate)) {
      return true;
    }

    return super.canActivate(context);
  }

  private isContainToken(context: ExecutionContext): any {
    return !!context.switchToHttp().getRequest()?.headers?.authorization;
  }
}
