import { IsEmail } from "class-validator";
import { Message } from "src/messages/entities/message.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "varchar", length: 255 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.from)
  messagesSent: Message[];

  @OneToMany(() => Message, (message) => message.to)
  messagesReceived: Message[];
}
