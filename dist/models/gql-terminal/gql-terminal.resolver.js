"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlTerminalResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const command_entity_1 = require("./entities/command.entity");
const gql_terminal_service_1 = require("./gql-terminal.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
let GqlTerminalResolver = class GqlTerminalResolver {
    constructor(gqlTerminalService) {
        this.gqlTerminalService = gqlTerminalService;
    }
    async getAllMovies() {
        return await this.gqlTerminalService.getAllHistory();
    }
    async createMovie(cli) {
        return await this.gqlTerminalService.postCliCommand(cli);
    }
    async getCliCommandOne(command) {
        console.log(command);
        return await pubsub.asyncIterator("commandAdded");
    }
};
__decorate([
    (0, graphql_1.Query)(() => [command_entity_1.Command], { name: "command" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GqlTerminalResolver.prototype, "getAllMovies", null);
__decorate([
    (0, graphql_1.Mutation)(() => command_entity_1.Command),
    __param(0, (0, graphql_1.Args)("cli")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GqlTerminalResolver.prototype, "createMovie", null);
__decorate([
    (0, graphql_1.Subscription)(() => command_entity_1.Command),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [command_entity_1.Command]),
    __metadata("design:returntype", Promise)
], GqlTerminalResolver.prototype, "getCliCommandOne", null);
GqlTerminalResolver = __decorate([
    (0, graphql_1.Resolver)(() => command_entity_1.Command),
    __metadata("design:paramtypes", [gql_terminal_service_1.GqlTerminalService])
], GqlTerminalResolver);
exports.GqlTerminalResolver = GqlTerminalResolver;
//# sourceMappingURL=gql-terminal.resolver.js.map