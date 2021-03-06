"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const TermianlCmdEntity_entity_1 = require("./entities/TermianlCmdEntity.entity");
const terminal_controller_1 = require("./terminal.controller");
const terminal_service_1 = require("./terminal.service");
let TerminalModule = class TerminalModule {
};
TerminalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([TermianlCmdEntity_entity_1.TerminalResEntity])],
        controllers: [terminal_controller_1.TerminalController],
        providers: [terminal_service_1.TerminalService],
        exports: [terminal_service_1.TerminalService],
    })
], TerminalModule);
exports.TerminalModule = TerminalModule;
//# sourceMappingURL=terminal.module.js.map