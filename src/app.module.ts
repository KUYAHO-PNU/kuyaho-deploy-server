import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DatabaseType } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { AppConfigModule } from "./config/app/app-config.module";
import { MysqlConfigModule } from "./config/database/mysql-config.module";
import { MysqlConfigService } from "./config/database/mysql-config.service";
import { FileEntity } from "./entities/file.entity";
import { SpecEntity } from "./entities/specification.entity";
import { TerminalResEntity } from "./models/terminal/entities/TermianlCmdEntity.entity";
import { TerminalController } from "./models/terminal/terminal.controller";
import { TerminalModule } from "./models/terminal/terminal.module";
import { MysqlConfigModuleProvider } from "./provider/provider.module";

@Module({
  imports: [MysqlConfigModuleProvider, TerminalModule],
  controllers: [AppController, TerminalController],
  providers: [AppService],
})
export class AppModule {}
