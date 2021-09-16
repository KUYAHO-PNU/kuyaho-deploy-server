import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { postCommandReq } from "./dto/postCommandReq.dto";
import { Command } from "./entities/command.entity";
import { GqlTerminalService } from "./gql-terminal.service";
import { PubSub } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";

const pubsub = new PubSub();

@Resolver(() => Command)
export class GqlTerminalResolver {
  constructor(private readonly gqlTerminalService: GqlTerminalService) {}

  @Query(() => [Command], { name: "command" })
  async getAllMovies(): Promise<Command[]> {
    return await this.gqlTerminalService.getAllHistory();
  }

  @Mutation(() => Command)
  async createMovie(@Args("cli") cli: string): Promise<Command> {
    return await this.gqlTerminalService.postCliCommand(cli);
  }

  @Subscription(() => Command)
  async getCliCommandOne(command: Command) {
    console.log(command);
    return await pubsub.asyncIterator("commandAdded");
  }
}
