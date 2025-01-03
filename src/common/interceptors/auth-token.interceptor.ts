import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  async intercept (context: ExecutionContext, next: CallHandler<any>) {
    const request = await context.switchToHttp().getRequest()
    const token = await request.headers.authorization.split(' ')[1]
    return next.handle()
  }
}