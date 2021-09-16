import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MysqlConfigModule } from "src/config/database/mysql-config.module";
import { MysqlConfigService } from "src/config/database/mysql-config.service";

/* entities */
import { Command } from "src/models/gql-terminal/entities/command.entity";
import { TerminalResEntity } from "src/models/terminal/entities/TermianlCmdEntity.entity";
import { DatabaseType } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (config: MysqlConfigService) => ({
        type: "mysql" as DatabaseType,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [TerminalResEntity, Command],
        synchronize: false,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
  ],
})
export class MysqlConfigModuleProvider {}
