import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { PersonModule } from "src/person/person.module";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), PersonModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
