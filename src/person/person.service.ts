import { Injectable } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { Repository } from "typeorm";
import { Person } from "./entities/person.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly _repository: Repository<Person>,
  ) {}
  async create({ email, password, name }: CreatePersonDto) {
    const person = { email, passwordHash: password, name };
    const response = await this._repository.findOneBy({ email });
    if (!response) return this._repository.save(person);
    return null;
  }

  async findAll() {
    return this._repository.find();
  }

  async findOne(id: number) {
    return await this._repository.findOneBy({ id });
  }

  async update(id: number, updateDTO: UpdatePersonDto) {
    const person = await this._repository.findOneBy({ id });
    if (!person) return null;
    await this._repository.update({ id }, { ...updateDTO });
  }

  async remove(id: number) {
    const person = await this._repository.findOneBy({ id });
    if (!person) return null;
    return await this._repository.remove(person);
  }
}
