import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-messages.dto";
import { UpdateMessageDto } from "./dto/update-messages.dto";
import { PersonService } from "src/person/person.service";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly _repository: Repository<Message>,
    private readonly _service: PersonService,
  ) {}

  async findAll(paginationDto?: PaginationDto): Promise<any> {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this._repository.find({
      take: limit,
      skip: offset,
      relations: ["from", "to"],
      order: {
        id: "desc",
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findById(id: number): Promise<any> {
    const message = await this._repository.findOne({
      where: {
        id,
      },
      relations: ["from", "to"],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    if (!message) return null;
    return message;
  }

  async create(message: CreateMessageDto): Promise<any> {
    const { fromId, toId, text } = message;
    const from = await this._service.findOne(fromId);
    if (!from) throw new NotFoundException("'From' not found");

    const to = await this._service.findOne(toId);
    if (!to) throw new NotFoundException("'To' no found");

    const messageSetup = {
      read: false,
      date: new Date(),
      from,
      to,
      text,
    };
    await this._repository.save(messageSetup);
  }

  async update(id: number, message: UpdateMessageDto): Promise<any> {
    const response = await this.findById(id);
    if (!response) return null;
    await this._repository.update({ id }, { ...message });
  }

  async delete(id: number): Promise<any> {
    const message = await this._repository.findOneBy({ id });
    if (!message) return null;
    await this._repository.remove(message);
  }
}
