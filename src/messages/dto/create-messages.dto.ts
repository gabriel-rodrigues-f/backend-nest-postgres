import { IsPositive, IsString, Length } from "class-validator";

export class CreateMessageDto {
  @Length(2, 20)
  @IsString()
  readonly text: string;

  @IsPositive()
  fromId: number;

  @IsPositive()
  toId: number;
}
