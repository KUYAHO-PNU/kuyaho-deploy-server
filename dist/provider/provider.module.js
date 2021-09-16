"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlConfigModuleProvider = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const mysql_config_module_1 = require("../config/database/mysql-config.module");
const mysql_config_service_1 = require("../config/database/mysql-config.service");
const command_entity_1 = require("../models/gql-terminal/entities/command.entity");
const TermianlCmdEntity_entity_1 = require("../models/terminal/entities/TermianlCmdEntity.entity");
let MysqlConfigModuleProvider = class MysqlConfigModuleProvider {
};
MysqlConfigModuleProvider = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [mysql_config_module_1.MysqlConfigModule],
                useFactory: async (config) => ({
                    type: "mysql",
                    host: config.host,
                    port: config.port,
                    username: config.username,
                    password: config.password,
                    database: config.database,
                    entities: [TermianlCmdEntity_entity_1.TerminalResEntity, command_entity_1.Command],
                    synchronize: false,
                }),
                inject: [mysql_config_service_1.MysqlConfigService],
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                debug: true,
                playground: true,
            }),
        ],
    })
], MysqlConfigModuleProvider);
exports.MysqlConfigModuleProvider = MysqlConfigModuleProvider;
//# sourceMappingURL=provider.module.js.map