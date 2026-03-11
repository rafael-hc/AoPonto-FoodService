import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
