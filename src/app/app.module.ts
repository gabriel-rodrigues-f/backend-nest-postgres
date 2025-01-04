import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MessagesModule } from "../messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "src/person/person.module";
import { HealthModule } from "src/health/health.module";
import { SimpleMiddleware } from "src/common/middlewares/simple.middleware";
import env from "src/common/config/env";
import { APP_FILTER } from "@nestjs/core";
import { CustomBadRequestException } from "src/common/exceptions/custom-bad-request-exception";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      database: env.DATABASE.DATABASE,
      username: env.DATABASE.USERNAME,
      password: env.DATABASE.PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule,
    MessagesModule,
    PersonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomBadRequestException
    }
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}