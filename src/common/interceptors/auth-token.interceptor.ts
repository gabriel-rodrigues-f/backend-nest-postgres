import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler<any>) {
    const request = await context.switchToHttp().getRequest()
    
    return next.handle()
  }
}