import { Module } from "@nestjs/common";
import { GqlTerminalService } from "./gql-terminal.service";
import { GqlTerminalResolver } from "./gql-terminal.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Command } from "./entities/command.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  providers: [GqlTerminalService, GqlTerminalResolver],
  exports: [GqlTerminalService, GqlTerminalResolver],
})
export class GqlTerminalModule {}
