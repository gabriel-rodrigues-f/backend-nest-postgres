import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { PersonService } from "./person.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Controller("person")
export class PersonController {
  constructor(private readonly _service: PersonService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createDTO: CreatePersonDto) {
    const person = await this._service.create(createDTO);
    if (!person) throw new BadRequestException("Entity already exists");
  }
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this._service.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this._service.findOne(+id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDTO: UpdatePersonDto,
  ) {
    const person = await this._service.update(id, updateDTO);
    if (!person) throw new NotFoundException();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    const person = await this._service.remove(id);
    if (!person) throw new NotFoundException();
  }
}
