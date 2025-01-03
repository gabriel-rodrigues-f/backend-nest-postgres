import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-messages.dto";
import { UpdateMessageDto } from "./dto/update-messages.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ErrorHandlingInterceptor } from "src/common/interceptors/error-handling.interceptor";

@Controller("messages")
@UseInterceptors(ErrorHandlingInterceptor)
export class MessagesController {
  constructor(private readonly _service: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    return await this._service.findAll(paginationDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<any> {
    const message = await this._service.findById(id);
    if (!message) throw new NotFoundException();
    return message;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDto: CreateMessageDto): Promise<string> {
    await this._service.create(createDto);
    return "";
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateMessageDto,
  ): Promise<any> {
    const message = await this._service.update(id, updateDto);
    if (!message) throw new NotFoundException();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    const message = await this._service.delete(id);
    if (!message) throw new NotFoundException();
  }
}
