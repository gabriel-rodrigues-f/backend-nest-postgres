import { Module } from "@nestjs/common";
import { MessagesModule } from "../messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModule } from "src/person/person.module";
import { HealthModule } from "src/health/health.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule,
    MessagesModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }


