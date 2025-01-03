import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from "@nestjs/common";
import { AuthTokenInterceptor } from "src/common/interceptors/auth-token.interceptor";

@UseInterceptors(AuthTokenInterceptor)
@Controller("health")
export class HealthController {
  @HttpCode(HttpStatus.OK)
  @Get()
  check (): any {
    return {
      status: "Healthy",
    };
  }
}
