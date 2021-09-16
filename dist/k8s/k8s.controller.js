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
exports.K8sController = void 0;
const common_1 = require("@nestjs/common");
const specification_dto_1 = require("../dto/specification.dto");
const k8s_service_1 = require("./k8s.service");
let K8sController = class K8sController {
    constructor(containerService) {
        this.containerService = containerService;
    }
    async createDeployment(data) {
        return await this.containerService.createDeployment(data.name, data.image, data.port);
    }
    async createService(data) {
        return await this.containerService.createService(data.name, data.port);
    }
    async deleteAll(data) {
        return await this.containerService.deleteAll(data.name);
    }
};
__decorate([
    (0, common_1.Post)('createDeployment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "createDeployment", null);
__decorate([
    (0, common_1.Post)('createService'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "createService", null);
__decorate([
    (0, common_1.Post)('deleteAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "deleteAll", null);
K8sController = __decorate([
    (0, common_1.Controller)('k8s'),
    __metadata("design:paramtypes", [k8s_service_1.K8sService])
], K8sController);
exports.K8sController = K8sController;
//# sourceMappingURL=k8s.controller.js.map