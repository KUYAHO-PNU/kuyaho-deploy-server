import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PubSub } from "graphql-subscriptions";
import { Repository } from "typeorm";
import { Command } from "./entities/command.entity";

@Injectable()
export class GqlTerminalService {
  constructor(
    @InjectRepository(Command)
    private readonly CliRepository: Repository<Command>
  ) {}

  /* 전체 입력 명령어 목록 get */
  async getAllHistory(): Promise<Command[]> {
    return this.CliRepository.find();
  }

  async postCliCommand(command: string): Promise<Command> {
    const data = new Command();
    data.cli = command;
    return await this.CliRepository.save(data);
  }
}
